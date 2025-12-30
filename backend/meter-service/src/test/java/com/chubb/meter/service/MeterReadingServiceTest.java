package com.chubb.meter.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import com.chubb.meter.dto.MeterReadingRequest;
import com.chubb.meter.exception.DuplicateReadingException;
import com.chubb.meter.exception.ResourceNotFoundException;
import com.chubb.meter.models.MeterReading;
import com.chubb.meter.repository.MeterReadingRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class MeterReadingServiceTest {

    @Mock
    private MeterReadingRepository repository;

    @InjectMocks
    private MeterReadingService service;

    private MeterReadingRequest request;
    private MeterReading reading;

    @BeforeEach
    void setUp() {

        request = new MeterReadingRequest();
        request.setConnectionId("CONN1");
        request.setReadingValue(120.5);
        request.setReadingDate(LocalDate.now());

        reading = MeterReading.builder()
                .id("R1")
                .connectionId("CONN1")
                .readingValue(120.5)
                .readingDate(LocalDate.now())
                .createdAt(LocalDateTime.now())
                .build();
    }

    @Test
    void createMeterReading_success() {

        when(repository.existsByConnectionIdAndReadingDate(
                anyString(), any()))
                .thenReturn(false);

        when(repository.save(any(MeterReading.class)))
                .thenReturn(reading);

        var response = service.create(request);

        assertNotNull(response);
        assertEquals("CONN1", response.getConnectionId());
        assertEquals(120.5, response.getReadingValue());

        verify(repository).save(any(MeterReading.class));
    }

    @Test
    void createMeterReading_duplicate_throwsException() {

        when(repository.existsByConnectionIdAndReadingDate(
                anyString(), any()))
                .thenReturn(true);

        assertThrows(DuplicateReadingException.class,
                () -> service.create(request));

        verify(repository, never()).save(any());
    }

    @Test
    void getByConnection_returnsList() {

        when(repository.findByConnectionId("CONN1"))
                .thenReturn(List.of(reading));

        var result = service.getByConnection("CONN1");

        assertEquals(1, result.size());
        assertEquals("CONN1", result.get(0).getConnectionId());
    }

    @Test
    void getLatest_success() {

        when(repository.findTopByConnectionIdOrderByReadingDateDesc("CONN1"))
                .thenReturn(Optional.of(reading));

        var result = service.getLatest("CONN1");

        assertNotNull(result);
        assertEquals("R1", result.getId());
    }

    @Test
    void getLatest_notFound() {

        when(repository.findTopByConnectionIdOrderByReadingDateDesc("CONN1"))
                .thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class,
                () -> service.getLatest("CONN1"));
    }
}
