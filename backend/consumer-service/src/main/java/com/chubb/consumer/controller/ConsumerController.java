package com.chubb.consumer.controller;

import com.chubb.consumer.dto.ConsumerRequestDTO;
import com.chubb.consumer.dto.ConsumerResponseDTO;
import com.chubb.consumer.service.ConsumerService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/consumers")
@RequiredArgsConstructor
public class ConsumerController {

    private final ConsumerService service;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ConsumerResponseDTO> create(@Valid @RequestBody ConsumerRequestDTO dto) {
        return new ResponseEntity<>(service.createConsumer(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','CONSUMER')")
    public ResponseEntity<ConsumerResponseDTO> get(@PathVariable String id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<ConsumerResponseDTO>> all() {
        return ResponseEntity.ok(service.getAll());
    }
}

