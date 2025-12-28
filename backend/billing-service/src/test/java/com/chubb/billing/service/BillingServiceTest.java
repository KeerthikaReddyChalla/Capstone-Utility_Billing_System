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
import com.chubb.billing.repository.BillRepository;

@ExtendWith(MockitoExtension.class)
class BillingServiceTest {

    @Mock
    private BillRepository repo;

    @Mock
    private MeterClient meterClient;

    @Mock
    private TariffClient tariffClient;

    @InjectMocks
    private BillingService service;

    @Test
    void generateBill_success() {

        when(meterClient.getLatestUnits("c1")).thenReturn(100.0);
        when(tariffClient.getRate("u1")).thenReturn(5.0);
        when(repo.save(any())).thenAnswer(i -> i.getArgument(0));

        GenerateBillRequest req = new GenerateBillRequest();
        req.setConsumerId("c1");
        req.setUtilityId("u1");
        req.setBillingCycle(LocalDate.now());

        service.generateBill(req);

        verify(repo, times(1)).save(any());
        verify(meterClient, times(1)).getLatestUnits("c1");
        verify(tariffClient, times(1)).getRate("u1");
    }
}
