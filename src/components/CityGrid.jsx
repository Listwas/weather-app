import CityCard from "./CityCard";

function CityGrid({ cities }) {
  return (
    <div className="city-grid">
      {cities.map((city) => (
        <CityCard key={city.id} city={city} />
      ))}
    </div>
  );
}

export default CityGrid;
