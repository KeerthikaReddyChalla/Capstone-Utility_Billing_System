package com.chubb.consumer.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "utility-service")
public interface UtilityClient {

    @GetMapping("/utilities/{utilityId}")
    Object getUtilityById(@PathVariable("utilityId") String utilityId);
}
