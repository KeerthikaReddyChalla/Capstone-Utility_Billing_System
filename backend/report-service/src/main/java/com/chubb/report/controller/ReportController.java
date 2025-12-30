package com.chubb.report.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.bson.Document;

import com.chubb.report.service.ReportService;

@RestController
@RequestMapping("/reports")
public class ReportController {

    private final ReportService service;

    public ReportController(ReportService service) {
        this.service = service;
    }

    @GetMapping("/monthly-revenue")
    @PreAuthorize("hasAnyRole('ADMIN','ACCOUNTS_OFFICER')")
    public ResponseEntity<List<Document>> monthlyRevenue() {
        return ResponseEntity.ok(service.getMonthlyRevenue());
    }

    @GetMapping("/outstanding-dues")
    @PreAuthorize("hasAnyRole('ADMIN','ACCOUNTS_OFFICER')")
    public ResponseEntity<List<Document>> outstandingDues() {
        return ResponseEntity.ok(service.getOutstandingDues());
    }

    @GetMapping("/consumption-by-utility")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Document>> consumptionByUtility() {
        return ResponseEntity.ok(service.getConsumptionByUtility());
    }

    @GetMapping("/consumer-summary/{consumerId}")
    @PreAuthorize("hasAnyRole('ADMIN','ACCOUNTS_OFFICER')")
    public ResponseEntity<Map<String, Object>> consumerSummary(
            @PathVariable String consumerId) {
        return ResponseEntity.ok(service.getConsumerSummary(consumerId));
    }
}
