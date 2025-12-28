package com.chubb.utility.dto;

import java.time.LocalDate;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class TariffRequest {

    @NotBlank
    private String utilityId;

    @NotBlank
    private String name;

    @Positive
    private double ratePerUnit;

    @NotNull
    private LocalDate effectiveFrom;
}
