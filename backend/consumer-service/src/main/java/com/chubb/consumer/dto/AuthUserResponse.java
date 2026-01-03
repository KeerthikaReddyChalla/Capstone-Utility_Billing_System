package com.chubb.consumer.dto;

import lombok.Data;

@Data
public class AuthUserResponse {

    private String id;
    private String name;
    private String email;
    private String role;
    private boolean active;
}
