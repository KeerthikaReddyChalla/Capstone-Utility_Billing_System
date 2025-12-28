package com.chubb.consumer.models;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "connections")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class Connection {

    @Id
    private String id;

    private String consumerId;
    private String utilityId;
    private String meterNumber;
    private boolean active;
}
