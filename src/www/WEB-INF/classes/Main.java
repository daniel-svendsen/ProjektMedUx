public class Main {
    public static void main(String[] args) {
        try {
            // Get position
            GetPosition.Position position = GetPosition.getPosition();

            // Get weather forecast based on position
            String weatherForecastJson = WeatherForecast.getWeatherForecast(position);

            // Parse and print weather forecast
            WeatherForecastParser.parseAndPrint(weatherForecastJson);
        } catch (GetPosition.PositionDataException | WeatherForecast.WeatherForecastException e) {
            e.printStackTrace();
        }
    }
}
