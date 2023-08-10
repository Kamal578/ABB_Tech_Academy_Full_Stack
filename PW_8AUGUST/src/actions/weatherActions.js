import axios from 'axios';

const API_KEY = 'b7e76492489aca8c24ca0c4ffc9e5ff2';

export const fetchWeatherRequest = () => {
  return { type: 'FETCH_WEATHER_REQUEST' };
};

export const fetchWeatherSuccess = (weather) => {
  return { type: 'FETCH_WEATHER_SUCCESS', payload: weather };
};

export const fetchWeatherFailure = (error) => {
  return { type: 'FETCH_WEATHER_FAILURE', payload: error };
};

export const fetchWeather = (location) => {
  return (dispatch) => {
    dispatch(fetchWeatherRequest());

    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`)
    //   {
    //     coord: { lon: 49.892, lat: 40.3777 },
    //     weather: [{ id: 800, main: "Clear", description: "clear sky", icon: "01n" }],
    //     base: "stations",
    //     main: {
    //       temp: 32.03,
    //       feels_like: 33.29,
    //       temp_min: 32.03,
    //       temp_max: 32.03,
    //       pressure: 1008,
    //       humidity: 45,
    //     },
    //     visibility: 10000,
    //     wind: { speed: 3.09, deg: 70 },
    //     clouds: { all: 0 },
    //     dt: 1691511628,
    //     sys: {
    //       type: 1,
    //       id: 8841,
    //       country: "AZ",
    //       sunrise: 1691459040,
    //       sunset: 1691509700,
    //     },
    //     timezone: 14400,
    //     id: 587084,
    //     name: "Baku",
    //     cod: 200,
    //   };
      
      .then((response) => {
        const weatherData = {
            temperature: response.data.main.temp,
            description: response.data.weather[0].description,
            icon: response.data.weather[0].icon,
            feelsLike: response.data.main.feels_like,
            pressure: response.data.main.pressure,
            humidity: response.data.main.humidity,
            windSpeed: response.data.wind.speed,
            windDeg: response.data.wind.deg,
            sunrise: response.data.sys.sunrise,
            sunset: response.data.sys.sunset,
            timezone: response.data.timezone,
            name: response.data.name,
        };
        dispatch(fetchWeatherSuccess(weatherData));
      })
      .catch((error) => {
        dispatch(fetchWeatherFailure(error.message));
      });
  };
};
