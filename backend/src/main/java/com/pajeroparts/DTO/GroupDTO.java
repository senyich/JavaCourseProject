package com.pajeroparts.DTO;

import com.pajeroparts.entity.PartGroup;
import java.util.List;
import java.util.stream.Collectors;

public class GroupDTO {
    private Long id;
    private String name;
    private String description;
    private List<SubGroupDTO> subGroups;

    public GroupDTO() {}

    public GroupDTO(PartGroup group) {
        this.id = group.getId();
        this.name = group.getName();
        this.description = group.getDescription();

        if (group.getSubGroups() != null) {
            this.subGroups = group.getSubGroups().stream()
                    .map(SubGroupDTO::new)
                    .collect(Collectors.toList());
        }
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public List<SubGroupDTO> getSubGroups() { return subGroups; }
    public void setSubGroups(List<SubGroupDTO> subGroups) { this.subGroups = subGroups; }
}