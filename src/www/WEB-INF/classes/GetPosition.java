import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

import org.json.*;

public class GetPosition {
    public static Position getPosition() throws PositionDataException {
        try {
            HttpClient client = HttpClient.newHttpClient();
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create("https://ipinfo.io/json"))
                    .build();

            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

            JSONObject jsonObject = new JSONObject(response.body());
            String[] locArray = jsonObject.getString("loc").split(",");
            if (locArray.length < 2) {
                throw new PositionDataException("Invalid position data format.");
            }
            double latitude = Double.parseDouble(locArray[0]);
            double longitude = Double.parseDouble(locArray[1]);
            return new Position(latitude, longitude);
        } catch (IOException | InterruptedException e) {
            throw new PositionDataException("Error occurred while retrieving position data.", e);
        }
    }

    public static class Position {
        private final double latitude;
        private final double longitude;

        public Position(double latitude, double longitude) {
            this.latitude = latitude;
            this.longitude = longitude;
        }

        public double getLatitude() {
            return latitude;
        }

        public double getLongitude() {
            return longitude;
        }
    }

    public static class PositionDataException extends Exception {
        public PositionDataException(String message) {
            super(message);
        }

        public PositionDataException(String message, Throwable cause) {
            super(message, cause);
        }
    }
}
