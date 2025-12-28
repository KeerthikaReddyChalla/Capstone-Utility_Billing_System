package com.chubb.billing.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.chubb.billing.client.MeterClient;
import com.chubb.billing.client.TariffClient;
import com.chubb.billing.dto.BillResponse;
import com.chubb.billing.dto.GenerateBillRequest;
import com.chubb.billing.models.Bill;
import com.chubb.billing.models.BillStatus;
import com.chubb.billing.repository.BillRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BillingService {

    private final BillRepository repo;
    private final MeterClient meterClient;
    private final TariffClient tariffClient;

    public BillResponse generateBill(GenerateBillRequest req) {

        double units = meterClient.getLatestUnits(req.getConsumerId());
        double rate = tariffClient.getRate(req.getUtilityId());

        Bill bill = Bill.builder()
                .consumerId(req.getConsumerId())
                .utilityId(req.getUtilityId())
                .unitsConsumed(units)
                .amount(units * rate)
                .billingCycle(req.getBillingCycle())
                .status(BillStatus.GENERATED)
                .generatedAt(LocalDateTime.now())
                .build();

        Bill saved = repo.save(bill);

        return BillResponse.builder()
                .billId(saved.getId())
                .consumerId(saved.getConsumerId())
                .amount(saved.getAmount())
                .status(saved.getStatus())
                .billingCycle(saved.getBillingCycle())
                .build();
    }

    public List<Bill> getBillsByConsumer(String consumerId) {
        return repo.findByConsumerId(consumerId);
    }
}
