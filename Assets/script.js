const apiKey = '61b57cadb4205fca33d1c4fb8262fcfc';
const apiUrl = 'https://api.openweathermap.org/data/2.5';

const searchForm = document.getElementById('search-form');
const cityInput = document.getElementById('city-input');
const currentWeather = document.getElementById('current-weather');
const forecast = document.getElementById('forecast');
const searchHistory = document.getElementById('search-history');

searchForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const cityName = cityInput.value;
    getWeatherData(cityName);
});

function getWeatherData(cityName) {
    fetch(`${apiUrl}/weather?q=${cityName}&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            // Process and display current weather data
            displayWeatherData(data);
        })
        .catch(error => console.error('Error fetching weather data:', error));
}

function displayWeatherData(data) {
    // Extract relevant information from the data
    const cityName = data.name;
    const date = new Date(data.dt * 1000); // Convert timestamp to date
    const icon = data.weather[0].icon;
    const temperature = data.main.temp;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;

    // Update the content of HTML elements
    currentWeather.innerHTML = `
        <h2>${cityName}</h2>
        <p>Date: ${date.toDateString()}</p>
        <img src="https://openweathermap.org/img/w/${icon}.png" alt="Weather Icon">
        <p>Temperature: ${temperature}°C</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind Speed: ${windSpeed} m/s</p>
    `;
}