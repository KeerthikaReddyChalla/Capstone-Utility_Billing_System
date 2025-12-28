package com.chubb.utility.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class UtilityRequest {
    @NotBlank
    private String name;
    private String description;
}
