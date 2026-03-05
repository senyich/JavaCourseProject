package com.pajeroparts.DTO;

import com.pajeroparts.entity.OemPart;

public class OemPartDTO {
    private Long id;
    private String oemNumber;
    private String name;
    private String description;

    public OemPartDTO() {}

    public OemPartDTO(OemPart part) {
        this.id = part.getId();
        this.oemNumber = part.getOemNumber();
        this.name = part.getName();
        this.description = part.getDescription();
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