package com.chubb.utility.dto;

import jakarta.validation.constraints.PositiveOrZero;
import lombok.Data;

@Data
public class UpdateTariffRequest {

    @PositiveOrZero
    private double ratePerUnit;

    @PositiveOrZero
    private double fixedCharge;
}
