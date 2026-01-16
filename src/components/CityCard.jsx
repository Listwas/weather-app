import { useSelector } from "react-redux";
import "../styles/CityCard.css";

export default function CityCard({ city, toggleFavorite }) {
  const unit = useSelector((state) => state.units.tempUnit);

  const convertTemp = (c) => {
    switch (unit) {
      case "F":
        return Math.round((c * 9) / 5 + 32);
      case "K":
        return Math.round(c + 273.15);
      default:
        return Math.round(c);
    }
  };

  return (
    <div className="city-card">
      <h2>
        <span>
          {city.name}, {city.country}
        </span>
        <button
          className="favorite"
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(city.id);
          }}
        >
          {city.isFavorite ? "★" : "☆"}
        </button>
      </h2>

      <div className="current-weather">
        <span className="icon">{city.current.icon}</span>
        <p className="temp">
          {convertTemp(city.current.temp)}°{unit}
        </p>
        <p className="condition">{city.current.condition}</p>
      </div>

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

      <div className="forecast">
        <h3>5-Day Forecast</h3>
        <div className="forecast-days">
          {city.forecast.map((day, idx) => (
            <div key={idx} className="forecast-day">
              <div className="forecast-day-name">{day.day}</div>
              <div className="forecast-icon">{day.icon}</div>
              <div className="forecast-temp">
                {convertTemp(day.temp)}°{unit}
              </div>
              <div className="forecast-precip">{day.precipitation}%</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
