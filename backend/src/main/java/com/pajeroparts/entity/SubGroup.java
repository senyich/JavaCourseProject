package com.pajeroparts.entity;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "sub_groups")
public class SubGroup {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;  // "Рама и крепления кузова"

    private String description;

    @ManyToOne
    @JoinColumn(name = "group_id")
    private PartGroup group;

    @OneToMany(mappedBy = "subGroup", cascade = CascadeType.ALL)
    private List<Diagram> diagrams = new ArrayList<>();

    // Constructors
    public SubGroup() {}

    public SubGroup(String name, String description, PartGroup group) {
        this.name = name;
        this.description = description;
        this.group = group;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public PartGroup getGroup() { return group; }
    public void setGroup(PartGroup group) { this.group = group; }

    public List<Diagram> getDiagrams() { return diagrams; }
    public void setDiagrams(List<Diagram> diagrams) { this.diagrams = diagrams; }
}