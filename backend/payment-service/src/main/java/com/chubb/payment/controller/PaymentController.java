package com.chubb.payment.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.chubb.payment.dto.PaymentRequest;
import com.chubb.payment.dto.PaymentResponse;
import com.chubb.payment.service.PaymentService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService service;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasRole('ACCOUNTS_OFFICER')")
    public PaymentResponse pay(@Valid @RequestBody PaymentRequest request) {
        return service.makePayment(request);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','CONSUMER')")
    public PaymentResponse get(@PathVariable String id) {
        return service.getById(id);
    }

    @GetMapping("/bill/{billId}")
    @PreAuthorize("hasAnyRole('ADMIN','CONSUMER')")
    public List<PaymentResponse> byBill(@PathVariable String billId) {
        return service.getByBill(billId);
    }

    @GetMapping("/consumer/{consumerId}")
    @PreAuthorize("hasAnyRole('ADMIN','CONSUMER')")
    public List<PaymentResponse> byConsumer(@PathVariable String consumerId) {
        return service.getByConsumer(consumerId);
    }
}
