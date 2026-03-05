package com.pajeroparts.entity;

import java.io.Serializable;
import java.util.Objects;

public class VehicleGroupId implements Serializable {
    private String frame;
    private Long groupId;

    public VehicleGroupId() {}

    public VehicleGroupId(String frame, Long groupId) {
        this.frame = frame;
        this.groupId = groupId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        VehicleGroupId that = (VehicleGroupId) o;
        return Objects.equals(frame, that.frame) &&
                Objects.equals(groupId, that.groupId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(frame, groupId);
    }
}