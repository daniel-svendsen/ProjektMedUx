<template>
    <div>
        <h1 class="title">Kläder för dagen</h1>
    </div>

    <div class="carousel rounded-box">
        <div class="carousel-item">
            <div v-for="(outfit, index) in outfits.slice(0, 1)" :key="index" class="outfit-item">
                <!-- Visa kläder för respektive tidpunkt -->
                <h2>{{ outfit.time }}</h2>
                <h2>Barn:</h2>
                <ul>
                    <li v-for="child in children" :key="child.id">
                        {{ child.name }} ({{ child.age }} år)
                    </li>
                </ul>
                <p>Kläder: {{ outfit.clothes }}</p>
            </div>
        </div>
        <div class="carousel-item">
            <div v-for="(outfit, index) in outfits.slice(1, 2)" :key="index" class="outfit-item">
                <!-- Visa kläder för respektive tidpunkt -->
                <h2>{{ outfit.time }}</h2>
                <p>Kläder: {{ outfit.clothes }}</p>
            </div>
        </div>
        <div class="carousel-item">
            <div v-for="(outfit, index) in outfits.slice(2, 3)" :key="index" class="outfit-item">
                <!-- Visa kläder för respektive tidpunkt -->
                <h2>{{ outfit.time }}</h2>
                <p>Kläder: {{ outfit.clothes }}</p>
            </div>
        </div>
        <div class="carousel-item">
            <div v-for="(outfit, index) in outfits.slice(3, 4)" :key="index" class="outfit-item">
                <!-- Visa kläder för respektive tidpunkt -->
                <h2>{{ outfit.time }}</h2>
                <p>Kläder: {{ outfit.clothes }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import { filterWeatherDataByTime } from '@/scripts/filterWeatherDataByTime.js'
import { useUserStore } from '@/stores/userStore';

export default {
    data() {
        return {
            loading: true,
            outfits: []
        };
    },
    computed: {
        children() {
            const store = useUserStore();
            return store.userChildren;
        }
    },
    async created() {
        try {
            const weatherObjects = await filterWeatherDataByTime();
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