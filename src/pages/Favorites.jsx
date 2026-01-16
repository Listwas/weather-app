import { useState, useEffect } from "react";
import CityGrid from "../components/CityGrid.jsx";
import { fetchCurrentWeather, fetchForecast } from "../api/weatherAPI.js";
import { weatherIcon } from "../api/weatherIcon.js";

export default function Favorites({ searchQuery }) {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favorites") || "[]");
    if (saved.length === 0) {
      setCities([]);
      setLoading(false);
      return;
    }

    const fetchFavs = async () => {
      setLoading(true);
      const results = await Promise.all(
        saved.map(async (name) => {
          try {
            const current = await fetchCurrentWeather(name);
            const forecastData = await fetchForecast(name);
            return {
              name,
              id: name,
              isFavorite: true,
              current: {
                temp: current.main.temp,
                icon: weatherIcon(current.weather[0].icon),
                condition: current.weather[0].main,
                precipitation: Math.round((current.rain?.["1h"] || 0) * 100),
                precipitationAmount: current.rain?.["1h"] || 0,
                windSpeed: current.wind.speed,
                windDirection: `${current.wind.deg}°`,
                cloudiness: current.clouds.all,
                precipitationType: current.rain ? "rain" : "none",
              },
              forecast: forecastData.list
                .filter((_, i) => i % 8 === 0)
                .slice(0, 5)
                .map((f) => ({
                  day: new Date(f.dt_txt).toLocaleDateString("en-US", {
                    weekday: "short",
                  }),
                  temp: f.main.temp,
                  icon: weatherIcon(f.weather[0].icon),
                  precipitation: Math.round(f.pop * 100),
                })),
            };
          } catch (err) {
            console.error("fetch error for", name, err);
            return { name, id: name, isFavorite: true };
          }
        }),
      );
      setCities(results);
      setLoading(false);
    };
    fetchFavs();
  }, []);

  const toggleFavorite = (id) => {
    setCities((prev) => {
      const updated = prev.map((city) =>
        city.id === id ? { ...city, isFavorite: !city.isFavorite } : city,
      );
      const favIds = updated.filter((c) => c.isFavorite).map((c) => c.id);
      localStorage.setItem("favorites", JSON.stringify(favIds));
      return updated;
    });
  };

  const filteredCities = cities.filter((city) =>
    city.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (loading) return <p className="center">Loading favorite cities...</p>;
  if (!filteredCities.length)
    return <p className="center">No favorites yet 😢</p>;

  return <CityGrid cities={filteredCities} toggleFavorite={toggleFavorite} />;
}
