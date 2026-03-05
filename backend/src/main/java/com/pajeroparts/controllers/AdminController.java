package com.pajeroparts.controllers;

import com.pajeroparts.DTO.ApiResponse;
import com.pajeroparts.DTO.LoginRequest;
import com.pajeroparts.DTO.LoginResponse;
import com.pajeroparts.entity.*;
import com.pajeroparts.Service.AdminService;
import com.pajeroparts.Service.PajeroPartsService;
import com.pajeroparts.repositoryes.DiagramRepository;
import com.pajeroparts.repositoryes.OemPartRepository;
import com.pajeroparts.repositoryes.SubGroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    @Autowired
    private DiagramRepository diagramRepository;

    @Autowired
    private OemPartRepository oemPartRepository;

    @Autowired
    private SubGroupRepository subGroupRepository;

    @Autowired
    private AdminService adminService;

    @Autowired
    private PajeroPartsService pajeroPartsService;

    @Value("${upload.path:./uploads/}")
    private String uploadPath;

    // Авторизация
    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
        return adminService.login(request);
    }

    @PostMapping("/logout")
    public ApiResponse<Void> logout(@RequestHeader("Authorization") String token) {
        if (!adminService.validateToken(token)) {
            return ApiResponse.error("Не авторизован");
        }
        adminService.logout();
        return ApiResponse.success("Выход выполнен", null);
    }

    // Вспомогательный метод для проверки токена
    private boolean checkToken(String token) {
        return adminService.validateToken(token);
    }

    // Управление автомобилями
    @PostMapping("/vehicles")
    public ApiResponse<?> addVehicle(
            @RequestHeader("Authorization") String token,
            @RequestBody Vehicle vehicle) {

        if (!checkToken(token)) {
            return ApiResponse.error("Не авторизован");
        }

        return pajeroPartsService.addVehicle(vehicle);
    }

    // Управление группами
    @PostMapping("/groups")
    public ApiResponse<?> addGroup(
            @RequestHeader("Authorization") String token,
            @RequestBody PartGroup group) {

        if (!checkToken(token)) {
            return ApiResponse.error("Не авторизован");
        }

        return pajeroPartsService.addGroup(group);
    }

    @PostMapping("/groups/{groupId}/subgroups")
    public ApiResponse<?> addSubGroup(
            @RequestHeader("Authorization") String token,
            @PathVariable Long groupId,
            @RequestBody SubGroup subGroup) {

        if (!checkToken(token)) {
            return ApiResponse.error("Не авторизован");
        }

        return pajeroPartsService.addSubGroup(groupId, subGroup);
    }

    // Привязка группы к Frame
    @PostMapping("/vehicles/{frame}/groups")
    public ApiResponse<Void> linkGroupToFrame(
            @RequestHeader("Authorization") String token,
            @PathVariable String frame,
            @RequestParam Long groupId) {

        if (!checkToken(token)) {
            return ApiResponse.error("Не авторизован");
        }

        return pajeroPartsService.linkGroupToFrame(frame, groupId);
    }

    // Загрузка схемы
    @PostMapping("/upload/diagram")
    public ApiResponse<String> uploadDiagram(
            @RequestHeader("Authorization") String token,
            @RequestParam("file") MultipartFile file,
            @RequestParam("subGroupId") Long subGroupId,
            @RequestParam("name") String name,
            @RequestParam(value = "description", required = false) String description) {

        if (!checkToken(token)) {
            return ApiResponse.error("Не авторизован");
        }

        try {
            // Создаем папку если не существует
            String diagramPath = uploadPath + "diagrams/";
            File directory = new File(diagramPath);
            if (!directory.exists()) {
                directory.mkdirs();
            }

            // Генерируем имя файла
            String originalFilename = file.getOriginalFilename();
            String extension = originalFilename.substring(originalFilename.lastIndexOf("."));
            String fileName = System.currentTimeMillis() + "_" + UUID.randomUUID().toString() + extension;

            // Сохраняем файл
            Path filePath = Paths.get(diagramPath + fileName);
            Files.write(filePath, file.getBytes());

            // ПОЛУЧАЕМ ПОДГРУППУ ИЗ БД
            SubGroup subGroup = subGroupRepository.findById(subGroupId)
                    .orElseThrow(() -> new RuntimeException("Подгруппа с ID " + subGroupId + " не найдена"));

            // Создаем запись в БД
            Diagram diagram = new Diagram();
            diagram.setName(name);
            diagram.setImageUrl("/uploads/diagrams/" + fileName);
            diagram.setDescription(description);
            diagram.setSubGroup(subGroup);  // ← ПРИВЯЗЫВАЕМ К ПОДГРУППЕ

            var result = pajeroPartsService.addDiagram(diagram);

            if (result.isSuccess()) {
                return ApiResponse.success("Схема загружена", diagram.getImageUrl());
            } else {
                return ApiResponse.error("Ошибка при сохранении схемы");
            }

        } catch (IOException e) {
            return ApiResponse.error("Ошибка при загрузке файла: " + e.getMessage());
        }
    }

    // Управление OEM номерами
    @PostMapping("/oem-parts")
    public ApiResponse<?> addOemPart(
            @RequestHeader("Authorization") String token,
            @RequestBody OemPart part) {

        if (!checkToken(token)) {
            return ApiResponse.error("Не авторизован");
        }

        return pajeroPartsService.addOemPart(part);
    }

    @PostMapping("/diagrams/{diagramId}/parts")
    public ApiResponse<?> addPartToDiagram(
            @RequestHeader("Authorization") String token,
            @PathVariable Long diagramId,
            @RequestParam Long oemPartId,  // получаем из параметра запроса
            @RequestBody DiagramPart diagramPart) {

        if (!checkToken(token)) {
            return ApiResponse.error("Не авторизован");
        }

        try {
            // 1. Получаем схему по ID
            Diagram diagram = diagramRepository.findById(diagramId)
                    .orElseThrow(() -> new RuntimeException("Схема не найдена"));

            // 2. Получаем OEM деталь по ID из параметра (НЕ ИЗ ТЕЛА!)
            OemPart oemPart = oemPartRepository.findById(oemPartId)
                    .orElseThrow(() -> new RuntimeException("OEM деталь не найдена"));

            // 3. Устанавливаем связи
            diagramPart.setDiagram(diagram);
            diagramPart.setOemPart(oemPart);

            // 4. Сохраняем
            return pajeroPartsService.addPartToDiagram(diagramPart);

        } catch (Exception e) {
            e.printStackTrace();
            return ApiResponse.error("Ошибка: " + e.getMessage());
        }
    }
}