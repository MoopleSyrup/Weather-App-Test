// DOM Elements
const cityInput = document.getElementById('cityInput');
const searchButton = document.getElementById('searchButton');
const errorMessage = document.getElementById('errorMessage');
const loadingSpinner = document.getElementById('loadingSpinner');
const weatherInfo = document.getElementById('weatherInfo');
const weatherIcon = document.getElementById('weatherIcon');
const temperature = document.getElementById('temperature');
const cityName = document.getElementById('cityName');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('windSpeed');

// Event Listener for Search Button
searchButton.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeather(city);
    } else {
        showError('Please enter a city name.');
    }
});

// Function to Fetch Weather Data
async function fetchWeather(city) {
    const apiKey = '8fb5b63e41a445397e91f9005c5438fd'; // Replace with a secure method
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`;

    try {
        // Show loading spinner
        loadingSpinner.style.display = 'block';
        errorMessage.style.display = 'none';
        weatherInfo.style.display = 'none';

        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.cod === 200 && data.weather && data.main && data.wind) {
            const weatherCondition = data.weather[0].main.toLowerCase();

            // Update weather information
            temperature.textContent = `${Math.round(data.main.temp)}°C`;
            cityName.textContent = data.name;
            humidity.textContent = `${data.main.humidity}%`;
            windSpeed.textContent = `${data.wind.speed} km/h`;

            // Update local weather icon
            updateWeatherIcon(weatherCondition);

            // Show weather information
            weatherInfo.style.display = 'block';
        } else {
            showError('City not found. Please try again.');
        }
    } catch (error) {
        showError('An error occurred. Please try again.');
    } finally {
        // Hide loading spinner
        loadingSpinner.style.display = 'none';
    }
}

// Function to Update Weather Icon Using Local Images
function updateWeatherIcon(weatherCondition) {
    let iconSrc = 'images/clear.png'; // Default icon

    const iconMap = {
        clear: 'images/clear.png',
        clouds: 'images/clouds.png',
        rain: 'images/rain.png',
        drizzle: 'images/drizzle.png',
        thunderstorm: 'images/thunder.png',
        snow: 'images/snow.png',
        mist: 'images/mist.png',
        fog: 'images/mist.png',
        haze: 'images/mist.png',
        smoke: 'images/mist.png',
        dust: 'images/dust.png',
        sand: 'images/dust.png',
        ash: 'images/dust.png',
        squall: 'images/wind.png',
        tornado: 'images/tornado.png',
    };

    // Check if condition exists in the iconMap
    if (iconMap[weatherCondition]) {
        iconSrc = iconMap[weatherCondition];
    }

    // Apply the new icon
    weatherIcon.src = iconSrc;
    weatherIcon.alt = weatherCondition.charAt(0).toUpperCase() + weatherCondition.slice(1);
}

// Function to Show Error Message
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    weatherInfo.style.display = 'none';
}
