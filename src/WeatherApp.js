import React, { useState } from 'react';
import './App.css';

function WeatherApp() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    const trimmedCity = city.trim();
    if (!trimmedCity) {
      setError('Please enter a city name.');
      return;
    }

    setLoading(true);
    try {
      const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${trimmedCity}&appid=${apiKey}&units=metric`
      );

      if (!response.ok) throw new Error('City not found');

      const data = await response.json();
      setWeatherData(data);
      setError('');
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="weather-container">
      <h2>🌤 Real-Time Weather</h2>
      <div className="input-group">
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Get Weather</button>
      </div>

      {error && <p className="error">{error}</p>}
      {loading && <p className="loading">Loading...</p>}

      {weatherData && (
        <div className="weather-card">
          <h3>{weatherData.name}, {weatherData.sys.country}</h3>
          <p><strong>🌡 Temperature:</strong> {weatherData.main.temp} °C</p>
          <p><strong>☁ Weather:</strong> {weatherData.weather[0].main}</p>
          <p><strong>💧 Humidity:</strong> {weatherData.main.humidity}%</p>
          <p><strong>🌬 Wind:</strong> {weatherData.wind.speed} m/s</p>
          <img
            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
            alt="weather icon"
          />
        </div>
      )}
    </div>
  );
}

export default WeatherApp;