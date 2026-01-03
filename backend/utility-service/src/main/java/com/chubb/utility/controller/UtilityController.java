package com.chubb.utility.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.chubb.utility.dto.UtilityRequest;
import com.chubb.utility.dto.UtilityResponse;
import com.chubb.utility.service.TariffService;
import com.chubb.utility.service.UtilityService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/utilities")
@RequiredArgsConstructor
@PreAuthorize("hasAnyRole('ADMIN','BILLING_OFFICER')")

public class UtilityController {

    private final UtilityService service;
    private final TariffService tariffService;

    @PostMapping
    public ResponseEntity<UtilityResponse> create(@Valid @RequestBody UtilityRequest req) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(req));
    }

    @PreAuthorize("hasRole('CONSUMER')")
    @GetMapping
    public List<UtilityResponse> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public UtilityResponse get(@PathVariable String id) {
        return service.getById(id);
    }

    @PutMapping("/{id}")
    public UtilityResponse update(@PathVariable String id,
                                  @Valid @RequestBody UtilityRequest req) {
        return service.update(id, req);
    }
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable String id) {

        service.delete(id);
        return ResponseEntity.noContent().build();
    }
    @PreAuthorize("hasRole('CONSUMER')")
    @GetMapping("/internal/{id}")
    public UtilityResponse getInternal(@PathVariable String id) {
        return service.getById(id);
    }

    

}
