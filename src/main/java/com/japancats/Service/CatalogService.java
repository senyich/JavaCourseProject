package com.japancats.Service;

import com.japancats.DTO.*;
import com.japancats.entity.*;
import com.japancats.repositoryes.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class CatalogService {

    @Autowired
    private CarRepository carRepository;

    @Autowired
    private CarSystemRepository carSystemRepository;

    @Autowired
    private SystemDiagramRepository systemDiagramRepository;

    @Autowired
    private PartRepository partRepository;

    // Получить все автомобили
    public List<CarDTO> getAllCars() {
        return carRepository.findAll().stream()
                .map(CarDTO::new)
                .collect(Collectors.toList());
    }


    public CarDTO getCarById(Long carId) {
        return carRepository.findById(carId)
                .map(CarDTO::new)
                .orElse(null);
    }


    public List<CarSystemDTO> getSystemsByCarId(Long carId) {
        return carSystemRepository.findByCarId(carId).stream()
                .map(CarSystemDTO::new)
                .collect(Collectors.toList());
    }


    public SystemDiagramDTO getDiagramWithParts(Long diagramId) {
        return systemDiagramRepository.findById(diagramId)
                .map(SystemDiagramDTO::new)
                .orElse(null);
    }


    public PartDTO getPartByNumber(String partNumber) {
        return partRepository.findByPartNumber(partNumber)
                .map(PartDTO::new)
                .orElse(null);
    }

    // Админ методы
    public Car addCar(Car car) {
        return carRepository.save(car);
    }

    public CarSystem addSystemToCar(Long carId, CarSystem system) {
        Car car = carRepository.findById(carId).orElse(null);
        if (car != null) {
            system.setCar(car);
            return carSystemRepository.save(system);
        }
        return null;
    }

    public SystemDiagram addDiagramToSystem(Long systemId, SystemDiagram diagram) {
        CarSystem system = carSystemRepository.findById(systemId).orElse(null);
        if (system != null) {
            diagram.setSystem(system);
            return systemDiagramRepository.save(diagram);
        }
        return null;
    }

    public Part addPart(Part part) {
        return partRepository.save(part);
    }
}