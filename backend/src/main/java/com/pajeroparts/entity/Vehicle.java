package com.pajeroparts.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "vehicles")
public class Vehicle {
    @Id
    private String frame;  // L048G-3004771

    @Column(nullable = false)
    private String brand;

    @Column(nullable = false)
    private String model;

    private Integer productionYear;

    // Constructors
    public Vehicle() {}

    public Vehicle(String frame, String brand, String model, Integer year) {
        this.frame = frame;
        this.brand = brand;
        this.model = model;
        this.productionYear = year;
    }

    // Getters and Setters
    public String getFrame() { return frame; }
    public void setFrame(String frame) { this.frame = frame; }

    public String getBrand() { return brand; }
    public void setBrand(String brand) { this.brand = brand; }

    public String getModel() { return model; }
    public void setModel(String model) { this.model = model; }

    public Integer getProductionYear() { return productionYear; }
    public void setProductionYear(Integer productionYear) { this.productionYear = productionYear; }
}