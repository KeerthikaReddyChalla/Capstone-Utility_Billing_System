package com.chubb.meter.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MeterReadingResponse {

    private String id;
    private String consumerId;
    private String utilityId;
    private double readingValue;
    private LocalDate readingDate;
    private LocalDateTime createdAt;
}
