import org.json.*;

import java.util.ArrayList;
import java.util.List;

public class WeatherForecastParser {
    public static void parseAndPrint(String json) {
        JSONObject jsonObject = new JSONObject(json);

        // Extract time series data
        JSONArray timeSeries = jsonObject.getJSONArray("timeSeries");

        // Create a list to hold forecast entries for the target day
        List<ForecastEntry> forecastEntries = new ArrayList<>();

        // Get the date of the first entry to use as a reference for filtering
        String firstEntryDate = timeSeries.getJSONObject(0).getString("validTime").substring(0, 10);

        // Parse each time series entry and add it to the list if it belongs to the
        // target day
        for (int i = 0; i < timeSeries.length(); i++) {
            JSONObject timeData = timeSeries.getJSONObject(i);
            String validTime = timeData.getString("validTime");

            // Check if the valid time belongs to the same day as the first entry
            if (validTime.startsWith(firstEntryDate)) {
                // Extract parameters
                JSONArray parameters = timeData.getJSONArray("parameters");
                List<Parameter> parameterList = new ArrayList<>();
                for (int j = 0; j < parameters.length(); j++) {
                    JSONObject parameter = parameters.getJSONObject(j);
                    String name = parameter.getString("name");
                    String unit = parameter.getString("unit");
                    JSONArray values = parameter.getJSONArray("values");
                    String value = values.get(0).toString(); // Convert JSONArray to String
                    parameterList.add(new Parameter(name, value, unit));
                }

                // Create forecast entry and add to the list
                forecastEntries.add(new ForecastEntry(validTime, parameterList));
            }
        }

        // Print the forecast entries for the target day
        for (ForecastEntry entry : forecastEntries) {
            System.out.println("Time: " + entry.getValidTime());
            for (Parameter parameter : entry.getParameters()) {
                System.out.println(parameter.getName() + ": " + parameter.getValue() + " " + parameter.getUnit());
            }
            System.out.println(); // Add a blank line for readability
        }
    }

    static class ForecastEntry {
        private final String validTime;
        private final List<Parameter> parameters;

        public ForecastEntry(String validTime, List<Parameter> parameters) {
            this.validTime = validTime;
            this.parameters = parameters;
        }

        public String getValidTime() {
            return validTime;
        }

        public List<Parameter> getParameters() {
            return parameters;
        }
    }

    static class Parameter {
        private final String name;
        private final String value;
        private final String unit;

        public Parameter(String name, String value, String unit) {
            this.name = name;
            this.value = value;
            this.unit = unit;
        }

        public String getName() {
            return name;
        }

        public String getValue() {
            return value;
        }

        public String getUnit() {
            return unit;
        }
    }
}
