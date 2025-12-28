package com.chubb.consumer.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class ConsumerRequestDTO {

    @NotBlank
    private String userId;

    @NotBlank
    private String fullName;

    @Email
    private String email;

    @NotBlank
    private String phone;

    @NotBlank
    private String address;
}

