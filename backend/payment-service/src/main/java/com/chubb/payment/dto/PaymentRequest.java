package com.chubb.payment.dto;

import java.math.BigDecimal;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class PaymentRequest {

    @NotBlank
    private String billId;

    @NotBlank
    private String consumerId;

    @NotNull
    @Positive
    private BigDecimal amount;
}
