package com.chubb.meter.controller;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.time.LocalDate;
import java.util.List;

import com.chubb.meter.dto.MeterReadingRequest;
import com.chubb.meter.dto.MeterReadingResponse;
import com.chubb.meter.service.MeterReadingService;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import com.chubb.meter.security.SecurityConfig;

@WebMvcTest(MeterReadingController.class)
@Import(SecurityConfig.class)
class MeterReadingControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private MeterReadingService service;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    @WithMockUser(roles = "BILLING_OFFICER")
    void createMeterReading_success() throws Exception {

        MeterReadingRequest request = new MeterReadingRequest();
        request.setConsumerId("C1");
        request.setUtilityId("U1");
        request.setReadingValue(100);
        request.setReadingDate(LocalDate.now());

        MeterReadingResponse response = MeterReadingResponse.builder()
                .id("R1")
                .consumerId("C1")
                .utilityId("U1")
                .readingValue(100)
                .build();

        when(service.create(any())).thenReturn(response);

        mockMvc.perform(post("/meter-readings")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.consumerId").value("C1"));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void getByConsumer_success() throws Exception {

        when(service.getByConsumer("C1"))
                .thenReturn(List.of(
                        MeterReadingResponse.builder()
                                .id("R1")
                                .consumerId("C1")
                                .build()
                ));

        mockMvc.perform(get("/meter-readings/C1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value("R1"));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void getLatest_success() throws Exception {

        when(service.getLatest("C1"))
                .thenReturn(
                        MeterReadingResponse.builder()
                                .id("R2")
                                .consumerId("C1")
                                .build()
                );

        mockMvc.perform(get("/meter-readings/latest/C1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value("R2"));
    }
}
