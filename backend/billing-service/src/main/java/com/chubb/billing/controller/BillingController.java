package com.chubb.billing.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.chubb.billing.dto.BillResponse;
import com.chubb.billing.dto.GenerateBillRequest;
import com.chubb.billing.models.Bill;
import com.chubb.billing.service.BillingService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/bills")
@RequiredArgsConstructor
public class BillingController {

    private final BillingService service;

    @PostMapping("/generate")
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasRole('BILLING_OFFICER')")
    public BillResponse generate(@Valid @RequestBody GenerateBillRequest req) {
        return service.generateBill(req);
    }

    @GetMapping("/consumer/{consumerId}")
    @PreAuthorize("hasAnyRole('ADMIN','CONSUMER')")
    public List<Bill> getByConsumer(@PathVariable String consumerId) {
        return service.getBillsByConsumer(consumerId);
    }
}
