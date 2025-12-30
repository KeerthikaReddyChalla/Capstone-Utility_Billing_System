package com.chubb.consumer.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ConnectionResponseDTO {

    private String id;
    private String consumerId;
    private String utilityId;
    private boolean active;
}
