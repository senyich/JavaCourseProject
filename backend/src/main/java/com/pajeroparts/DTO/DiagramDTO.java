package com.pajeroparts.DTO;

import com.pajeroparts.entity.Diagram;
import java.util.List;
import java.util.stream.Collectors;

public class DiagramDTO {
    private Long id;
    private String name;
    private String imageUrl;
    private String description;
    private Long subGroupId;
    private List<DiagramPartDTO> parts;

    public DiagramDTO() {}

    public DiagramDTO(Diagram diagram) {
        this.id = diagram.getId();
        this.name = diagram.getName();
        this.imageUrl = diagram.getImageUrl();
        this.description = diagram.getDescription();
        this.subGroupId = diagram.getSubGroup() != null ? diagram.getSubGroup().getId() : null;

        if (diagram.getDiagramParts() != null) {
            this.parts = diagram.getDiagramParts().stream()
                    .map(DiagramPartDTO::new)
                    .collect(Collectors.toList());
        }
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

    public Long getSubGroupId() { return subGroupId; }
    public void setSubGroupId(Long subGroupId) { this.subGroupId = subGroupId; }

    public List<DiagramPartDTO> getParts() { return parts; }
    public void setParts(List<DiagramPartDTO> parts) { this.parts = parts; }
}