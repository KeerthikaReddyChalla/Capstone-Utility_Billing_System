package com.chubb.billing.service;

import com.chubb.billing.client.MeterClient;
import com.chubb.billing.client.TariffClient;
import com.chubb.billing.dto.*;
import com.chubb.billing.models.*;
import com.chubb.billing.repository.BillRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import feign.FeignException;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BillingService {

    private final BillRepository billRepository;
    private final MeterClient meterClient;
    private final TariffClient tariffClient;

    public BillResponse generateBill(GenerateBillRequest request) {

        System.out.println("=== BILL GENERATION STARTED ===");
        System.out.println("Request received: " + request);

        String connectionId = request.getConnectionId();
        System.out.println("connectionId = " + request.getConnectionId());

        MeterReadingResponse latest;
        try {
            System.out.println("Calling Meter Service: getLatest for connectionId = " + connectionId);
            latest = meterClient.getLatest(connectionId);
            System.out.println("Latest meter reading received: " + latest);
        } catch (FeignException ex) {
            System.out.println("ERROR calling meter-service getLatest");
            System.out.println("Status: " + ex.status());
            System.out.println("Body: " + ex.contentUTF8());
            ex.printStackTrace();
            throw ex;
        }

        if (latest == null) {
            System.out.println("ERROR: Latest meter reading is NULL for connectionId = " + connectionId);
            throw new IllegalStateException("No meter reading found for connection " + connectionId);
        }

        MeterReadingResponse previous = null;
        try {
            System.out.println("Calling Meter Service: getPrevious for connectionId = " + connectionId);
            previous = meterClient.getPrevious(connectionId);
            System.out.println("Previous meter reading received: " + previous);
        } catch (FeignException ex) {
            if (ex.status() == 204) {
                System.out.println("No previous meter reading found (first billing cycle)");
                previous = null;
            } else {
                System.out.println("ERROR calling meter-service getPrevious");
                System.out.println("Status: " + ex.status());
                System.out.println("Body: " + ex.contentUTF8());
                ex.printStackTrace();
                throw ex;
            }
        }

        double unitsConsumed;
        if (previous == null) {
            unitsConsumed = latest.getReadingValue();
            System.out.println("First billing cycle detected");
        } else {
            unitsConsumed = latest.getReadingValue() - previous.getReadingValue();
            System.out.println("Normal billing cycle detected");
        }
        System.out.println("Units consumed = " + unitsConsumed);

        Double rate;
        try {
            System.out.println("Calling Utility Service: getRate for utilityId = " + latest.getUtilityId());
            rate = tariffClient.getRate(latest.getUtilityId());
            System.out.println("Tariff rate received = " + rate);
        } catch (FeignException ex) {
            System.out.println("ERROR calling utility-service getRate");
            System.out.println("Status: " + ex.status());
            System.out.println("Body: " + ex.contentUTF8());
            ex.printStackTrace();
            throw ex;
        }

        if (rate == null) {
            System.out.println("ERROR: Tariff rate is NULL for utilityId = " + latest.getUtilityId());
            throw new IllegalStateException("Tariff not found for utility " + latest.getUtilityId());
        }

        double amount = unitsConsumed * rate;
        System.out.println("Final bill amount calculated = " + amount);

        Bill bill = Bill.builder()
                .connectionId(latest.getConnectionId())
                .consumerId(latest.getConsumerId())
                .billingCycle(request.getBillingCycle())
                .unitsConsumed(unitsConsumed)
                .amount(amount)
                .status(BillStatus.GENERATED)
                .build();

        Bill saved = billRepository.save(bill);
        System.out.println("Bill saved successfully with id = " + saved.getId());

        System.out.println("=== BILL GENERATION COMPLETED ===");

        return BillResponse.builder()
                .billId(saved.getId())
                .connectionId(saved.getConnectionId())
                .consumerId(saved.getConsumerId())
                .amount(saved.getAmount())
                .status(saved.getStatus())
                .billingCycle(saved.getBillingCycle())
                .build();
    }

    public List<Bill> getBillsByConsumer(String consumerId) {
        return billRepository.findByConsumerId(consumerId);
    }
    public void markBillAsPaid(String billId) {

        Bill bill = billRepository.findById(billId)
                .orElseThrow(() ->
                        new RuntimeException("Bill not found: " + billId));

        bill.setStatus(BillStatus.PAID);

        billRepository.save(bill);
    }

}
