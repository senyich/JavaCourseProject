package com.pajeroparts.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "oem_parts")
public class OemPart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "oem_number", nullable = false)
    private String oemNumber;  // "MB123456"

    @Column(nullable = false)
    private String name;  // "Кронштейн рамы передний правый"

    private String description;

    // Constructors
    public OemPart() {}

    public OemPart(String oemNumber, String name, String description) {
        this.oemNumber = oemNumber;
        this.name = name;
        this.description = description;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getOemNumber() { return oemNumber; }
    public void setOemNumber(String oemNumber) { this.oemNumber = oemNumber; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}