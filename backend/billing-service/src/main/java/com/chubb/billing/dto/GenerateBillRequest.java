package com.chubb.billing.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

@Data
public class GenerateBillRequest {

    @NotBlank
    private String consumerId;

    @NotBlank
    private String utilityId;

    @NotNull
    private LocalDate billingCycle;
}
