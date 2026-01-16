import CityCard from "./CityCard.jsx";

export default function CityGrid({ cities, toggleFavorite }) {
  return (
    <div className="city-grid">
      {cities.map((city) => (
        <CityCard key={city.id} city={city} toggleFavorite={toggleFavorite} />
      ))}
    </div>
  );
}
