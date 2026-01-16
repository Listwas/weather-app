const API_KEY = "YOUR_API_KEY";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export async function fetchCurrentWeather(cityName) {
  const res = await fetch(
    `${BASE_URL}/weather?q=${cityName}&appid=${API_KEY}&units=metric`,
  );
  if (!res.ok) throw new Error("Failed to fetch current weather");
  return res.json();
}

export async function fetchForecast(cityName) {
  const res = await fetch(
    `${BASE_URL}/forecast?q=${cityName}&appid=${API_KEY}&units=metric`,
  );
  if (!res.ok) throw new Error("Failed to fetch forecast");
  return res.json();
}
