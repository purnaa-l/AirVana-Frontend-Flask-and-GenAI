package com.postgresql.aqi.dto;

import java.time.LocalDate;
import java.time.LocalTime;

public class AqiDto {

    private Long aqiId;
    private LocalDate date;
    private LocalTime time;
    private String city;
    private String station;
    private String coordinates;
    private String measuringTime;
    private String carbonMonoxide;
    private String humidity;
    private String nitrogenDioxide;
    private String ozone;
    private String pressure;
    private String pm10;
    private String pm2_5;
    private String sulphurDioxide;
    private String temperature;
    private String windSpeed;
    private Long AQI;
    private String verdict;

    // Constructor
    public AqiDto(Long aqiId, LocalDate date, LocalTime time, String city, String station, String coordinates,
                  String measuringTime, String carbonMonoxide, String humidity, String nitrogenDioxide,
                  String ozone, String pressure, String pm10, String pm2_5, String sulphurDioxide,
                  String temperature, String windSpeed, Long AQI, String verdict) {
        this.aqiId = aqiId;
        this.date = date;
        this.time = time;
        this.city = city;
        this.station = station;
        this.coordinates = coordinates;
        this.measuringTime = measuringTime;
        this.carbonMonoxide = carbonMonoxide;
        this.humidity = humidity;
        this.nitrogenDioxide = nitrogenDioxide;
        this.ozone = ozone;
        this.pressure = pressure;
        this.pm10 = pm10;
        this.pm2_5 = pm2_5;
        this.sulphurDioxide = sulphurDioxide;
        this.temperature = temperature;
        this.windSpeed = windSpeed;
        this.AQI = AQI;
        this.verdict = verdict;
    }

    // Getters and Setters
    public Long getAqiId() {
        return aqiId;
    }

    public void setAqiId(Long aqiId) {
        this.aqiId = aqiId;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public LocalTime getTime() {
        return time;
    }

    public void setTime(LocalTime time) {
        this.time = time;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getStation() {
        return station;
    }

    public void setStation(String station) {
        this.station = station;
    }

    public String getCoordinates() {
        return coordinates;
    }

    public void setCoordinates(String coordinates) {
        this.coordinates = coordinates;
    }

    public String getMeasuringTime() {
        return measuringTime;
    }

    public void setMeasuringTime(String measuringTime) {
        this.measuringTime = measuringTime;
    }

    public String getCarbonMonoxide() {
        return carbonMonoxide;
    }

    public void setCarbonMonoxide(String carbonMonoxide) {
        this.carbonMonoxide = carbonMonoxide;
    }

    public String getHumidity() {
        return humidity;
    }

    public void setHumidity(String humidity) {
        this.humidity = humidity;
    }

    public String getNitrogenDioxide() {
        return nitrogenDioxide;
    }

    public void setNitrogenDioxide(String nitrogenDioxide) {
        this.nitrogenDioxide = nitrogenDioxide;
    }

    public String getOzone() {
        return ozone;
    }

    public void setOzone(String ozone) {
        this.ozone = ozone;
    }

    public String getPressure() {
        return pressure;
    }

    public void setPressure(String pressure) {
        this.pressure = pressure;
    }

    public String getPm10() {
        return pm10;
    }

    public void setPm10(String pm10) {
        this.pm10 = pm10;
    }

    public String getPm2_5() {
        return pm2_5;
    }

    public void setPm2_5(String pm2_5) {
        this.pm2_5 = pm2_5;
    }

    public String getSulphurDioxide() {
        return sulphurDioxide;
    }

    public void setSulphurDioxide(String sulphurDioxide) {
        this.sulphurDioxide = sulphurDioxide;
    }

    public String getTemperature() {
        return temperature;
    }

    public void setTemperature(String temperature) {
        this.temperature = temperature;
    }

    public String getWindSpeed() {
        return windSpeed;
    }

    public void setWindSpeed(String windSpeed) {
        this.windSpeed = windSpeed;
    }

    public Long getAQI() {
        return AQI;
    }

    public void setAQI(Long AQI) {
        this.AQI = AQI;
    }

    public String getVerdict() {
        return verdict;
    }

    public void setVerdict(String verdict) {
        this.verdict = verdict;
    }
}
