package com.pajeroparts.DTO;

import com.pajeroparts.entity.SubGroup;

public class SubGroupDTO {
    private Long id;
    private String name;
    private String description;
    private Long groupId;
    private boolean hasDiagram;

    public SubGroupDTO() {}

    public SubGroupDTO(SubGroup subGroup) {
        this.id = subGroup.getId();
        this.name = subGroup.getName();
        this.description = subGroup.getDescription();
        this.groupId = subGroup.getGroup() != null ? subGroup.getGroup().getId() : null;
        this.hasDiagram = subGroup.getDiagrams() != null && !subGroup.getDiagrams().isEmpty();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Long getGroupId() { return groupId; }
    public void setGroupId(Long groupId) { this.groupId = groupId; }

    public boolean isHasDiagram() { return hasDiagram; }
    public void setHasDiagram(boolean hasDiagram) { this.hasDiagram = hasDiagram; }
}