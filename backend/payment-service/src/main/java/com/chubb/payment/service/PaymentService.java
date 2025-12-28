package com.chubb.payment.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.chubb.payment.client.BillingClient;
import com.chubb.payment.dto.PaymentRequest;
import com.chubb.payment.dto.PaymentResponse;
import com.chubb.payment.models.Payment;
import com.chubb.payment.models.PaymentStatus;
import com.chubb.payment.repository.PaymentRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final PaymentRepository repository;
    private final BillingClient billingClient;

    public PaymentResponse makePayment(PaymentRequest request) {

        Payment payment = Payment.builder()
                .billId(request.getBillId())
                .consumerId(request.getConsumerId())
                .amount(request.getAmount())
                .status(PaymentStatus.SUCCESS)
                .paymentDate(LocalDateTime.now())
                .build();

        Payment saved = repository.save(payment);

        billingClient.markBillAsPaid(request.getBillId());

        return map(saved);
    }

    public PaymentResponse getById(String id) {
        return repository.findById(id)
                .map(this::map)
                .orElseThrow(() -> new RuntimeException("Payment not found"));
    }

    public List<PaymentResponse> getByBill(String billId) {
        return repository.findByBillId(billId).stream().map(this::map).toList();
    }

    public List<PaymentResponse> getByConsumer(String consumerId) {
        return repository.findByConsumerId(consumerId).stream().map(this::map).toList();
    }

    private PaymentResponse map(Payment p) {
        return PaymentResponse.builder()
                .paymentId(p.getId())
                .billId(p.getBillId())
                .amount(p.getAmount())
                .status(p.getStatus().name())
                .paymentDate(p.getPaymentDate())
                .build();
    }
}
