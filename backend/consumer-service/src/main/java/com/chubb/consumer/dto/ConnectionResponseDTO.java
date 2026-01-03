package com.chubb.consumer.dto;

import com.chubb.consumer.models.TariffType;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ConnectionResponseDTO {

    private String id;
    private String consumerId;
    private String utilityId;
    private TariffType tariffType;   
    private boolean active;
}
