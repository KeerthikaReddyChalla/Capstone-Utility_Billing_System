package com.chubb.consumer.service;

import com.chubb.consumer.dto.AuthUserResponse;
import com.chubb.consumer.dto.ConsumerRequestDTO;
import com.chubb.consumer.feign.AuthClient;
import com.chubb.consumer.models.Consumer;
import com.chubb.consumer.repository.ConsumerRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class ConsumerServiceTest {

    @Mock
    ConsumerRepository repo;

    @Mock
    AuthClient authClient;

    @InjectMocks
    ConsumerService service;

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void createConsumer_success() {

        ConsumerRequestDTO dto = new ConsumerRequestDTO();
        dto.setUserId("u1");
        dto.setFullName("Test User");
        dto.setEmail("test@test.com");
        dto.setPhone("9999999999");
        dto.setAddress("Hyderabad");

        AuthUserResponse authUser = new AuthUserResponse();
        authUser.setId("u1");
        authUser.setRole("CONSUMER");
        authUser.setActive(true);

        Consumer savedConsumer = Consumer.builder()
                .id("u1") 
                .fullName("Test User")
                .email("test@test.com")
                .phone("9999999999")
                .address("Hyderabad")
                .build();

        when(authClient.getUserById("u1")).thenReturn(authUser);
        when(repo.save(any(Consumer.class))).thenReturn(savedConsumer);

        service.createConsumer(dto);

        verify(repo, times(1)).save(any(Consumer.class));
    }
}
