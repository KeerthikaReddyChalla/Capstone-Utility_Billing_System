package com.chubb.auth.dto;
import lombok.Data;

import com.chubb.auth.models.Role;

import jakarta.validation.constraints.*;

@Data
public class RegisterRequest {

    @NotBlank
    private String name;

    @Email
    private String email;

    @NotBlank
    private String password;

    @NotNull
    private Role role;
}
