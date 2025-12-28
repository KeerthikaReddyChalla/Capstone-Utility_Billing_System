package com.chubb.utility.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TariffResponse {
    private String id;
    private String utilityId;
    private String name;
    private double ratePerUnit;
    private boolean active;
}
