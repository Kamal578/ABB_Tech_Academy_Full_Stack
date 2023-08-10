import React from "react";
import "./WeatherDisplay.css";

const WeatherDisplay = ({ weather }) => {
  if (!weather) {
    return null;
  }

  const {
    temperature,
    description,
    icon,
    feelsLike,
    pressure,
    humidity,
    windSpeed,
    windDeg,
    sunrise,
    sunset,
    timezone,
    name,
  } = weather;

  const sunriseTime = new Date(sunrise * 1000).toLocaleTimeString();
  const sunsetTime = new Date(sunset * 1000).toLocaleTimeString();
  const timezoneHours = timezone / 3600;
  // round up temperature

  const roundedTemp = Math.round(temperature);

  return (
    <div className="weather-display">
      <h2>
        <img
          className="weather-icon"
          src={`https://openweathermap.org/img/w/${icon}.png`}
          alt={description}
        />
        <p>{description}</p>
      </h2>
      <p className="temperature">{roundedTemp} <span>°C</span></p>
      <p>City: {name}</p>
      <p>Feels Like: {feelsLike}°C</p>
      <p>Pressure: {pressure} hPa</p>
      <p>Humidity: {humidity}%</p>
      <p>Wind Speed: {windSpeed} m/s</p>
      <p>Wind Direction: {windDeg}°</p>
      <p>Sunrise: {sunriseTime}</p>
      <p>Sunset: {sunsetTime}</p>
      <p>Timezone: GMT {timezoneHours}</p>
    </div>
  );
};

export default WeatherDisplay;
