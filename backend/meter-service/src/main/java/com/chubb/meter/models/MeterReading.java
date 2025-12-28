package com.chubb.meter.models;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.*;

@Document(collection = "meter_readings")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MeterReading {

    @Id
    private String id;

    private String consumerId;
    private String utilityId;

    private double readingValue;
    private LocalDate readingDate;

    private LocalDateTime createdAt;
}
