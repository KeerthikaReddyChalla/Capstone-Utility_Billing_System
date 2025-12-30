package com.chubb.billing.service;

import static org.mockito.Mockito.*;

import java.time.LocalDate;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.chubb.billing.client.MeterClient;
import com.chubb.billing.client.TariffClient;
import com.chubb.billing.dto.GenerateBillRequest;
import com.chubb.billing.dto.MeterReadingResponse;
import com.chubb.billing.models.Bill;
import com.chubb.billing.repository.BillRepository;

@ExtendWith(MockitoExtension.class)
class BillingServiceTest {

    @Mock
    private BillRepository billRepository;

    @Mock
    private MeterClient meterClient;

    @Mock
    private TariffClient tariffClient;

    @InjectMocks
    private BillingService billingService;

    @Test
    void generateBill_success() {

     
        GenerateBillRequest request = new GenerateBillRequest();
        request.setConnectionId("CONN_123");
        request.setBillingCycle(LocalDate.now());

        MeterReadingResponse latest = new MeterReadingResponse();
        latest.setConnectionId("CONN_123");
        latest.setConsumerId("CONS_001");
        latest.setUtilityId("ELEC");
        latest.setReadingValue(220);

        MeterReadingResponse previous = new MeterReadingResponse();
        previous.setReadingValue(100);

        when(meterClient.getLatest("CONN_123")).thenReturn(latest);
        when(meterClient.getPrevious("CONN_123")).thenReturn(previous);
        when(tariffClient.getRate("ELEC")).thenReturn(5.0);
        when(billRepository.save(any(Bill.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

      
        billingService.generateBill(request);

     
        verify(meterClient).getLatest("CONN_123");
        verify(meterClient).getPrevious("CONN_123");
        verify(tariffClient).getRate("ELEC");
        verify(billRepository).save(any(Bill.class));
    }
}
