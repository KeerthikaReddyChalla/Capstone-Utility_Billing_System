package com.chubb.consumer.dto;

import com.chubb.consumer.models.TariffType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ConnectionRequestDTO {

    @NotBlank
    private String consumerId;

    @NotBlank
    private String utilityId;

    @NotNull
    private TariffType tariffType; 
}
