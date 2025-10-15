package com.japancats.controllers;

import com.japancats.entity.*;
import com.japancats.Service.CatalogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    @Autowired
    private CatalogService catalogService;

    @PostMapping("/cars")
    public ResponseEntity<Car> addCar(@RequestBody Car car) {
        Car savedCar = catalogService.addCar(car);
        return savedCar != null ? ResponseEntity.ok(savedCar) : ResponseEntity.badRequest().build();
    }

    @PostMapping("/cars/{carId}/systems")
    public ResponseEntity<CarSystem> addSystem(@PathVariable Long carId, @RequestBody CarSystem system) {
        CarSystem savedSystem = catalogService.addSystemToCar(carId, system);
        return savedSystem != null ? ResponseEntity.ok(savedSystem) : ResponseEntity.badRequest().build();
    }

    @PostMapping("/systems/{systemId}/diagrams")
    public ResponseEntity<SystemDiagram> addDiagram(@PathVariable Long systemId, @RequestBody SystemDiagram diagram) {
        SystemDiagram savedDiagram = catalogService.addDiagramToSystem(systemId, diagram);
        return savedDiagram != null ? ResponseEntity.ok(savedDiagram) : ResponseEntity.badRequest().build();
    }

    @PostMapping("/parts")
    public ResponseEntity<Part> addPart(@RequestBody Part part) {
        Part savedPart = catalogService.addPart(part);
        return savedPart != null ? ResponseEntity.ok(savedPart) : ResponseEntity.badRequest().build();
    }
}