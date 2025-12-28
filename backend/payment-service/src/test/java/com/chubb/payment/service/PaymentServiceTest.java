package com.chubb.payment.service;

import static org.mockito.Mockito.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.chubb.payment.client.BillingClient;
import com.chubb.payment.dto.PaymentRequest;
import com.chubb.payment.models.Payment;
import com.chubb.payment.models.PaymentStatus;
import com.chubb.payment.repository.PaymentRepository;

@ExtendWith(MockitoExtension.class)
class PaymentServiceTest {

    @Mock
    private PaymentRepository repository;

    @Mock
    private BillingClient billingClient;

    @InjectMocks
    private PaymentService service;

    @Test
    void makePayment_success() {

        PaymentRequest req = new PaymentRequest();
        req.setBillId("B1");
        req.setConsumerId("C1");
        req.setAmount(BigDecimal.valueOf(500));

        Payment savedPayment = Payment.builder()
                .id("P1")
                .billId("B1")
                .consumerId("C1")
                .amount(BigDecimal.valueOf(500))
                .status(PaymentStatus.SUCCESS)
                .paymentDate(LocalDateTime.now())
                .build();

        when(repository.save(any(Payment.class))).thenReturn(savedPayment);

        service.makePayment(req);

        verify(repository).save(any(Payment.class));
        verify(billingClient).markBillAsPaid("B1");
    }
}
