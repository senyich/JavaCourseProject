package com.japancats.entity;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "car_systems")
public class CarSystem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String description;
    private String iconUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "car_id")
    private Car car;

    @OneToMany(mappedBy = "system", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<SystemDiagram> diagrams = new ArrayList<>();

    public CarSystem() {}

    public CarSystem(String name, String description) {
        this.name = name;
        this.description = description;
    }


    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getIconUrl() { return iconUrl; }
    public void setIconUrl(String iconUrl) { this.iconUrl = iconUrl; }

    public Car getCar() { return car; }
    public void setCar(Car car) { this.car = car; }

    public List<SystemDiagram> getDiagrams() { return diagrams; }
    public void setDiagrams(List<SystemDiagram> diagrams) { this.diagrams = diagrams; }
}