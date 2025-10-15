package com.japancats.repositoryes;

import com.japancats.entity.CarSystem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CarSystemRepository extends JpaRepository<CarSystem, Long> {
    List<CarSystem> findByCarId(Long carId);
}