package com.chubb.consumer.service;

import com.chubb.consumer.dto.*;
import com.chubb.consumer.exception.ResourceNotFoundException;
import com.chubb.consumer.feign.UtilityClient;
import com.chubb.consumer.models.Connection;
import com.chubb.consumer.repository.ConnectionRepository;
import com.chubb.consumer.repository.ConsumerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ConnectionService {

    private final ConnectionRepository connectionRepo;
    private final ConsumerRepository consumerRepo;
    private final UtilityClient utilityClient;

    public ConnectionResponseDTO create(ConnectionRequestDTO dto) {


        if (!consumerRepo.existsById(dto.getConsumerId())) {
            throw new ResourceNotFoundException("Consumer not found");
        }


        utilityClient.getUtilityById(dto.getUtilityId());


        Connection connection = connectionRepo.save(
                Connection.builder()
                        .consumerId(dto.getConsumerId())
                        .utilityId(dto.getUtilityId())
                        .active(true)
                        .build()
        );

        return map(connection);
    }

    public List<ConnectionResponseDTO> getByConsumerId(String consumerId) {
        return connectionRepo.findByConsumerId(consumerId)
                .stream()
                .map(this::map)
                .toList();
    }

    public ConnectionResponseDTO updateStatus(String connectionId, ConnectionUpdateDTO dto) {

        Connection connection = connectionRepo.findById(connectionId)
                .orElseThrow(() -> new ResourceNotFoundException("Connection not found"));

        connection.setActive(dto.isActive());
        return map(connectionRepo.save(connection));
    }

    private ConnectionResponseDTO map(Connection c) {
        return ConnectionResponseDTO.builder()
                .id(c.getId())
                .consumerId(c.getConsumerId())
                .utilityId(c.getUtilityId())
                .active(c.isActive())
                .build();
    }
    public ConnectionResponseDTO getById(String connectionId) {
        Connection connection = connectionRepo.findById(connectionId)
                .orElseThrow(() -> new ResourceNotFoundException("Connection not found"));
        return map(connection);
    }

}
