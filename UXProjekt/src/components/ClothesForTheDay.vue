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
import { getWeatherObjectsList } from '@/scripts/getAll.js'; // Importera den nya getAll.js-filen

export const ClothesForTheDay = {
    data() {
        return {
            loading: true,
            outfits: []
        };
    },
    async created() {
        try {
            const weatherObjects = await getWeatherObjectsList(); // Anropa getWeatherObjectsList för att hämta väderobjekten

            // Skapa klädoutfits för olika tidpunkter baserat på väderobjekten
            this.outfits = this.createOutfits(weatherObjects);

            this.loading = false;
        } catch (error) {
            console.error('Error fetching and transforming weather data:', error);
            this.loading = false;
        }
    },
    methods: {
        createOutfits(weatherObjects) {
            return weatherObjects.map(weatherObj => {
                let clothes = "";
                const temperature = weatherObj.temperature;
                const windSpeed = weatherObj.windSpeed;

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

                return { time: weatherObj.date, clothes };
            });
        }
    }
};
</script>

<style>
/* Stilmall för karusell och klädoutfits */
</style>