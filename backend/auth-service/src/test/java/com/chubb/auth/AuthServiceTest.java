package com.chubb.auth;

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

