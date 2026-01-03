package com.chubb.consumer.service;

import com.chubb.consumer.dto.*;
import com.chubb.consumer.exception.ResourceNotFoundException;
import com.chubb.consumer.feign.UtilityClient;
import com.chubb.consumer.models.Connection;
import com.chubb.consumer.models.ConnectionRequest;
import com.chubb.consumer.repository.ConnectionRepository;
import com.chubb.consumer.repository.ConnectionRequestRepository;
import com.chubb.consumer.repository.ConsumerRepository;
import com.chubb.consumer.models.TariffType;
import lombok.RequiredArgsConstructor;


import org.springframework.stereotype.Service;
import com.chubb.consumer.models.ConnectionStatus;
import com.chubb.consumer.models.RequestStatus;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ConnectionService {

    private final ConnectionRepository connectionRepo;
    private final ConsumerRepository consumerRepo;
    private final UtilityClient utilityClient;
    private final ConnectionRequestRepository requestRepo;

   

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

    public ConnectionResponseDTO getById(String connectionId) {
        Connection connection = connectionRepo.findById(connectionId)
                .orElseThrow(() -> new ResourceNotFoundException("Connection not found"));
        return map(connection);
    }

 // ADMIN – approve & create connection
    public ConnectionResponseDTO create(ConnectionRequestDTO dto) {

        if (!consumerRepo.existsById(dto.getConsumerId())) {
            throw new ResourceNotFoundException("Consumer not found");
        }

        utilityClient.getUtilityById(dto.getUtilityId());

        Connection connection = connectionRepo.save(
                Connection.builder()
                        .consumerId(dto.getConsumerId())
                        .utilityId(dto.getUtilityId())
                        .tariffType(dto.getTariffType())
                        .active(true)
                        .build()
        );

        return map(connection);
    }

    // CONSUMER – request connection
    public void requestConnection(ConnectionRequestDTO dto) {

        if (!consumerRepo.existsById(dto.getConsumerId())) {
            throw new ResourceNotFoundException("Consumer not found");
        }

        utilityClient.getUtilityById(dto.getUtilityId());

        ConnectionRequest request = ConnectionRequest.builder()
                .consumerId(dto.getConsumerId())
                .utilityId(dto.getUtilityId())
                .tariffType(dto.getTariffType())
                .status(RequestStatus.PENDING)
                .requestedAt(LocalDateTime.now())
                .build();

        requestRepo.save(request);
    }

    private ConnectionResponseDTO map(Connection c) {
        return ConnectionResponseDTO.builder()
                .id(c.getId())
                .consumerId(c.getConsumerId())
                .utilityId(c.getUtilityId())
                .tariffType(c.getTariffType())
                .active(c.isActive())
                .build();
    }
    

}
