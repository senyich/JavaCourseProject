package com.pajeroparts.repositoryes;

import com.pajeroparts.entity.OemPart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface OemPartRepository extends JpaRepository<OemPart, Long> {
    Optional<OemPart> findByOemNumber(String oemNumber);
}