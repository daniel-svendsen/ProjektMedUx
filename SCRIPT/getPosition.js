export function getPosition(callback) {
    // Check if Geolocation API is supported by the browser
    if ("geolocation" in navigator) {
        // Call getCurrentPosition to retrieve the user's position
        navigator.geolocation.getCurrentPosition(function (position) {
            // Extract latitude and longitude from the position object
            const latitude = position.coords.latitude.toFixed(4);
            const longitude = position.coords.longitude.toFixed(4);
            // Call the callback function with latitude and longitude as parameters
            callback(latitude, longitude);
        }, function (error) {
            // Handle errors if any occur
            console.error('Error getting position:', error.message);
            // Handle user denying access if necessary
        });
    } else {
        // If Geolocation API is not supported by the browser
        console.error('Geolocation is not supported by your browser');
        // Handle this scenario here
    }
}