package com.japancats.repositoryes;


import com.japancats.entity.SystemDiagram;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SystemDiagramRepository extends JpaRepository<SystemDiagram, Long> {
    List<SystemDiagram> findBySystemId(Long systemId);
}