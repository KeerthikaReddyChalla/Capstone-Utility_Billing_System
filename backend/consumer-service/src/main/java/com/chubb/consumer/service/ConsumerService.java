package com.chubb.consumer.service;

import com.chubb.consumer.dto.ConsumerRequestDTO;
import com.chubb.consumer.dto.ConsumerResponseDTO;
import com.chubb.consumer.exception.ResourceNotFoundException;
import com.chubb.consumer.feign.AuthClient;
import com.chubb.consumer.models.Consumer;
import com.chubb.consumer.repository.ConsumerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ConsumerService {

    private final ConsumerRepository repository;
    private final AuthClient authClient;

    public ConsumerResponseDTO createConsumer(ConsumerRequestDTO dto) {
        authClient.getUserById(dto.getUserId());

        Consumer consumer = repository.save(
                Consumer.builder()
                        .userId(dto.getUserId())
                        .fullName(dto.getFullName())
                        .email(dto.getEmail())
                        .phone(dto.getPhone())
                        .address(dto.getAddress())
                        .build()
        );

        return map(consumer);
    }

    public ConsumerResponseDTO getById(String id) {
        return map(repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Consumer not found")));
    }

    public List<ConsumerResponseDTO> getAll() {
        return repository.findAll().stream().map(this::map).toList();
    }

    private ConsumerResponseDTO map(Consumer c) {
        return ConsumerResponseDTO.builder()
                .id(c.getId())
                .fullName(c.getFullName())
                .email(c.getEmail())
                .phone(c.getPhone())
                .address(c.getAddress())
                .build();
    }
    public void deleteConsumer(String consumerId) {
        if (!repository.existsById(consumerId)) {
            throw new ResourceNotFoundException("Consumer not found");
        }
        repository.deleteById(consumerId);
    }

}
