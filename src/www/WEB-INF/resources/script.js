// Function to fetch weather forecast data based on the user's current position
async function fetchWeatherForecastBasedOnPosition() {
    if (navigator.geolocation) {
        try {
            // Get the user's current position
            const position = await getCurrentPosition();
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            // Call the function to fetch weather forecast data using the obtained coordinates
            await fetchWeatherForecast(latitude, longitude);
        } catch (error) {
            console.error('Error getting user position:', error);
        }
    } else {
        console.error('Geolocation is not supported by this browser.');
    }
}

// Function to fetch current position
function getCurrentPosition() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}

// Function to fetch weather forecast data based on the provided latitude and longitude
async function fetchWeatherForecast(latitude, longitude) {
    try {
        // Send an AJAX request to the server with latitude and longitude parameters
        const response = await fetch(`/weatherforecast?latitude=${latitude}&longitude=${longitude}`);
        if (!response.ok) {
            throw new Error('Failed to fetch weather forecast');
        }
        const data = await response.json();
        // Display the weather forecast data on the web page
        displayWeatherForecast(data);
    } catch (error) {
        console.error('Error fetching weather forecast:', error);
    }
}

// Function to initialize the application
function init() {
    // Fetch weather forecast data based on the user's current position when the page loads
    fetchWeatherForecastBasedOnPosition();

    // Assuming there is a button with id 'refresh-button' to refresh the forecast data
    const refreshButton = document.getElementById('refresh-button');
    refreshButton.addEventListener('click', fetchWeatherForecastBasedOnPosition);
}

// Call the init function when the DOM is ready
document.addEventListener('DOMContentLoaded', init);
