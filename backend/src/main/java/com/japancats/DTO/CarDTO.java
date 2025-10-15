package com.japancats.DTO;

import java.util.List;
import java.util.stream.Collectors;

import com.japancats.entity.Car;


public class CarDTO {
    private Long id;
    private String brand;
    private String model;
    private Integer productionYear;  // ИЗМЕНИТЕ ЗДЕСЬ
    private String imageUrl;
    private List<CarSystemDTO> systems;

    public CarDTO() {}

    public CarDTO(Car car) {
        this.id = car.getId();
        this.brand = car.getBrand();
        this.model = car.getModel();
        this.productionYear = car.getProductionYear();  // И ЗДЕСЬ
        this.imageUrl = car.getImageUrl();

        if (car.getSystems() != null) {
            this.systems = car.getSystems().stream()
                    .map(CarSystemDTO::new)
                    .collect(Collectors.toList());
        }
    }

    // Геттеры и сеттеры
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getBrand() { return brand; }
    public void setBrand(String brand) { this.brand = brand; }

    public String getModel() { return model; }
    public void setModel(String model) { this.model = model; }

    public Integer getProductionYear() { return productionYear; }  // И ЗДЕСЬ
    public void setProductionYear(Integer productionYear) { this.productionYear = productionYear; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public List<CarSystemDTO> getSystems() { return systems; }
    public void setSystems(List<CarSystemDTO> systems) { this.systems = systems; }
}