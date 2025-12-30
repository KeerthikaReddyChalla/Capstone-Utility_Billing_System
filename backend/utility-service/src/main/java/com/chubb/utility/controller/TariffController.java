package com.chubb.utility.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.chubb.utility.dto.CreateTariffRequest;
import com.chubb.utility.dto.TariffRequest;
import com.chubb.utility.dto.TariffResponse;
import com.chubb.utility.dto.UpdateTariffRequest;
import com.chubb.utility.service.TariffService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/tariffs")
@RequiredArgsConstructor
@PreAuthorize("hasAnyRole('ADMIN','BILLING_OFFICER')")
public class TariffController {

    private final TariffService service;

   
    @PostMapping
    public ResponseEntity<TariffResponse> create(
            @Valid @RequestBody CreateTariffRequest request) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(service.create(request));
    }

    @PutMapping("/{tariffId}")
    public TariffResponse update(
            @PathVariable String tariffId,
            @Valid @RequestBody UpdateTariffRequest request) {

        return service.update(tariffId, request);
    }
    @GetMapping
    public List<TariffResponse> getAll() {
        return service.getAll();
    }

    @GetMapping("/{tariffId}")
    public TariffResponse getById(@PathVariable String tariffId) {
        return service.getById(tariffId);
    }

    @GetMapping("/utility/{utilityId}")
    public List<TariffResponse> getByUtility(
            @PathVariable String utilityId) {

        return service.getByUtility(utilityId);
    }
    
    @GetMapping("/utility/{utilityId}/rate")
    @PreAuthorize("hasAnyRole('ADMIN','BILLING_OFFICER')")
    public Double getRate(@PathVariable String utilityId) {
        return service.getRateByUtilityId(utilityId);
    }
    
}
