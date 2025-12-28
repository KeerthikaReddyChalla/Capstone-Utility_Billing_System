package com.chubb.utility.models;

import java.time.LocalDate;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.*;

@Document(collection = "tariffs")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Tariff {

    @Id
    private String id;

    @NotBlank
    private String utilityId;

    @NotBlank
    private String name;

    @Positive
    private double ratePerUnit;

    private LocalDate effectiveFrom;

    private boolean active;
}
