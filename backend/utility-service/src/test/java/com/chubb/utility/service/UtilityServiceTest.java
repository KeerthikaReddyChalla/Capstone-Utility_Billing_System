package com.chubb.utility.service;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.chubb.utility.dto.UtilityRequest;
import com.chubb.utility.dto.UtilityResponse;
import com.chubb.utility.models.Utility;
import com.chubb.utility.repository.UtilityRepository;

@ExtendWith(MockitoExtension.class)
class UtilityServiceTest {

    @Mock
    private UtilityRepository repository;

    @InjectMocks
    private UtilityService service;

    @Test
    void shouldCreateUtility() {
        Utility utility = Utility.builder()
                .id("1")
                .name("Electricity")
                .active(true)
                .build();

        when(repository.save(any())).thenReturn(utility);

        UtilityRequest req = new UtilityRequest();
        req.setName("Electricity");

        UtilityResponse res = service.create(req);

        assertEquals("Electricity", res.getName());
    }
}
