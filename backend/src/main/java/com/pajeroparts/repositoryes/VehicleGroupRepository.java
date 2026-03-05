package com.pajeroparts.repositoryes;

import com.pajeroparts.entity.VehicleGroup;
import com.pajeroparts.entity.VehicleGroupId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface VehicleGroupRepository extends JpaRepository<VehicleGroup, VehicleGroupId> {
    List<VehicleGroup> findByFrame(String frame);
    void deleteByFrame(String frame);
}