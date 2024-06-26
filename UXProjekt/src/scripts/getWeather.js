import { useGeolocation } from "./getPosition.js";

// Gets position from Geolocation and uses the longitude and latitude to fetch weatherdata
export async function fetchWeatherData() {
    const { latitude, longitude } = await useGeolocation();
    // console.log(latitude, longitude)

    const category = 'pmp3g';
    const version = 2;

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