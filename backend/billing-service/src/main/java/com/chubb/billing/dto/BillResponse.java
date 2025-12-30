package com.chubb.billing.dto;

import com.chubb.billing.models.BillStatus;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class BillResponse {

    private String billId;

    private String connectionId;   
    private String consumerId;     

    private double amount;
    private BillStatus status;
    private LocalDate billingCycle;
}
