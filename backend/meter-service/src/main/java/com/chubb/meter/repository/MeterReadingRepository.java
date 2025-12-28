package com.chubb.meter.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.chubb.meter.models.MeterReading;

public interface MeterReadingRepository extends MongoRepository<MeterReading, String> {

    boolean existsByConsumerIdAndUtilityIdAndReadingDate(
            String consumerId, String utilityId, LocalDate readingDate);

    List<MeterReading> findByConsumerId(String consumerId);

    Optional<MeterReading> findTopByConsumerIdOrderByReadingDateDesc(String consumerId);
}
