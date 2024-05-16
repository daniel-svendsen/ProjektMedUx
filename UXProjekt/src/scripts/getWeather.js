import { useGeolocation } from "./getPosition.js";

export async function fetchWeatherData() {

    const position = await useGeolocation();
    let latitude = position.latitude;
    let longitude = position.longitude;

    console.log(latitude, longitude)

    const category = 'pmp3g';
    const version = 2;

    // No need for .value here
    const url = `https://opendata-download-metfcst.smhi.se/api/category/${category}/version/${version}/geotype/point/lon/${longitude}/lat/${latitude}/data.json`;

    try {
        const response = await fetch(url);
        const weatherData = await response.json();
        return weatherData;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        return null;
    }
}

