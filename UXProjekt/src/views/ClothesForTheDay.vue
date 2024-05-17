<template>

    <img class="logotype" src="@/assets/Ikonerstilarlogo/logotyp.png" alt="">

    <!-- Carousel from DaisyUI, goes through 4 objects in outfits and makes 4 carousel elements. Popup with clothestexts for each element -->
    <div class="wrapper-carousel">

        <div class="carousel rounded-box">
            <div v-for="(outfit, index) in outfits.slice(0, 4)" :key="index" class="carousel-item"
                @click="togglePopup(outfit)">
                <div class="weather-gif">
                    <div class="outfit-item">
                        <h2>{{ outfit.time }}</h2>
                        <div class="clothing">
                            <br>
                            <img v-for="(clothing, index) in outfit.clothes" :key="index" :src="clothing"
                                :alt="getAltText(clothing)">
                        </div>
                    </div>
                </div>
                <div v-if="popupVisible" class="popup-overlay">
                    <div class="popup-content">
                        <h3>Rekommenderade kläder</h3>
                        <ul>
                            <li v-for="(clothing, index) in selectedOutfit.clothes" :key="index">{{ getAltText(clothing)
                                }}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>


<script>
import { filterWeatherDataByTime } from '@/scripts/filterWeatherDataByTime.js';
import { decideGif } from '@/scripts/decideGif.js';

// Importera bilderna
import vinterjacka from '@/assets/Barnkläder/vinterjacka.png';
import mössa from '@/assets/Barnkläder/mossa.png';
import halsduk from '@/assets/Barnkläder/halsduk.png';
import vantehöger from '@/assets/Barnkläder/vante-hoger.png';
import vantevänster from '@/assets/Barnkläder/vante-vanster.png';
import kängor from '@/assets/Barnkläder/kangor.png';
import vårjacka from '@/assets/Barnkläder/varjacka.png';
import långbyxor from '@/assets/Barnkläder/langbyxor.png';
import sneakers from '@/assets/Barnkläder/sneakers.png';
import tshirt from '@/assets/Barnkläder/t-shirt.png';
import shorts from '@/assets/Barnkläder/shorts.png';
import sandaler from '@/assets/Barnkläder/sandaler.png';
import keps from '@/assets/Barnkläder/keps.png';
import solglasögon from '@/assets/Barnkläder/solglasogon.png';
import regnjacka from '@/assets/Barnkläder/regnjacka.png';
import regnbyxor from '@/assets/Barnkläder/regnbyxor.png';
import stövlar from '@/assets/Barnkläder/stovlar.png';
import paraply from '@/assets/Barnkläder/paraply.png';
import vindjacka from '@/assets/Barnkläder/vindjacka.png';

export default {
    data() {
        return {
            loading: true,
            outfits: [],
            popupVisible: false,
            selectedOutfit: null
        };
    },
    computed: {
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
        // Creates outfits based on the weatherobjects and the clothing logic
        createOutfits(weatherObjects) {
            return weatherObjects.map(weatherObj => {
                let clothes = [];
                const temperature = weatherObj.temperature;
                const windSpeed = weatherObj.windSpeed;
                const rain = weatherObj.averagePrecipitation;

                if (temperature <= 5 && rain > 1 && rain < 50) {
                    clothes.push(mössa, halsduk, vinterjacka, vantehöger, vantevänster, kängor, paraply);
                } else if (this.temperature <= 5) {
                    clothes.push(mössa, halsduk, vinterjacka, vantehöger, vantevänster, kängor);
                } else if (this.temperature <= 15 && windSpeed <= 8) {
                    clothes.push(keps, vårjacka, långbyxor, sneakers);
                } else if (this.temperature > 15 && windSpeed >= 8 && this.precipitation >= 0) {
                    clothes.push(vindjacka, långbyxor, sneakers);
                } else {
                    clothes.push(keps, solglasögon, tshirt, shorts, sandaler);
                }

                if (this.precipitation > 0 && this.precipitation < 20 && !clothes.includes(paraply)) {
                    clothes.push(paraply);
                } else if (this.precipitation >= 20 && !clothes.includes(regnjacka)) {
                    clothes.push(regnjacka, regnbyxor, stövlar, paraply);
                }

                // Convert the weather symbol to a string to try to slice - problem with getting alot of gifs
                const weatherSymbolString = weatherObj.weatherSymbol.toString().slice(0, 1);

                return { time: weatherObj.date, clothes, weatherSymbol: weatherSymbolString };
            });
        },
        getOutfitBackground(weatherSymbol) {
            const gifUrl = decideGif(weatherSymbol);
            return {
                backgroundImage: `url(${gifUrl})`,
                //Uncomment this to get a gif covering the element
                // backgroundSize: 'cover',
                // backgroundPosition: 'center'
            };
        },
        // For the pop-up to get text from files
        getAltText(imagePath) {
            const filename = imagePath.split('/').pop();
            const altText = filename.split('.')[0];
            return altText;
        },
        togglePopup(outfit) {
            this.selectedOutfit = outfit;
            this.popupVisible = !this.popupVisible;
        },
    }
};
</script>

<style>
/* Base styles */
.carousel-item {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 75vw;
    width: 50vw;
    height: 75vh;
    z-index: 2;
}

.clothing img {
    width: 5vw;
    height: 10vh;
    margin-left: 11vw;
    margin-top: 0vh;
}

.clothing {
    margin-top: 8vh;
}

.weather-gif {
    position: relative;
}

.popup-overlay {
    background-color: #F2A42D;
    position: absolute;
    bottom: 0;
    left: 25%;
    width: 50%;
    align-items: center;
}

.wrapper-carousel {
    position: relative;
    align-content: center;
    justify-content: center;
    align-items: center;
    display: flex;
    margin-top: 12vh;
    margin-bottom: 12vh;
    z-index: 1;
}

.logotype {
    position: absolute;
    margin-left: auto;
    z-index: -1;
    width: 45vw;
    margin-top: 30vh;
    right: 0;
}

/* Media queries for mobile responsiveness */
@media only screen and (max-width: 768px) {

    .wrapper-carousel {
        align-content: center;
        justify-content: center;
        align-items: center;
        display: flex;
        margin-top: 14vh;
        margin-bottom: 12vh;
    }

    .popup-overlay {
        background-color: #F2A42D;
        position: absolute;
        bottom: 0;
        left: 25%;
        width: 50%;
        align-items: center;
    }

    .weather-gif {
        position: relative;
        width: 100vw;
        height: 75vh;
    }

    .carousel-item {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-right: 75vw;
        width: 100vw;
    }

    .clothing img {
        width: 17vw;
        height: 10vh;
        margin-left: 43vw;
    }

    .clothing {
        margin-top: 3vh;
    }

    .logotype {
        right: 50%;
        /* Position relative to the center */
        transform: translateX(50%);
        /* Center the logotype */
        left: 50%;
        width: 100vw;
        height: 15vh;
        /* Ensure it's centered from both sides */
    }
}
</style>
