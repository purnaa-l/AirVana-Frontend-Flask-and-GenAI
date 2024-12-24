package com.postgresql.aqi.mapper;

import com.postgresql.aqi.dto.AqiDto;
import com.postgresql.aqi.entity.Aqi;

public class AqiMapper {

    // Convert AqiDto to Aqi entity
    public static Aqi mapToAqi(AqiDto aqiDto) {
        if (aqiDto == null) {
            return null; // handle null case to avoid NullPointerException
        }

        return new Aqi(
                aqiDto.getAqiId(),
                aqiDto.getDate(),
                aqiDto.getTime(),
                aqiDto.getCity(),
                aqiDto.getStation(),
                aqiDto.getCoordinates(),
                aqiDto.getMeasuringTime(),
                aqiDto.getCarbonMonoxide(),
                aqiDto.getHumidity(),
                aqiDto.getNitrogenDioxide(),
                aqiDto.getOzone(),
                aqiDto.getPressure(),
                aqiDto.getPm10(),
                aqiDto.getPm2_5(),
                aqiDto.getSulphurDioxide(),
                aqiDto.getTemperature(),
                aqiDto.getWindSpeed(),
                aqiDto.getAQI(),
                aqiDto.getVerdict()
        );
    }

    // Convert Aqi entity to AqiDto
    public static AqiDto mapToAqiDto(Aqi aqi) {
        if (aqi == null) {
            return null; // handle null case to avoid NullPointerException
        }

        return new AqiDto(
                aqi.getAqiId(),
                aqi.getDate(),
                aqi.getTime(),
                aqi.getCity(),
                aqi.getStation(),
                aqi.getCoordinates(),
                aqi.getMeasuringTime(),
                aqi.getCarbonMonoxide(),
                aqi.getHumidity(),
                aqi.getNitrogenDioxide(),
                aqi.getOzone(),
                aqi.getPressure(),
                aqi.getPm10(),
                aqi.getPm2_5(),
                aqi.getSulphurDioxide(),
                aqi.getTemperature(),
                aqi.getWindSpeed(),
                aqi.getAQI(),
                aqi.getVerdict()
        );
    }
}
