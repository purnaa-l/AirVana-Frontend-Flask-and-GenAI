package com.postgresql.aqi.controller;

import com.postgresql.aqi.dto.AqiDto;
import com.postgresql.aqi.service.AqiService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/aqi")
public class AqiController {
    private final AqiService aqiService;

    public AqiController(AqiService aqiService) {
        this.aqiService = aqiService;
    }

    // Build add AQI REST API
    @PostMapping
    public ResponseEntity<AqiDto> createAqi(@RequestBody AqiDto aqiDto) {
        AqiDto savedAqi = aqiService.createAqi(aqiDto);
        return new ResponseEntity<>(savedAqi, HttpStatus.CREATED);
    }
}
