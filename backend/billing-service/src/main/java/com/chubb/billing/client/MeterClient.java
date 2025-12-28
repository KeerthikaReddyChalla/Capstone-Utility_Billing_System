package com.chubb.billing.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "meter-service")
public interface MeterClient {

    @GetMapping("/meter-readings/latest/{consumerId}")
    Double getLatestUnits(@PathVariable String consumerId);
}
