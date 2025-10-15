package com.japancats.controllers;

import com.japancats.DTO.*;
import com.japancats.Service.CatalogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/catalog")
@CrossOrigin(origins = "*")
public class CatalogController {

    @Autowired
    private CatalogService catalogService;

    @GetMapping("/cars")
    public List<CarDTO> getAllCars() {
        return catalogService.getAllCars();
    }

    @GetMapping("/cars/{carId}")
    public ResponseEntity<CarDTO> getCar(@PathVariable Long carId) {
        CarDTO car = catalogService.getCarById(carId);
        return car != null ? ResponseEntity.ok(car) : ResponseEntity.notFound().build();
    }

    @GetMapping("/cars/{carId}/systems")
    public ResponseEntity<List<CarSystemDTO>> getCarSystems(@PathVariable Long carId) {
        List<CarSystemDTO> systems = catalogService.getSystemsByCarId(carId);
        return systems != null ? ResponseEntity.ok(systems) : ResponseEntity.notFound().build();
    }

    @GetMapping("/diagrams/{diagramId}")
    public ResponseEntity<SystemDiagramDTO> getDiagram(@PathVariable Long diagramId) {
        SystemDiagramDTO diagram = catalogService.getDiagramWithParts(diagramId);
        return diagram != null ? ResponseEntity.ok(diagram) : ResponseEntity.notFound().build();
    }

    @GetMapping("/parts/{partNumber}")
    public ResponseEntity<PartDTO> getPart(@PathVariable String partNumber) {
        PartDTO part = catalogService.getPartByNumber(partNumber);
        return part != null ? ResponseEntity.ok(part) : ResponseEntity.notFound().build();
    }
}