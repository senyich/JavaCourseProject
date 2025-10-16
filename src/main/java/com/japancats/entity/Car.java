package com.japancats.entity;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "cars")
public class Car {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String brand;

    @Column(nullable = false)
    private String model;

    @Column(name = "production_year")  
    private Integer productionYear;

    private String imageUrl;

    @OneToMany(mappedBy = "car", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<CarSystem> systems = new ArrayList<>();

    public Car() {}

    public Car(String brand, String model, Integer productionYear) {  // И В КОНСТРУКТОРЕ
        this.brand = brand;
        this.model = model;
        this.productionYear = productionYear;
    }

    
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

    public List<CarSystem> getSystems() { return systems; }
    public void setSystems(List<CarSystem> systems) { this.systems = systems; }
}
