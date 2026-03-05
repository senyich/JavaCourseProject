package com.pajeroparts.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "diagram_parts")
public class DiagramPart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "diagram_id")
    private Diagram diagram;

    @ManyToOne
    @JoinColumn(name = "oem_part_id")
    private OemPart oemPart;

    private Integer positionX;  // координата для клика
    private Integer positionY;

    private String label;  // номер на схеме "1", "2", "3"

    private String description;  // доп. описание для этой позиции

    // Constructors
    public DiagramPart() {}

    public DiagramPart(Diagram diagram, OemPart oemPart, Integer positionX,
                       Integer positionY, String label, String description) {
        this.diagram = diagram;
        this.oemPart = oemPart;
        this.positionX = positionX;
        this.positionY = positionY;
        this.label = label;
        this.description = description;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Diagram getDiagram() { return diagram; }
    public void setDiagram(Diagram diagram) { this.diagram = diagram; }

    public OemPart getOemPart() { return oemPart; }
    public void setOemPart(OemPart oemPart) { this.oemPart = oemPart; }

    public Integer getPositionX() { return positionX; }
    public void setPositionX(Integer positionX) { this.positionX = positionX; }

    public Integer getPositionY() { return positionY; }
    public void setPositionY(Integer positionY) { this.positionY = positionY; }

    public String getLabel() { return label; }
    public void setLabel(String label) { this.label = label; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}