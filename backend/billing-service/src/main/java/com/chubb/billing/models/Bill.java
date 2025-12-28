package com.chubb.billing.models;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.*;

@Document(collection = "bills")
@Getter @Setter @Builder
@NoArgsConstructor @AllArgsConstructor
public class Bill {

    @Id
    private String id;

    private String consumerId;
    private String utilityId;
    private double unitsConsumed;
    private double amount;

    private LocalDate billingCycle;
    private BillStatus status;

    private LocalDateTime generatedAt;
}
