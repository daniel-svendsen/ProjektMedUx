<template>
  <div>
    <div v-if="loading">Laddar...</div>
    <div v-else class="weather-container">
      <div v-for="(weatherObj, index) in weatherObjects" :key="index" class="weather-entry">

    <header id="informationBarContainer">
        <div class="informationBarDiv">
            <h2 id="weather">
                Väder
            </h2>
        </div>
        <div class="informationBarDiv">
            <h2 id="location">
                {{latitude}}
                {{longitude}}
            </h2>
        </div>
        <div class="informationBarDiv">
            <h2 id="degrees">
                15°C
            </h2>
        </div>
    </header>

    <main id="weatherDisplayContainer">
        <div class="weatherDisplayDiv">

            <p class="weathertext">
                Dygn
            </p>
            <p class="weathertext">
                L
            </p>
            <p class="weathertext">
                H
            </p>
            <p class="weathertext">
                Natt
            </p>
            <p class="weathertext">
                Dag
            </p>
            <p class="weathertext">
                Ndb
            </p>
        </div>
        <div class="weatherinformation">
            <div class="weatherinformationDiv"><p class="weatherinformationtext">{{ formatDate(weatherObj.date) }}</p></div>
            <div class="weatherinformationDiv"><p class="weatherinformationtext">{{ weatherObj.lowestTemperature }} °C</p></div>
            <div class="weatherinformationDiv"><p class="weatherinformationtext"> {{ weatherObj.highestTemperature }} °C</p></div>
            <div class="weatherinformationDiv"><img src="https://www.smhi.se/polopoly_fs/1.27958.1518507527!/image/3.png_gen/derivatives/Original_259px/image/3.png" alt="" class="weatherimg"></div>
            <div class="weatherinformationDiv"><img src="https://www.smhi.se/polopoly_fs/1.27958.1518507527!/image/3.png_gen/derivatives/Original_259px/image/3.png" alt="" class="weatherimg"></div>
            <div class="weatherinformationDiv"><p class="weatherinformationtext">{{ weatherObj.averagePrecipitation }} mm</p></div>
        </div>
        <div class="weatherinformation">
            <div class="weatherinformationDiv"><p class="weatherinformationtext">{{ formatDate(weatherObj.date) }}</p></div>
            <div class="weatherinformationDiv"><p class="weatherinformationtext">{{ weatherObj.lowestTemperature }} °C</p></div>
            <div class="weatherinformationDiv"><p class="weatherinformationtext"> {{ weatherObj.highestTemperature }} °C</p></div>
            <div class="weatherinformationDiv"><img src="https://www.smhi.se/polopoly_fs/1.27958.1518507527!/image/3.png_gen/derivatives/Original_259px/image/3.png" alt="" class="weatherimg"></div>
            <div class="weatherinformationDiv"><img src="https://www.smhi.se/polopoly_fs/1.27958.1518507527!/image/3.png_gen/derivatives/Original_259px/image/3.png" alt="" class="weatherimg"></div>
            <div class="weatherinformationDiv"><p class="weatherinformationtext">{{ weatherObj.averagePrecipitation }} mm</p></div>
        </div>
        <div class="weatherinformation">
            <div class="weatherinformationDiv"><p class="weatherinformationtext">{{ formatDate(weatherObj.date) }}</p></div>
            <div class="weatherinformationDiv"><p class="weatherinformationtext">{{ weatherObj.lowestTemperature }} °C</p></div>
            <div class="weatherinformationDiv"><p class="weatherinformationtext"> {{ weatherObj.highestTemperature }} °C</p></div>
            <div class="weatherinformationDiv"><img src="https://www.smhi.se/polopoly_fs/1.27958.1518507527!/image/3.png_gen/derivatives/Original_259px/image/3.png" alt="" class="weatherimg"></div>
            <div class="weatherinformationDiv"><img src="https://www.smhi.se/polopoly_fs/1.27958.1518507527!/image/3.png_gen/derivatives/Original_259px/image/3.png" alt="" class="weatherimg"></div>
            <div class="weatherinformationDiv"><p class="weatherinformationtext">{{ weatherObj.averagePrecipitation }} mm</p></div>
        </div>
        <div class="weatherinformation">
            <div class="weatherinformationDiv"><p class="weatherinformationtext">{{ formatDate(weatherObj.date) }}</p></div>
            <div class="weatherinformationDiv"><p class="weatherinformationtext">{{ weatherObj.lowestTemperature }} °C</p></div>
            <div class="weatherinformationDiv"><p class="weatherinformationtext"> {{ weatherObj.highestTemperature }} °C</p></div>
            <div class="weatherinformationDiv"><img src="https://www.smhi.se/polopoly_fs/1.27958.1518507527!/image/3.png_gen/derivatives/Original_259px/image/3.png" alt="" class="weatherimg"></div>
            <div class="weatherinformationDiv"><img src="https://www.smhi.se/polopoly_fs/1.27958.1518507527!/image/3.png_gen/derivatives/Original_259px/image/3.png" alt="" class="weatherimg"></div>
            <div class="weatherinformationDiv"><p class="weatherinformationtext">{{ weatherObj.averagePrecipitation }} mm</p></div>

        </div>
        <div class="weatherinformation">
            <div class="weatherinformationDiv"><p class="weatherinformationtext">{{ formatDate(weatherObj.date) }}</p></div>
            <div class="weatherinformationDiv"><p class="weatherinformationtext">{{ weatherObj.lowestTemperature }} °C</p></div>
            <div class="weatherinformationDiv"><p class="weatherinformationtext"> {{ weatherObj.highestTemperature }} °C</p></div>
            <div class="weatherinformationDiv"><img src="https://www.smhi.se/polopoly_fs/1.27958.1518507527!/image/3.png_gen/derivatives/Original_259px/image/3.png" alt="" class="weatherimg"></div>
            <div class="weatherinformationDiv"><img src="https://www.smhi.se/polopoly_fs/1.27958.1518507527!/image/3.png_gen/derivatives/Original_259px/image/3.png" alt="" class="weatherimg"></div>
            <div class="weatherinformationDiv"><p class="weatherinformationtext">{{ weatherObj.averagePrecipitation }} mm</p></div>

        </div>
        <div class="weatherinformation">
            <div class="weatherinformationDiv"><p class="weatherinformationtext">{{ formatDate(weatherObj.date) }}</p></div>
            <div class="weatherinformationDiv"><p class="weatherinformationtext">{{ weatherObj.lowestTemperature }} °C</p></div>
            <div class="weatherinformationDiv"><p class="weatherinformationtext"> {{ weatherObj.highestTemperature }} °C</p></div>
            <div class="weatherinformationDiv"><img src="https://www.smhi.se/polopoly_fs/1.27958.1518507527!/image/3.png_gen/derivatives/Original_259px/image/3.png" alt="" class="weatherimg"></div>
            <div class="weatherinformationDiv"><img src="https://www.smhi.se/polopoly_fs/1.27958.1518507527!/image/3.png_gen/derivatives/Original_259px/image/3.png" alt="" class="weatherimg"></div>
            <div class="weatherinformationDiv"><p class="weatherinformationtext">{{ weatherObj.averagePrecipitation }} mm</p></div>

        </div>
        <div class="weatherinformation">
            <div class="weatherinformationDiv"><p class="weatherinformationtext">{{ formatDate(weatherObj.date) }}</p></div>
            <div class="weatherinformationDiv"><p class="weatherinformationtext">{{ weatherObj.lowestTemperature }} °C</p></div>
            <div class="weatherinformationDiv"><p class="weatherinformationtext"> {{ weatherObj.highestTemperature }} °C</p></div>
            <div class="weatherinformationDiv"><img src="https://www.smhi.se/polopoly_fs/1.27958.1518507527!/image/3.png_gen/derivatives/Original_259px/image/3.png" alt="" class="weatherimg"></div>
            <div class="weatherinformationDiv"><img src="https://www.smhi.se/polopoly_fs/1.27958.1518507527!/image/3.png_gen/derivatives/Original_259px/image/3.png" alt="" class="weatherimg"></div>
            <div class="weatherinformationDiv"><p class="weatherinformationtext">{{ weatherObj.averagePrecipitation }} mm</p></div>

        </div>
        <div class="weatherinformation">
            <div class="weatherinformationDiv"><p class="weatherinformationtext">{{ formatDate(weatherObj.date) }}</p></div>
            <div class="weatherinformationDiv"><p class="weatherinformationtext">{{ weatherObj.lowestTemperature }} °C</p></div>
            <div class="weatherinformationDiv"><p class="weatherinformationtext"> {{ weatherObj.highestTemperature }} °C</p></div>
            <div class="weatherinformationDiv"><img src="https://www.smhi.se/polopoly_fs/1.27958.1518507527!/image/3.png_gen/derivatives/Original_259px/image/3.png" alt="" class="weatherimg"></div>
            <div class="weatherinformationDiv"><img src="https://www.smhi.se/polopoly_fs/1.27958.1518507527!/image/3.png_gen/derivatives/Original_259px/image/3.png" alt="" class="weatherimg"></div>
            <div class="weatherinformationDiv"><p class="weatherinformationtext">{{ weatherObj.averagePrecipitation }} mm</p></div>

        </div>
        <div class="weatherinformation">
            <div class="weatherinformationDiv"><p class="weatherinformationtext">{{ formatDate(weatherObj.date) }}</p></div>
            <div class="weatherinformationDiv"><p class="weatherinformationtext">{{ weatherObj.lowestTemperature }} °C</p></div>
            <div class="weatherinformationDiv"><p class="weatherinformationtext"> {{ weatherObj.highestTemperature }} °C</p></div>
            <div class="weatherinformationDiv"><img src="https://www.smhi.se/polopoly_fs/1.27958.1518507527!/image/3.png_gen/derivatives/Original_259px/image/3.png" alt="" class="weatherimg"></div>
            <div class="weatherinformationDiv"><img src="https://www.smhi.se/polopoly_fs/1.27958.1518507527!/image/3.png_gen/derivatives/Original_259px/image/3.png" alt="" class="weatherimg"></div>
            <div class="weatherinformationDiv"><p class="weatherinformationtext">{{ weatherObj.averagePrecipitation }} mm</p></div>
        </div>
        <div class="weatherinformation">
            <div class="weatherinformationDiv"><p class="weatherinformationtext">{{ formatDate(weatherObj.date) }}</p></div>
            <div class="weatherinformationDiv"><p class="weatherinformationtext">{{ weatherObj.lowestTemperature }} °C</p></div>
            <div class="weatherinformationDiv"><p class="weatherinformationtext"> {{ weatherObj.highestTemperature }} °C</p></div>
            <div class="weatherinformationDiv"><img src="https://www.smhi.se/polopoly_fs/1.27958.1518507527!/image/3.png_gen/derivatives/Original_259px/image/3.png" alt="" class="weatherimg"></div>
            <div class="weatherinformationDiv"><img src="https://www.smhi.se/polopoly_fs/1.27958.1518507527!/image/3.png_gen/derivatives/Original_259px/image/3.png" alt="" class="weatherimg"></div>
            <div class="weatherinformationDiv"><p class="weatherinformationtext">{{ weatherObj.averagePrecipitation }} mm</p></div>
        </div>
    </main>

    <footer id="navigationBarContainer">

    </footer>


      </div>
    </div>
  </div>
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
      longitude: null
    };
  },
  async mounted() {
    try {
      const { latitude, longitude } = await useGeolocation();
      this.latitude = latitude;
      this.longitude = longitude;

      // Fetch weather data using the obtained latitude and longitude
      this.weatherObjects = await getWeatherObjectsList(latitude, longitude);
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
    height: 50rem;
    /* 800px / 16 */
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
}

#informationBarContainer {
    padding: 0;
    margin: 0;
    width: 100%;
    height: 3.75rem;
    background: var(--Bl---Primr, #425890);
    display: flex;
    justify-content: space-around;
    align-items: center;
}


.informationBarDiv {
    height: 20px;
    width: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
}

#weather {
    font-family: Montserrat;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-right: 40px;
}

#location {
    font-family: Montserrat;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}

#degrees {
    font-family: Montserrat;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-left: 40px;
}


#weatherDisplayContainer {
    padding: 0;
    margin: 0;
    width: 100%;
    height: 41.125rem;
    background-color: darkblue;
    display: flex;
    flex-direction: column;
}

.weatherDisplayDiv {
    background-color: white;
    height: 60px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
}

.weathertext {
    color: var(--Svart, #333);
    font-family: Inter;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}

.weatherinformation {
    background-color: white;
    width: 100%;
    height: 59.8px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
}

.weatherinformationDiv {
    width: 40px;
}

.weatherinformationtext {
    color: var(--Svart, #333);
    font-family: Inter;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}

.weatherimg {
    height: 24px;
    width: 24px;
}

#navigationBarContainer {
    padding: 0;
    margin: 0;
    width: 100%;
    height: 5.125rem;
    /* 20px / 16 */
    background-color: olive;
}


@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
