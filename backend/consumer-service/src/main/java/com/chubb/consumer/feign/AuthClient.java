package com.chubb.consumer.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.chubb.consumer.dto.AuthUserResponse;
import com.chubb.consumer.security.FeignConfig;

@FeignClient(name = "auth-service", configuration = FeignConfig.class)
public interface AuthClient {

    @GetMapping("/auth/users/{userId}")
    AuthUserResponse getUserById(@PathVariable("userId") String userId);
}

