package com.chubb.payment.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "billing-service")
public interface BillingClient {

    @PutMapping("/bills/{billId}/status")
    void markBillAsPaid(@PathVariable String billId);
}
