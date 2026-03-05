package com.pajeroparts.repositoryes;

import com.pajeroparts.entity.SubGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface SubGroupRepository extends JpaRepository<SubGroup, Long> {
    List<SubGroup> findByGroupId(Long groupId);
}