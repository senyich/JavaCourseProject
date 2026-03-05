package com.pajeroparts.DTO;

import com.pajeroparts.entity.Vehicle;

public class VehicleDTO {
    private String frame;
    private String brand;
    private String model;
    private Integer year;

    public VehicleDTO() {}

    public VehicleDTO(Vehicle vehicle) {
        this.frame = vehicle.getFrame();
        this.brand = vehicle.getBrand();
        this.model = vehicle.getModel();
        this.year = vehicle.getProductionYear();
    }

    // Getters and Setters
    public String getFrame() { return frame; }
    public void setFrame(String frame) { this.frame = frame; }

    public String getBrand() { return brand; }
    public void setBrand(String brand) { this.brand = brand; }

    public String getModel() { return model; }
    public void setModel(String model) { this.model = model; }

    public Integer getYear() { return year; }
    public void setYear(Integer year) { this.year = year; }
}