package com.chubb.consumer.controller;

import com.chubb.consumer.dto.*;
import com.chubb.consumer.service.ConnectionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/connections")
@RequiredArgsConstructor
public class ConnectionController {

    private final ConnectionService service;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ConnectionResponseDTO> create(
            @Valid @RequestBody ConnectionRequestDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{consumerId}")
    @PreAuthorize("hasAnyRole('ADMIN','CONSUMER')")
    public ResponseEntity<List<ConnectionResponseDTO>> getByConsumer(
            @PathVariable String consumerId) {
        return ResponseEntity.ok(service.getByConsumerId(consumerId));
    }

    @PutMapping("/{connectionId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ConnectionResponseDTO> updateStatus(
            @PathVariable String connectionId,
            @RequestBody ConnectionUpdateDTO dto) {
        return ResponseEntity.ok(service.updateStatus(connectionId, dto));
    }
    @GetMapping("/internal/{connectionId}")
    @PreAuthorize("hasAnyRole('ADMIN','BILLING_OFFICER')")
    public ConnectionResponseDTO getInternal(
            @PathVariable String connectionId) {
        return service.getById(connectionId);
    }

}
