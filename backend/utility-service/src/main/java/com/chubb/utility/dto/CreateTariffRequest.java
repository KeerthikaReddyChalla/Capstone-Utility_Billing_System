package com.chubb.utility.dto;

import com.chubb.utility.models.TariffType;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Data;

@Data
public class CreateTariffRequest {

    @NotNull
    private String utilityId;

    @NotNull
    private TariffType tariffType;

    @PositiveOrZero
    private double ratePerUnit;

    @PositiveOrZero
    private double fixedCharge;
}
