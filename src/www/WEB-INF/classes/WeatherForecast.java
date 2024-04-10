import org.json.*;
import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class WeatherForecast {
    public static String getWeatherForecast(GetPosition.Position position) throws WeatherForecastException {
        double latitude = position.getLatitude();
        double longitude = position.getLongitude();
        String apiUrl = "https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/"
                + longitude + "/lat/" + latitude + "/data.json";

        try {
            HttpClient client = HttpClient.newHttpClient();
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(apiUrl))
                    .build();

            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            if (response.statusCode() != 200) {
                throw new WeatherForecastException(
                        "Failed to retrieve weather forecast. HTTP status code: " + response.statusCode());
            }

            return response.body();
        } catch (IOException | InterruptedException e) {
            throw new WeatherForecastException("Error occurred while retrieving weather forecast.", e);
        }
    }

    public static class WeatherForecastException extends Exception {
        public WeatherForecastException(String message) {
            super(message);
        }

        public WeatherForecastException(String message, Throwable cause) {
            super(message, cause);
        }
    }
}
