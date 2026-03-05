package com.pajeroparts.entity;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "part_groups")
public class PartGroup {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;  // "Рама"

    private String description;

    @OneToMany(mappedBy = "group", cascade = CascadeType.ALL)
    private List<SubGroup> subGroups = new ArrayList<>();

    // Constructors
    public PartGroup() {}

    public PartGroup(String name, String description) {
        this.name = name;
        this.description = description;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public List<SubGroup> getSubGroups() { return subGroups; }
    public void setSubGroups(List<SubGroup> subGroups) { this.subGroups = subGroups; }
}