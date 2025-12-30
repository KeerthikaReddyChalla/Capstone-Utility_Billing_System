package com.chubb.utility.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.chubb.utility.dto.CreateTariffRequest;
import com.chubb.utility.dto.TariffRequest;
import com.chubb.utility.dto.TariffResponse;
import com.chubb.utility.dto.UpdateTariffRequest;
import com.chubb.utility.exception.ResourceNotFoundException;
import com.chubb.utility.models.Tariff;
import com.chubb.utility.repository.TariffRepository;
import com.chubb.utility.repository.UtilityRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TariffService {

    private final TariffRepository tariffRepository;
    private final UtilityRepository utilityRepository;


    public TariffResponse create(CreateTariffRequest request) {

        if (!utilityRepository.existsById(request.getUtilityId())) {
            throw new ResourceNotFoundException(
                    "Utility not found with id: " + request.getUtilityId());
        }

        Tariff tariff = Tariff.builder()
                .utilityId(request.getUtilityId())
                .name(request.getName())
                .ratePerUnit(request.getRatePerUnit())
                .effectiveFrom(request.getEffectiveFrom())
                .active(true)
                .build();

        return map(tariffRepository.save(tariff));
    }


    public TariffResponse update(String tariffId, UpdateTariffRequest request) {

        Tariff tariff = tariffRepository.findById(tariffId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Tariff not found"));

        tariff.setName(request.getName());
        tariff.setRatePerUnit(request.getRatePerUnit());
        tariff.setEffectiveFrom(request.getEffectiveFrom());

        return map(tariffRepository.save(tariff));
    }


    public List<TariffResponse> getAll() {
        return tariffRepository.findAll()
                .stream()
                .map(this::map)
                .toList();
    }


    public TariffResponse getById(String tariffId) {
        Tariff tariff = tariffRepository.findById(tariffId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Tariff not found"));

        return map(tariff);
    }


    public List<TariffResponse> getByUtility(String utilityId) {


        if (!utilityRepository.existsById(utilityId)) {
            throw new ResourceNotFoundException(
                    "Utility not found with id: " + utilityId);
        }

        return tariffRepository.findByUtilityId(utilityId)
                .stream()
                .map(this::map)
                .toList();
    }


   


    private TariffResponse map(Tariff tariff) {
        return TariffResponse.builder()
                .id(tariff.getId())
                .utilityId(tariff.getUtilityId())
                .name(tariff.getName())
                .ratePerUnit(tariff.getRatePerUnit())
                .active(tariff.isActive())
                .build();
    }
    public Double getRateByUtilityId(String utilityId) {

        Tariff tariff = tariffRepository
                .findFirstByUtilityIdAndActiveTrue(utilityId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Active tariff not found for utility"));

        return tariff.getRatePerUnit();
    }

}
