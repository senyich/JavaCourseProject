package com.pajeroparts.repositoryes;

import com.pajeroparts.entity.DiagramPart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface DiagramPartRepository extends JpaRepository<DiagramPart, Long> {
    List<DiagramPart> findByDiagramId(Long diagramId);
}