export async function getCityFromCoordinates(latitude, longitude) {
    const KEY = "AIzaSyCL7CZnV51KyZOIBPYpBXwQ8K-b8-YrdQc";
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${KEY}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        let parts = data.results[0].address_components;
        let city = parts.find(part =>
            part.types.includes("locality") ||
            part.types.includes("sublocality") ||
            part.types.includes("administrative_area_level_2")
        );
        return city ? city.long_name : "City not found";
    } catch (err) {
        console.warn('Error fetching city:', err.message);
        return "City not found";
    }
}