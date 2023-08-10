import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchWeather } from "./actions/weatherActions";
import SearchBar from "./components/SearchBar";
import WeatherDisplay from "./components/WeatherDisplay";
import "./App.css";

function App() {
  const weather = useSelector((state) => state.weather.weather);
  const loading = useSelector((state) => state.weather.loading);
  const error = useSelector((state) => state.weather.error);
  const dispatch = useDispatch();

  const handleSearch = (location) => {
    dispatch(fetchWeather(location));
  };

  return (
    // handle loading AND error

    <div className="App">
      <h1>Weather App</h1>
      <h2>Find out the current weather situation around the world</h2>
      <SearchBar onSearch={handleSearch} />
      {loading ? (
        <div class="spin">
          {" "}
          <div class="inner"></div>{" "}
        </div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <WeatherDisplay weather={weather} />
      )}
    </div>
    

    // <div className="App">
    //   <h1>Weather App</h1>
    //   <h2>Find out the current weather situation around the world</h2>
    //   <SearchBar onSearch={handleSearch} />
    //   {loading ? <div class="spin"> <div class="inner"></div> </div> : <WeatherDisplay weather={weather} />}
    // </div>

  );
}

export default App;
