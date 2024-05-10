<template>
    <div>
        <h1 class="title">Kläder för dagen</h1>
    </div>

    <div class="carousel rounded-box">
        <div class="carousel-item">
            <div v-for="(outfit, index) in outfits.slice(0, 1)" :key="index" class="outfit-item">
                <h2>{{ outfit.time }}</h2>
                <h2>Barn:</h2>
                <ul>
                    <li v-for="child in children" :key="child.id">
                        {{ child.name }} ({{ child.age }} år)
                    </li>
                </ul>
                <div class="clothing">
                    <img v-for="(clothing, index) in outfit.clothes" :key="index" :src="clothing"
                        :alt="getAltText(clothing)">
                </div>
            </div>
        </div>
        <div class="carousel-item">
            <div v-for="(outfit, index) in outfits.slice(1, 2)" :key="index" class="outfit-item">
                <h2>{{ outfit.time }}</h2>
                <div class="clothing">
                    <img v-for="(clothing, index) in outfit.clothes" :key="index" :src="clothing"
                        :alt="getAltText(clothing)">
                </div>
            </div>
        </div>
        <div class="carousel-item">
            <div v-for="(outfit, index) in outfits.slice(2, 3)" :key="index" class="outfit-item">
                <h2>{{ outfit.time }}</h2>
                <div class="clothing">
                    <img v-for="(clothing, index) in outfit.clothes" :key="index" :src="clothing"
                        :alt="getAltText(clothing)">
                </div>
            </div>
        </div>
        <div class="carousel-item">
            <div v-for="(outfit, index) in outfits.slice(3, 4)" :key="index" class="outfit-item">
                <h2>{{ outfit.time }}</h2>
                <div class="clothing">
                    <img v-for="(clothing, index) in outfit.clothes" :key="index" :src="clothing"
                        :alt="getAltText(clothing)">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { filterWeatherDataByTime } from '@/scripts/filterWeatherDataByTime.js'
import { useUserStore } from '@/stores/userStore';

// Importera bilderna
import vinterjacka from '@/assets/Barnkläder/vinterjacka.png';
import mössa from '@/assets/Barnkläder/mössa.png';
import halsduk from '@/assets/Barnkläder/halsduk.png';
import vantehöger from '@/assets/Barnkläder/vante höger.png';
import vantevänster from '@/assets/Barnkläder/vante vänster.png';
import kängor from '@/assets/Barnkläder/kängor.png';
import vårjacka from '@/assets/Barnkläder/vårjacka.png';
import långbyxor from '@/assets/Barnkläder/långbyxor.png';
import sneakers from '@/assets/Barnkläder/sneakers.png';
import tshirt from '@/assets/Barnkläder/t-shirt.png';
import shorts from '@/assets/Barnkläder/shorts.png';
import sandaler from '@/assets/Barnkläder/sandaler.png';
import keps from '@/assets/Barnkläder/keps.png';
import solglasögon from '@/assets/Barnkläder/solglasögon.png';
import regnjacka from '@/assets/Barnkläder/Regnjacka.png';
import regnbyxor from '@/assets/Barnkläder/regnbyxor.png';
import stövlar from '@/assets/Barnkläder/stövlar.png';
import paraply from '@/assets/Barnkläder/paraply.png';
import vindjacka from '@/assets/Barnkläder/vindjacka.png';

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
                let clothes = [];
                const temperature = weatherObj.temperature;
                const windSpeed = weatherObj.windSpeed;
                const rain = weatherObj.averagePrecipitation;

                if (temperature <= 5) {
                    clothes.push(vinterjacka, mössa, halsduk, vantehöger, vantevänster, kängor);
                } else if (temperature <= 15) {
                    clothes.push(keps, vårjacka, långbyxor, sneakers);
                } else {
                    clothes.push(tshirt, shorts, sandaler, keps, solglasögon);
                }

                if (rain > 0 && rain < 1) {
                    clothes.push("Tänk på att det kan regna, så ta med paraply!")
                    //clothes.push(regnjacka, regnbyxor, stövlar, paraply);
                }
                if (rain > 1 && rain < 5) {
                    clothes.push("Du kanske borde överväga att ta på dig regnkläder!")
                    //clothes.push(regnjacka, regnbyxor, stövlar, paraply);
                }

                if (temperature > 0 && windSpeed >= 8) {
                    clothes.push(vindjacka, långbyxor);
                }

                return { time: weatherObj.date, clothes };
            });
        },
        getAltText(imagePath) {
            const filename = imagePath.split('/').pop();
            const altText = filename.split('.')[0];
            return altText;
        }
    }
};
</script>

<style>
/* Stilmall för karusell och klädoutfits */

.outfit-item {
    display: flex;
    flex-wrap: wrap;
}

.clothing-item {
    width: 100px;
    /* Bredden på klädplagget */
    height: auto;
    /* Låt höjden justeras automatiskt för att behålla proportionerna */
    margin: 2px;
    /* Justera marginaler för att separera klädesplagg */
}

/* Anpassa ordning och placering för olika klädesplagg */
.clothing img[src$='sneakers.png'],
.clothing img[src$='kängor.png'] {
    order: 1;
    height: 10%;
    /* Placera sneakers längst ner */
}

.clothing img[src$='långbyxor.png'],
.clothing img[src$='shorts.png'] {
    order: 2;
    height: 15%;
    /* Placera långbyxor över sneakers */
}

.clothing img[src$='vinterjacka.png'],
.clothing img[src$='vårjacka.png'],
.clothing img[src$='t-shirt.png'],
.clothing img[src$='paraply.png'] {
    order: 3;
    height: 25%;
    /* Placera jacka/tröja och paraply bredvid varandra */
}

.clothing img[src$='solglasögon.png'] {
    order: 4;
    /* Placera solglasögon över jacka/tröja */
}

.clothing img[src$='keps.png'],
.clothing img[src$='mössa.png'] {
    order: 5;
    /* Placera keps/mössa längst upp */
    height: 5%;
}
</style>
