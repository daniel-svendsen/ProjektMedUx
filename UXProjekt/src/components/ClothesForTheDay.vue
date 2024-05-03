<!-- ClothesForTheDay.vue -->
<template>
    <div>
        <h1 class="title">Kläder för dagen</h1>
        <div v-if="loading">Laddar...</div>
        <div v-else>
            <div class="carousel">
                <div v-for="(outfit, index) in outfits" :key="index" class="outfit-item">
                    <!-- Visa kläder för respektive tidpunkt -->
                    <h2>{{ outfit.time }}</h2>
                    <p>Kläder: {{ outfit.clothes }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { fetchWeatherData } from '../scripts/filterWeatherDataByTime'; // Importera fetchWeatherData-metoden från DataBySpecificTime.vue

export default {
    data() {
        return {
            loading: true,
            outfits: []
        };
    },
    async created() {
        try {
            // Anropa fetchWeatherData-metoden för att hämta väderdata för specifika tidpunkter
            const { specificWeatherData } = await fetchWeatherData();

            // Skapa klädoutfits för olika tidpunkter baserat på väderdatan
            const outfits08 = this.createOutfit("08:00", specificWeatherData[0]); // Klädoutfit för 08:00
            const outfits12 = this.createOutfit("12:00", specificWeatherData[1]); // Klädoutfit för 12:00
            const outfits16 = this.createOutfit("16:00", specificWeatherData[2]); // Klädoutfit för 16:00
            const outfits20 = this.createOutfit("20:00", specificWeatherData[3]); // Klädoutfit för 20:00

            // Lägg till outfits i arrayen outfits
            this.outfits.push(outfits08, outfits12, outfits16, outfits20);
            this.loading = false;
        } catch (error) {
            console.error('Error fetching weather data:', error);
            this.loading = false;
        }
    },
    methods: {
        createOutfit(time, weatherData) {
            let clothes = "";
            const temperature = weatherData.temperature;
            const windSpeed = weatherData.windSpeed;

            if (temperature >= 18 && temperature <= 25) {
                clothes = "T-shirt";
            } else if (temperature > 25) {
                clothes = "Shorts och T-shirt";
            } else if (temperature < 18) {
                clothes = "Tröja";
            }

            if (windSpeed > 10) {
                clothes += " och Jacka";
            }

            return { time, clothes };
        }
    }
};
</script>

<style>
/* Stilmall för karusell och klädoutfits */
</style>