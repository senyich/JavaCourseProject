package com.pajeroparts.Service;

import com.pajeroparts.DTO.*;
import com.pajeroparts.entity.*;
import com.pajeroparts.repositoryes.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class PajeroPartsService {

    @Autowired
    private VehicleRepository vehicleRepository;

    @Autowired
    private PartGroupRepository partGroupRepository;

    @Autowired
    private SubGroupRepository subGroupRepository;

    @Autowired
    private DiagramRepository diagramRepository;

    @Autowired
    private DiagramPartRepository diagramPartRepository;

    @Autowired
    private OemPartRepository oemPartRepository;

    @Autowired
    private VehicleGroupRepository vehicleGroupRepository;

    // Публичные методы

    public ApiResponse<List<GroupDTO>> searchByFrame(String frame) {
        // Проверяем, есть ли такой Frame в базе
        Optional<Vehicle> vehicle = vehicleRepository.findByFrame(frame);
        if (vehicle.isEmpty()) {
            return ApiResponse.error("Frame не найден: " + frame);
        }

        // Получаем группы для этого Frame
        List<PartGroup> groups = partGroupRepository.findGroupsByFrame(frame);

        List<GroupDTO> groupDTOs = groups.stream()
                .map(GroupDTO::new)
                .collect(Collectors.toList());

        return ApiResponse.success("Группы загружены", groupDTOs);
    }

    public ApiResponse<List<SubGroupDTO>> getSubGroups(Long groupId) {
        List<SubGroup> subGroups = subGroupRepository.findByGroupId(groupId);

        List<SubGroupDTO> subGroupDTOs = subGroups.stream()
                .map(SubGroupDTO::new)
                .collect(Collectors.toList());

        return ApiResponse.success("Подгруппы загружены", subGroupDTOs);
    }

    public ApiResponse<DiagramDTO> getDiagramBySubGroup(Long subGroupId) {
        Optional<Diagram> diagram = diagramRepository.findBySubGroupId(subGroupId);

        if (diagram.isEmpty()) {
            return ApiResponse.error("Схема не найдена для данной подгруппы");
        }

        return ApiResponse.success("Схема загружена", new DiagramDTO(diagram.get()));
    }

    public ApiResponse<OemPartDTO> getOemPart(String oemNumber) {
        Optional<OemPart> part = oemPartRepository.findByOemNumber(oemNumber);

        return part.map(value -> ApiResponse.success("Деталь найдена", new OemPartDTO(value)))
                .orElseGet(() -> ApiResponse.error("OEM номер не найден: " + oemNumber));
    }

    // Админ методы

    public ApiResponse<VehicleDTO> addVehicle(Vehicle vehicle) {
        if (vehicleRepository.existsById(vehicle.getFrame())) {
            return ApiResponse.error("Frame уже существует: " + vehicle.getFrame());
        }

        Vehicle saved = vehicleRepository.save(vehicle);
        return ApiResponse.success("Автомобиль добавлен", new VehicleDTO(saved));
    }

    public ApiResponse<PartGroup> addGroup(PartGroup group) {
        PartGroup saved = partGroupRepository.save(group);
        return ApiResponse.success("Группа добавлена", saved);
    }

    public ApiResponse<SubGroup> addSubGroup(Long groupId, SubGroup subGroup) {
        Optional<PartGroup> group = partGroupRepository.findById(groupId);
        if (group.isEmpty()) {
            return ApiResponse.error("Группа не найдена");
        }

        subGroup.setGroup(group.get());
        SubGroup saved = subGroupRepository.save(subGroup);
        return ApiResponse.success("Подгруппа добавлена", saved);
    }

    public ApiResponse<Void> linkGroupToFrame(String frame, Long groupId) {
        if (!vehicleRepository.existsById(frame)) {
            return ApiResponse.error("Frame не найден");
        }

        if (!partGroupRepository.existsById(groupId)) {
            return ApiResponse.error("Группа не найдена");
        }

        VehicleGroup vg = new VehicleGroup(frame, groupId);
        vehicleGroupRepository.save(vg);

        return ApiResponse.success("Группа привязана к Frame", null);
    }

    public ApiResponse<Diagram> addDiagram(Diagram diagram) {
        Diagram saved = diagramRepository.save(diagram);
        return ApiResponse.success("Схема добавлена", saved);
    }

    public ApiResponse<OemPart> addOemPart(OemPart part) {
        if (oemPartRepository.findByOemNumber(part.getOemNumber()).isPresent()) {
            return ApiResponse.error("OEM номер уже существует");
        }

        OemPart saved = oemPartRepository.save(part);
        return ApiResponse.success("OEM деталь добавлена", saved);
    }

    public ApiResponse<DiagramPart> addPartToDiagram(DiagramPart diagramPart) {
        DiagramPart saved = diagramPartRepository.save(diagramPart);
        return ApiResponse.success("Деталь привязана к схеме", saved);
    }
}