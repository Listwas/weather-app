import { useState, useEffect } from "react";
import CityGrid from "../components/CityGrid.jsx";
import { fetchCurrentWeather, fetchForecast } from "../api/weatherAPI.js";
import { weatherIcon } from "../api/weatherIcon.js";

export default function Home({ searchQuery }) {
  const initialCities = [
    { name: "Warsaw" },
    { name: "Wroclaw" },
    { name: "Gdansk" },
    { name: "Berlin" },
    { name: "Paris" },
    { name: "Rome" },
  ];

  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      const results = await Promise.all(
        initialCities.map(async (c) => {
          try {
            const current = await fetchCurrentWeather(c.name);
            const forecastData = await fetchForecast(c.name);
            return {
              ...c,
              id: c.name,
              isFavorite: JSON.parse(
                localStorage.getItem("favorites") || "[]",
              ).includes(c.name),
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
                .filter((_, i) => i % 8 === 0) // roughly next 5 days
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
            console.error("fetch error for", c.name, err);
            return c;
          }
        }),
      );
      setCities(results);
      setLoading(false);
    };
    fetchAll();
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

  if (loading) return <p className="center">Loading weather data...</p>;
  if (!filteredCities.length)
    return <p className="center">No cities match your search 😢</p>;

  return <CityGrid cities={filteredCities} toggleFavorite={toggleFavorite} />;
}
