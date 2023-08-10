# ABB Tech Academy

## Task: Weather App

1. Setup and Initial Components:
   - Set up your project using create-react-app or your preferred tool.
   - Create the necessary directory structure and initial files.
   - Install required packages: redux, react-redux, redux-thunk.
2. UI Components:
   - Design UI components, including a search bar and weather display area.
   - Create a component for the search bar where users can input a location.
   - Create a component to display weather information, like temperature, description, and an icon.

    Something like this:
    ![Weather App](./weather-app.png)

3. Create Redux Store:
   - Create a Redux store and configure reducers for managing weather data.
4. Redux Actions and Action Creators:
   - Create Redux action types (e.g., `FETCH_WEATHER_REQUEST`, `FETCH_WEATHER_SUCCESS`, `FETCH_WEATHER_FAILURE`).
   - Implement action creators for these actions.
5. Integrate Redux Thunk:
   Create a Redux Thunk action to fetch weather data.
   - Use the axios library to make API requests to 
   - OpenWeatherMap. Set up the API URL with the base URL (https://api.openweathermap.org/data/2.5).
6. Create Search Input and Button:
   - In the search bar component, create an input field where users can type a location (city or zip code).
   - Add a button that users will click to initiate the weather search.
7. Fetch Weather Data on Button Click:
   - Attach an event handler to the search button.
   - When the button is clicked, dispatch the Redux Thunk action to fetch weather data using the input value.
8. Display Weather Information:
   - Update the weather display component to show fetched weather information.
   - Display temperature, weather description, and an icon based on the condition.
9. Error Handling:
   - Handle API request errors and display error messages to users.
10. Loading:
    - Handle API request loading and display loading message to users.
11. Optional Enhancements:
    - Display additional weather information like humidity and wind speed.
    - Implement a 5-day weather forecast view.
