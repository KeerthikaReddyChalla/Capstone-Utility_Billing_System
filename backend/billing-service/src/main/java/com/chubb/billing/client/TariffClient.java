package com.chubb.billing.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "utility-service")
public interface TariffClient {

    @GetMapping("/tariffs/utility/{utilityId}")
    Double getRate(@PathVariable String utilityId);
}
