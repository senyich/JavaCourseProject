package com.japancats.DTO;

import java.util.List;
import java.util.stream.Collectors;

import com.japancats.entity.SystemDiagram;

public class SystemDiagramDTO {
    private Long id;
    private String name;
    private String imageUrl;
    private List<PartDTO> parts;

    public SystemDiagramDTO() {}

    public SystemDiagramDTO(SystemDiagram diagram) {
        this.id = diagram.getId();
        this.name = diagram.getName();
        this.imageUrl = diagram.getImageUrl();

        if (diagram.getParts() != null) {
            this.parts = diagram.getParts().stream()
                    .map(PartDTO::new)
                    .collect(Collectors.toList());
        }
    }

    // Геттеры и сеттеры
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public List<PartDTO> getParts() { return parts; }
    public void setParts(List<PartDTO> parts) { this.parts = parts; }
}