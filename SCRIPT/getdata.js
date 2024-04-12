// script.js

Vue.createApp({
    data() {
        return {
            apiData: null,
            category: 'pmp3g',
            version: '2',
            longitude: null,
            latitude: null
        }
    },
    methods: {
        async fetchApiData() {
            try {
                const url = `https://opendata-download-metfcst.smhi.se/api/category/${this.category}/version/${this.version}/geotype/point/lon/${this.longitude}/lat/${this.latitude}/data.json`;
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                this.apiData = JSON.stringify(data, null, 2);
            } catch (error) {
                console.error('There was a problem with your fetch operation:', error);
            }
        },
        getUserPosition() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {
                    this.latitude = position.coords.latitude;
                    this.longitude = position.coords.longitude;
                    this.fetchApiData(); // Fetch data after getting location
                }, error => {
                    console.error('Error getting user location:', error);
                });
            } else {
                console.error('Geolocation is not supported by this browser.');
            }
        }
    },
    mounted() {
        this.getUserPosition();
    }
}).mount("#app");