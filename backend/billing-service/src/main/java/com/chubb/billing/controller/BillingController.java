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
    	System.out.println("STEP 1 → ENTERED BillingController.generate()");
        System.out.println("REQUEST = " + req);
        return service.generateBill(req);
    }

    @GetMapping("/consumer/{consumerId}")
    @PreAuthorize("hasAnyRole('ADMIN','CONSUMER')")
    public List<Bill> getByConsumer(@PathVariable String consumerId) {
        return service.getBillsByConsumer(consumerId);
    }
    
    @PutMapping("/{billId}/status")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PreAuthorize("hasRole('ACCOUNTS_OFFICER')")
    public void markBillAsPaid(@PathVariable String billId) {
        service.markBillAsPaid(billId);
    }
    @GetMapping
    @PreAuthorize("hasRole('BILLING_OFFICER')")
    public List<Bill> getAllBills() {
        return service.getAllBills();
    }


}
