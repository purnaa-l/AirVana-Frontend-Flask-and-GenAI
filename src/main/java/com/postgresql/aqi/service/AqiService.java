package com.postgresql.aqi.service;

import com.postgresql.aqi.dto.AqiDto;
import com.postgresql.aqi.entity.Aqi;

public interface AqiService {
    AqiDto createAqi(AqiDto aqiDto);
    AqiDto getAqi(Long aqiId);
}
