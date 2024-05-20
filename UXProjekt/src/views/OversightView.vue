<template>

    <body id="meo">
        <div>
            <div v-if="loading">Laddar...</div>
            <div v-else class="weather-container">
                <div class="weather-entry">
                    <header id="informationBarContainer">
                        <div class="informationBarDiv">
                            <h2 id="weather">Väder</h2>
                        </div>
                        <div class="informationBarDiv">
                            <h2 id="location">{{ latitude }} {{ longitude }}</h2>
                        </div>
                        <div class="informationBarDiv">
                            <h2 id="degrees">{{ degrees }}</h2>
                        </div>
                    </header>

                    <main id="weatherDisplayContainer">
                        <div class="weatherDisplayDiv">
                            <p class="weathertext">Dygn</p>
                            <p class="weathertext">L</p>
                            <p class="weathertext">H</p>
                            <p class="weathertext">Natt</p>
                            <p class="weathertext">Dag</p>
                            <p class="weathertext">Ndb</p>
                        </div>

                        <div v-for="(weatherObj, index) in weatherObjects" :key="index"
                            :class="'weatherinformation' + (index + 1)" class="weatherinformation">
                            <div class="weatherinformationDiv">
                                <p class="weatherinformationtext">{{ formatDate(weatherObj.date) }}</p>
                            </div>
                            <div class="weatherinformationDiv" id="lowestTemperatureDiv">
                                <p class="weatherinformationtext">{{ weatherObj.lowestTemperature }} °C</p>
                            </div>
                            <div class="weatherinformationDiv" id="highestTemperatureDiv">
                                <p class="weatherinformationtext">{{ weatherObj.highestTemperature }} °C</p>
                            </div>
                            <div class="weatherinformationDiv">
                                <img :src="weatherObj.weatherSymbol" alt="" class="weatherimg">
                            </div>
                            <div class="weatherinformationDiv">
                                <img :src="weatherObj.weatherSymbol" alt="" class="weatherimg">
                            </div>
                            <div class="weatherinformationDiv" id="averagePrecipitationDiv">
                                <p class="weatherinformationtext">{{ weatherObj.averagePrecipitation }} mm</p>
                            </div>
                        </div>
                    </main>

                    <footer id="navigationBarContainer"></footer>
                </div>
            </div>
        </div>
    </body>

</template>

<script>
import { getWeatherObjectsList } from '../scripts/getAll.js';
import { useGeolocation } from "../scripts/getPosition.js";

export default {
    data() {
        return {
            weatherObjects: [],
            loading: true,
            latitude: null,
            longitude: null,
            degrees: '15°C' // Initial value
        };
    },
    async mounted() {
        try {
            const { latitude, longitude } = await useGeolocation();
            this.latitude = latitude;
            this.longitude = longitude;

            // Fetch weather data using the obtained latitude and longitude
            this.weatherObjects = await getWeatherObjectsList(latitude, longitude);

            // Set the current temperature (first entry in weatherObjects)
            if (this.weatherObjects.length > 0) {
                this.degrees = `${this.weatherObjects[0].lowestTemperature}°C`;
            }

            this.loading = false;
        } catch (error) {
            console.error('Error fetching weather data:', error);

            this.loading = false;
        }
    },
    methods: {
        formatDate(dateString) {
            const date = new Date(dateString);
            // Format the date to display only the day of the week
            const options = { weekday: 'short', month: 'short', day: 'numeric' };
            return date.toLocaleDateString('en-US', options);
        }
    }
};
</script>

<style scoped>
#meo {
    padding: 0;
    margin: 0;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
}

#informationBarContainer {
    padding: 0;
    margin: 0;
    width: 100%;
    height: 3.75rem;
    /* 60px / 16 */
    background: var(--Bl---Primr, #425890);
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.informationBarDiv {
    height: 1.25rem;
    /* 20px / 16 */
    width: 3.75rem;
    /* 60px / 16 */
    display: flex;
    align-items: center;
    justify-content: center;
}

#weather {
    font-family: Montserrat;
    font-size: 1.25rem;
    /* 20px / 16 */
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-right: 2.5rem;
    /* 40px / 16 */
}

#location {
    font-family: Montserrat;
    font-size: 1.25rem;
    /* 20px / 16 */
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}

#degrees {
    font-family: Montserrat;
    font-size: 1.25rem;
    /* 20px / 16 */
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-left: 2.5rem;
    /* 40px / 16 */
}

#weatherDisplayContainer {
    padding: 0;
    margin: 0;
    width: 100%;
    height: 41.125rem;
    /* 658px / 16 */
    background-color: darkblue;
    display: flex;
    flex-direction: column;
}

.weatherDisplayDiv {
    background-color: white;
    height: 3.75rem;
    /* 60px / 16 */
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
}

.weathertext {
    color: var(--Svart, #333);
    font-family: Inter;
    font-size: 1rem;
    /* 16px / 16 */
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}

.weatherinformation {
    background-color: white;
    width: 100%;
    height: 3.7375rem;
    /* 59.8px / 16 */
    display: flex;
    align-items: center;
    justify-content: space-evenly;
}

.weatherinformationDiv {
    width: 2.5rem;
    /* 40px / 16 */
}

.weatherinformationtext {
    color: var(--Svart, #333);
    font-family: Inter;
    font-size: 0.8rem;
    /* 16px / 16 */
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}

.weatherimg {
    height: 1.5rem;
    /* 24px / 16 */
    width: 1.5rem;
    /* 24px / 16 */
}

#navigationBarContainer {
    padding: 0;
    margin: 0;
    width: 100%;
    height: 5.125rem;
    /* 82px / 16 */
    background-color: olive;
}
</style>