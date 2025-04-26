// index.js

// Step 1: Fetch Data from the API
const apiKey = '4ba40abfd26e866c6fa1bed403e68711';  // Your actual API key
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';  // Correct API endpoint

// Fetch weather data from the API
async function fetchWeatherData(city) {
    const url = `${apiUrl}?q=${city}&appid=${apiKey}&units=metric`;  // Use the correct URL format

    // Show the loading indicator
    toggleLoading(true);

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('City not found');
        const data = await response.json();
        console.log(data);  // For debugging
        displayWeather(data);
    } catch (error) {
        displayError(error.message);
    } finally {
        // Hide the loading indicator once the request is complete
        toggleLoading(false);
    }
}

// Step 2: Display Weather Data on the Page
function displayWeather(data) {
    const weatherInfo = document.getElementById('weather-info');
    weatherInfo.innerHTML = `
        <h2>Weather for ${data.name}</h2>
        <p>Temperature: ${data.main.temp} °C</p>
        <p>Humidity: ${data.main.humidity} %</p>
        <p>Description: ${data.weather[0].description}</p>
    `;
}

// Step 3: Handle Errors
function displayError(message) {
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = `Error: ${message}`;
}

// Step 4: Handle User Input
document.getElementById('fetch-weather').addEventListener('click', () => {
    const city = document.getElementById('city-input').value;
    console.log("City input:", city);  // Debugging: Check if the city name is captured
    if (city) {
        fetchWeatherData(city);
    } else {
        displayError('Please enter a city name.');
    }
});

// Step 5: Toggle Loading Indicator
function toggleLoading(isLoading) {
    const loadingIndicator = document.getElementById('loading-indicator');
    loadingIndicator.style.display = isLoading ? 'block' : 'none';
}
