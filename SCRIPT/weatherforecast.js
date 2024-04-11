class WeatherForecast {
    static async getWeatherForecast(latitude, longitude) {
        const apiUrl = `https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${longitude}/lat/${latitude}/data.json`;

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new WeatherForecastException(`Failed to retrieve weather forecast. HTTP status code: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            throw new WeatherForecastException("Error occurred while retrieving weather forecast.", error);
        }
    }
}

class WeatherForecastException extends Error {
    constructor(message) {
        super(message);
        this.name = "WeatherForecastException";
    }
}

// Export the classes to make them accessible in other files
export { WeatherForecast, WeatherForecastException };
