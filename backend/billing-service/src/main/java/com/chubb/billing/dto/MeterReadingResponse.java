package com.chubb.billing.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class MeterReadingResponse {

    private String connectionId;
    private String consumerId;
    private String utilityId;

    private double readingValue;
    private LocalDate readingDate;
}
