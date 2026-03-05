package com.pajeroparts.entity;

import jakarta.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "vehicle_groups")
@IdClass(VehicleGroupId.class)
public class VehicleGroup {

    @Id
    @Column(name = "frame", nullable = false)
    private String frame;

    @Id
    @Column(name = "group_id", nullable = false)
    private Long groupId;

    // Конструкторы
    public VehicleGroup() {}

    public VehicleGroup(String frame, Long groupId) {
        this.frame = frame;
        this.groupId = groupId;
    }

    // Геттеры и сеттеры
    public String getFrame() { return frame; }
    public void setFrame(String frame) { this.frame = frame; }

    public Long getGroupId() { return groupId; }
    public void setGroupId(Long groupId) { this.groupId = groupId; }

    @Override
    public String toString() {
        return "VehicleGroup{frame='" + frame + "', groupId=" + groupId + "}";
    }
}