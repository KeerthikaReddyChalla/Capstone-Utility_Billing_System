package com.chubb.consumer.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ConnectionRequestDTO {

    @NotBlank
    private String consumerId;

    @NotBlank
    private String utilityId;
}
