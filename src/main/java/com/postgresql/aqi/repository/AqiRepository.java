package com.postgresql.aqi.repository;

import com.postgresql.aqi.entity.Aqi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface AqiRepository extends JpaRepository<Aqi, Long> {

}


