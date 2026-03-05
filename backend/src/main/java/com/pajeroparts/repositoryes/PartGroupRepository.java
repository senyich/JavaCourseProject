package com.pajeroparts.repositoryes;

import com.pajeroparts.entity.PartGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PartGroupRepository extends JpaRepository<PartGroup, Long> {

    @Query("SELECT pg FROM PartGroup pg WHERE pg.id IN " +
            "(SELECT vg.groupId FROM VehicleGroup vg WHERE vg.frame = :frame)")
    List<PartGroup> findGroupsByFrame(@Param("frame") String frame);
}
