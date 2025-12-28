package com.chubb.meter.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.chubb.meter.dto.MeterReadingRequest;
import com.chubb.meter.dto.MeterReadingResponse;
import com.chubb.meter.service.MeterReadingService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/meter-readings")
@RequiredArgsConstructor
public class MeterReadingController {

    private final MeterReadingService service;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasRole('BILLING_OFFICER')")
    public MeterReadingResponse create(@Valid @RequestBody MeterReadingRequest request) {
        return service.create(request);
    }

    @GetMapping("/{consumerId}")
    @PreAuthorize("hasAnyRole('BILLING_OFFICER','ADMIN')")
    public List<MeterReadingResponse> getByConsumer(
            @PathVariable("consumerId") String consumerId) {
        return service.getByConsumer(consumerId);
    }

    @GetMapping("/latest/{consumerId}")
    @PreAuthorize("hasAnyRole('BILLING_OFFICER','ADMIN')")
    public MeterReadingResponse getLatest(
            @PathVariable("consumerId") String consumerId) {
        return service.getLatest(consumerId);
    }

}
