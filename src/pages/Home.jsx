import { useState } from "react";
import CityGrid from "../components/CityGrid";
import { mockCities } from "../data/mockWeatherData";

export default function Home({ searchQuery }) {
  const [cities, setCities] = useState(() => {
    const saved = localStorage.getItem("favorites");
    const favIds = saved ? JSON.parse(saved) : [];
    return mockCities.map((c) => ({ ...c, isFavorite: favIds.includes(c.id) }));
  });

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
  return <CityGrid cities={filtered} toggleFavorite={toggleFavorite} />;
}
