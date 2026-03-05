package com.pajeroparts.repositoryes;

import com.pajeroparts.entity.Diagram;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface DiagramRepository extends JpaRepository<Diagram, Long> {
    Optional<Diagram> findBySubGroupId(Long subGroupId);
    List<Diagram> findBySubGroupIdIn(List<Long> subGroupIds);
}