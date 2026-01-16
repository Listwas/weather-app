import { useState, useEffect } from "react";
import CityGrid from "../components/CityGrid";
import { mockCities } from "../data/mockWeatherData";

export default function Favorites({ searchQuery }) {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favorites")) || [];
    const favCities = mockCities
      .filter((c) => saved.includes(c.id))
      .map((c) => ({ ...c, isFavorite: true }));
    setCities(favCities);
  }, []);

  const toggleFavorite = (id) => {
    setCities((prev) => {
      const updated = prev.map((c) =>
        c.id === id ? { ...c, isFavorite: !c.isFavorite } : c,
      );
      localStorage.setItem(
        "favorites",
        JSON.stringify(updated.filter((c) => c.isFavorite).map((c) => c.id)),
      );
      return updated;
    });
  };

  const filtered = cities.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  if (!filtered.length)
    return (
      <p style={{ textAlign: "center", marginTop: "50px" }}>
        No favorites yet 😢
      </p>
    );

  return <CityGrid cities={filtered} toggleFavorite={toggleFavorite} />;
}
