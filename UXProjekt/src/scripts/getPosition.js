// getPosition.js

export async function useGeolocation() {
    return new Promise((resolve, reject) => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    const latitude = position.coords.latitude.toFixed(4);
                    const longitude = position.coords.longitude.toFixed(4);
                    resolve({ latitude, longitude, error: null });
                },
                err => {
                    console.error('Error getting position:', err.message);
                    reject(err.message);
                }
            );
        } else {
            console.error('Geolocation is not supported by your browser');
            reject('Geolocation is not supported by your browser');
        }
    });
}
