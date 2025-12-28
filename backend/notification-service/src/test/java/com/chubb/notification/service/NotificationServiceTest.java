package com.chubb.notification.service;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.chubb.notification.dto.NotificationEventDTO;
import com.chubb.notification.models.Notification;
import com.chubb.notification.repository.NotificationRepository;

@ExtendWith(MockitoExtension.class)
class NotificationServiceTest {

    @Mock
    private NotificationRepository repository;

    @InjectMocks
    private NotificationService service;

    @Test
    void save_success() {
        NotificationEventDTO dto =
                new NotificationEventDTO("c1", "BILL", "Bill Generated");

        service.save(dto);

        verify(repository, times(1)).save(any(Notification.class));
    }
}

