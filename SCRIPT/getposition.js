import { WeatherForecast, WeatherForecastException } from './weatherforecast.js';

function getLocation() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            async function(position) {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                document.getElementById("location").innerHTML = "Latitude: " + latitude + ", Longitude: " + longitude;

                try {
                    const forecastData = await WeatherForecast.getWeatherForecast(latitude, longitude);
                    document.getElementById("forecast").textContent = JSON.stringify(forecastData);
                } catch (error) {
                    console.error("Error fetching weather forecast:", error);
                    document.getElementById("forecast").textContent = "Error fetching weather forecast.";
                }
            },
            function(error) {
                console.error("Error getting geolocation:", error);
                document.getElementById("location").innerHTML = "Error getting geolocation.";
            }
        );
    } else {
        console.error("Geolocation is not supported by this browser.");
        document.getElementById("location").innerHTML = "Geolocation is not supported by this browser.";
    }
}

window.addEventListener("load", getLocation);
