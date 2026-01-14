import { mockCities } from "./data/mockWeatherData";
import Header from "./components/Header";
import CityGrid from "./components/CityGrid";
import "./styles/App.css";

function App() {
  return (
    <div className="center">
      <div>
        <Header />
        <CityGrid cities={mockCities} />
      </div>
    </div>
  );
}

export default App;
