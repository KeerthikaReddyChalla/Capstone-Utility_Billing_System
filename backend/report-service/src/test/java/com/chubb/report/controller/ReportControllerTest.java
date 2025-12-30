package com.chubb.report.controller;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.chubb.report.service.ReportService;

class ReportControllerTest {

    @Test
    void monthlyRevenue_ok() throws Exception {
        ReportService service = mock(ReportService.class);
        ReportController controller = new ReportController(service);

        MockMvcBuilders.standaloneSetup(controller)
                .build()
                .perform(get("/reports/monthly-revenue"))
                .andExpect(status().isOk());
    }
}
