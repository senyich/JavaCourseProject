package com.pajeroparts.entity;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "diagrams")
public class Diagram {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String imageUrl;  // "/uploads/diagrams/1700000000_rama.jpg"

    private String description;

    @ManyToOne
    @JoinColumn(name = "sub_group_id")
    private SubGroup subGroup;

    @OneToMany(mappedBy = "diagram", cascade = CascadeType.ALL)
    private List<DiagramPart> diagramParts = new ArrayList<>();

    // Constructors
    public Diagram() {}

    public Diagram(String name, String imageUrl, SubGroup subGroup) {
        this.name = name;
        this.imageUrl = imageUrl;
        this.subGroup = subGroup;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public SubGroup getSubGroup() { return subGroup; }
    public void setSubGroup(SubGroup subGroup) { this.subGroup = subGroup; }

    public List<DiagramPart> getDiagramParts() { return diagramParts; }
    public void setDiagramParts(List<DiagramPart> diagramParts) { this.diagramParts = diagramParts; }
}