<template>
    <!-- Carousel from DaisyUI, goes through 4 objects in outfits and makes 4 carousel elements. Popup for each element -->
    <div class="wrapper-carousel">
        <div class="carousel rounded-box">
            <div v-for="(outfit, index) in outfits.slice(0, 4)" :key="index" class="carousel-item"
                :style="getOutfitBackground(outfit.weatherSymbol.slice(0, 1))" @click="togglePopup(outfit)">
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
import { useUserStore } from '@/stores/userStore';
import { decideGif } from '@/scripts/decideGif.js';

// Importera bilderna
import vinterjacka from '@/assets/Barnkläder/vinterjacka.png';
import mössa from '@/assets/Barnkläder/mössa.png';
import halsduk from '@/assets/Barnkläder/halsduk.png';
import vantehöger from '@/assets/Barnkläder/vante höger.png';
import vantevänster from '@/assets/Barnkläder/vante vänster.png';
import kängor from '@/assets/Barnkläder/Kängor.png';
import vårjacka from '@/assets/Barnkläder/Vårjacka.png';
import långbyxor from '@/assets/Barnkläder/Långbyxor.png';
import sneakers from '@/assets/Barnkläder/Sneakers.png';
import tshirt from '@/assets/Barnkläder/T-shirt.png';
import shorts from '@/assets/Barnkläder/Shorts.png';
import sandaler from '@/assets/Barnkläder/Sandaler.png';
import keps from '@/assets/Barnkläder/Keps.png';
import solglasögon from '@/assets/Barnkläder/Solglasögon.png';
import regnjacka from '@/assets/Barnkläder/Regnjacka.png';
import regnbyxor from '@/assets/Barnkläder/Regnbyxor.png';
import stövlar from '@/assets/Barnkläder/Stövlar.png';
import paraply from '@/assets/Barnkläder/Paraply.png';
import vindjacka from '@/assets/Barnkläder/Vindjacka.png';

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
        nextOutfit() {
            if (this.currentOutfitIndex < this.outfits.length - 1) {
                this.currentOutfitIndex++;
            }
        },
        prevOutfit() {
            if (this.currentOutfitIndex > 0) {
                this.currentOutfitIndex--;
            }
        },
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
    margin-right: 70%;
}

.carousel {
    position: relative;
    display: flex;
    justify-content: left;
    margin-bottom: 20px;
}

.outfit-item {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
}

.clothing img {
    min-width: auto;
    height: 110px;
}

.weather-gif {
    position: relative;
    width: 40%;
    height: 30%;
    justify-content: center;
    margin-left: 190px;
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
    align-content: center;
    justify-content: center;
    align-items: center;
    display: flex;

}

.logotype {
    margin-left: auto;
    z-index: -1;
}

/* Media queries for mobile responsiveness */
@media only screen and (max-width: 768px) {

    .wrapper-carousel {
        align-content: center;
        justify-content: center;
        bottom: 0;
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
        width: 50cqmax;
        height: 30%;
        justify-content: center;
        margin-left: 75%;
    }

    .carousel-item {
        position: relative;
        justify-content: flex-start;
        margin-right: 25cqmax;
    }
}
</style>
