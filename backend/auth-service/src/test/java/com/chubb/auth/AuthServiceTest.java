package com.chubb.auth;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.chubb.auth.dto.RegisterRequest;
import com.chubb.auth.repository.UserRepository;
import com.chubb.auth.security.JwtUtil;
import com.chubb.auth.service.AuthServiceImpl;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtUtil jwtUtil;

    @InjectMocks
    private AuthServiceImpl authService;

    @Test
    void shouldRegisterUser() {
        RegisterRequest req = new RegisterRequest();
        req.setEmail("test@mail.com");
        req.setPassword("123");

        when(userRepository.existsByEmail(any())).thenReturn(false);
        when(passwordEncoder.encode(any())).thenReturn("encoded");

        authService.register(req);

        verify(userRepository).save(any());
    }
}

