package com.pajeroparts.DTO;

import com.pajeroparts.entity.DiagramPart;

public class DiagramPartDTO {
    private Long id;
    private Integer positionX;
    private Integer positionY;
    private String label;
    private String description;
    private OemPartDTO part;

    public DiagramPartDTO() {}

    public DiagramPartDTO(DiagramPart diagramPart) {
        this.id = diagramPart.getId();
        this.positionX = diagramPart.getPositionX();
        this.positionY = diagramPart.getPositionY();
        this.label = diagramPart.getLabel();
        this.description = diagramPart.getDescription();

        if (diagramPart.getOemPart() != null) {
            this.part = new OemPartDTO(diagramPart.getOemPart());
        }
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Integer getPositionX() { return positionX; }
    public void setPositionX(Integer positionX) { this.positionX = positionX; }

    public Integer getPositionY() { return positionY; }
    public void setPositionY(Integer positionY) { this.positionY = positionY; }

    public String getLabel() { return label; }
    public void setLabel(String label) { this.label = label; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public OemPartDTO getPart() { return part; }
    public void setPart(OemPartDTO part) { this.part = part; }
}