package com.chubb.meter.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.chubb.meter.dto.MeterReadingRequest;
import com.chubb.meter.dto.MeterReadingResponse;
import com.chubb.meter.exception.DuplicateReadingException;
import com.chubb.meter.exception.ResourceNotFoundException;
import com.chubb.meter.models.MeterReading;
import com.chubb.meter.repository.MeterReadingRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MeterReadingService {

    private final MeterReadingRepository repository;

    public MeterReadingResponse create(MeterReadingRequest request) {

        boolean exists = repository.existsByConsumerIdAndUtilityIdAndReadingDate(
                request.getConsumerId(),
                request.getUtilityId(),
                request.getReadingDate()
        );

        if (exists) {
            throw new DuplicateReadingException("Meter reading already exists for this date");
        }

        MeterReading reading = MeterReading.builder()
                .consumerId(request.getConsumerId())
                .utilityId(request.getUtilityId())
                .readingValue(request.getReadingValue())
                .readingDate(request.getReadingDate())
                .createdAt(LocalDateTime.now())
                .build();

        return map(repository.save(reading));
    }

    public List<MeterReadingResponse> getByConsumer(String consumerId) {
        return repository.findByConsumerId(consumerId)
                .stream()
                .map(this::map)
                .collect(Collectors.toList());
    }

    public MeterReadingResponse getLatest(String consumerId) {
        MeterReading reading = repository
                .findTopByConsumerIdOrderByReadingDateDesc(consumerId)
                .orElseThrow(() -> new ResourceNotFoundException("No meter readings found"));

        return map(reading);
    }

    private MeterReadingResponse map(MeterReading r) {
        return MeterReadingResponse.builder()
                .id(r.getId())
                .consumerId(r.getConsumerId())
                .utilityId(r.getUtilityId())
                .readingValue(r.getReadingValue())
                .readingDate(r.getReadingDate())
                .createdAt(r.getCreatedAt())
                .build();
    }
}
