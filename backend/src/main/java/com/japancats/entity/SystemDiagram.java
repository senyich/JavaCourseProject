package com.japancats.entity;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "system_diagrams")
public class SystemDiagram {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String imageUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "system_id")
    private CarSystem system;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "diagram_parts",
            joinColumns = @JoinColumn(name = "diagram_id"),
            inverseJoinColumns = @JoinColumn(name = "part_id")
    )
    private List<Part> parts = new ArrayList<>();

    public SystemDiagram() {}

    public SystemDiagram(String name, String imageUrl) {
        this.name = name;
        this.imageUrl = imageUrl;
    }


    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public CarSystem getSystem() { return system; }
    public void setSystem(CarSystem system) { this.system = system; }

    public List<Part> getParts() { return parts; }
    public void setParts(List<Part> parts) { this.parts = parts; }
}