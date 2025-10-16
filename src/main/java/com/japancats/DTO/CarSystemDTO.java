package com.japancats.DTO;

import java.util.List;
import java.util.stream.Collectors;

import com.japancats.entity.CarSystem;

public class CarSystemDTO {
    private Long id;
    private String name;
    private String description;
    private String iconUrl;
    private List<SystemDiagramDTO> diagrams;

    public CarSystemDTO() {}

    public CarSystemDTO(CarSystem system) {
        this.id = system.getId();
        this.name = system.getName();
        this.description = system.getDescription();
        this.iconUrl = system.getIconUrl();

        if (system.getDiagrams() != null) {
            this.diagrams = system.getDiagrams().stream()
                    .map(SystemDiagramDTO::new)
                    .collect(Collectors.toList());
        }
    }

    
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getIconUrl() { return iconUrl; }
    public void setIconUrl(String iconUrl) { this.iconUrl = iconUrl; }

    public List<SystemDiagramDTO> getDiagrams() { return diagrams; }
    public void setDiagrams(List<SystemDiagramDTO> diagrams) { this.diagrams = diagrams; }
}
