import "../styles/CityCard.css";

function CityCard({ city }) {
  return (
    <div className="city-card">
      <h2>
        {city.name}, {city.country}
      </h2>

      {/* Current Weather */}
      <div className="current-weather">
        <span className="icon">{city.current.icon}</span>
        <p className="temp">{city.current.temp}°C</p>
        <p className="condition">{city.current.condition}</p>
      </div>

      {/* Weather Details */}
      <div className="weather-details">
        <div className="detail-item">
          <span className="detail-label">Precipitation</span>
          <span className="detail-value">{city.current.precipitation}%</span>
        </div>

        <div className="detail-item">
          <span className="detail-label">Amount</span>
          <span className="detail-value">
            {city.current.precipitationAmount} mm/m²
          </span>
        </div>

        <div className="detail-item">
          <span className="detail-label">Wind Speed</span>
          <span className="detail-value">{city.current.windSpeed} km/h</span>
        </div>

        <div className="detail-item">
          <span className="detail-label">Direction</span>
          <span className="detail-value">{city.current.windDirection}</span>
        </div>

        <div className="detail-item">
          <span className="detail-label">Cloudiness</span>
          <span className="detail-value">{city.current.cloudiness}%</span>
        </div>

        <div className="detail-item">
          <span className="detail-label">Type</span>
          <span className="detail-value">{city.current.precipitationType}</span>
        </div>
      </div>

      {/* 5-Day Forecast */}
      <div className="forecast">
        <h3>5-Day Forecast</h3>
        <div className="forecast-days">
          {city.forecast.map((day, index) => (
            <div key={index} className="forecast-day">
              <div className="forecast-day-name">{day.day}</div>
              <div className="forecast-icon">{day.icon}</div>
              <div className="forecast-temp">{day.temp}°C</div>
              <div className="forecast-precip">{day.precipitation}%</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CityCard;
