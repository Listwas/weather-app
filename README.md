# weather app (react)

simple weather forecast app built with react.
created as a semester project for a frontend programming course.

## what it does

* shows weather for multiple cities on the home page
* displays:

  * current temperature
  * weather condition (icon)
  * 5-day forecast
  * precipitation probability, type and amount
  * wind speed and direction
  * cloudiness
* lets you:

  * search cities by name
  * mark cities as favorites
  * view favorites on a separate page
  * change temperature units (°C / °F / K)

## tech stack

* react
* react router
* redux toolkit
* axios
* css (no ui libraries)
* openweathermap api

## state management

* redux is used for:

  * global temperature unit
  * favorite cities
* selected unit and favorites are saved in `localStorage`
* state is restored after page refresh

## routing

* `/` – home (all cities)
* `/favorites` – favorite cities

navigation handled with react router.

## api

weather data comes from the OpenWeatherMap API.
the api key is stored in environment variables (not committed to the repo).

example:

```
VITE_WEATHER_API_KEY=your_api_key_here
```

## running locally

```
npm install
npm run dev
```

## notes

this project focuses on functionality and clear structure rather than visual polish.
all weather data is fetched dynamically from the api.
