import React, { useState } from "react";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const API_KEY = "3de40e639ccfd1223294e8153d888de4"; // replace with your actual key

  const fetchWeather = async () => {
    if (!city) {
      setError("Please enter a city name");
      return;
    }
    setError("");
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      if (!response.ok) throw new Error("City not found");
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    }
  };

  return (
    <div className="weather-container">
      <h2>🌤️ Weather App</h2>
      <div className="input-section">
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Get Weather</button>
      </div>

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-info">
          <h3>{weather.name}, {weather.sys.country}</h3>
          <p>🌡️ {weather.main.temp} °C</p>
          <p>💧 Humidity: {weather.main.humidity}%</p>
          <p>🌬️ Wind Speed: {weather.wind.speed} m/s</p>
          <p>☁️ Condition: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
