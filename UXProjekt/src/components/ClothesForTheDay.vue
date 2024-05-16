<template>

    <div class="wrapper-carousel">
        <!-- <img class="logotype" src="@/assets/Ikonerstilarlogo/logotyp.png" alt="Logo"> -->
        <form @submit.prevent="generateOutfits">
            <label>Temperatur (°C):</label>
            <input type="number" v-model="temperature" min="-10" max="30" step="1">
            <label>Vindhastighet (m/s):</label>
            <input type="number" v-model="windSpeed" min="0" max="20" step="1">
            <label>Nederbörd (mm):</label>
            <input type="number" v-model="precipitation" min="0" max="10" step="0.1">
            <button type="submit">Generera klädkombinationer</button>
        </form>
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

                // Convert the weather symbol to a string
                const weatherSymbolString = weatherObj.weatherSymbol.toString().slice(0, 1);

                return { time: weatherObj.date, clothes, weatherSymbol: weatherSymbolString.slice(0, 1) };
            });
        },
        getOutfitBackground(weatherSymbol) {
            const gifUrl = decideGif(weatherSymbol);
            return {
                backgroundImage: `url(${gifUrl})`,
                // backgroundSize: 'cover',
                // backgroundPosition: 'center'
            };
        },
        getAltText(imagePath) {
            const filename = imagePath.split('/').pop();
            const altText = filename.split('.')[0];
            return altText;
        },
        togglePopup(outfit) {
            this.selectedOutfit = outfit;
            this.popupVisible = !this.popupVisible;
        },
        generateOutfits() {
            // Återställ outfits-arrayen innan nya klädkombinationer genereras
            this.outfits = [];

            // Skapa en klädkombination baserat på användarens inmatning
            let clothes = [];
            if (this.temperature <= 5 && this.precipitation > 1 && this.precipitation < 50) {
                clothes.push(mössa, halsduk, vinterjacka, vantehöger, vantevänster, kängor, paraply);
            } else if (this.temperature <= 5) {
                clothes.push(mössa, halsduk, vinterjacka, vantehöger, vantevänster, kängor);
            } else if (this.temperature <= 15 && this.windSpeed <= 8) {
                clothes.push(keps, vårjacka, långbyxor, sneakers);
            } else if (this.temperature > 15 && this.windSpeed >= 8 && this.precipitation >= 0) {
                clothes.push(vindjacka, långbyxor, sneakers);
            } else {
                clothes.push(keps, solglasögon, tshirt, shorts, sandaler);
            }

            if (this.precipitation > 0 && this.precipitation < 20 && !clothes.includes(paraply)) {
                clothes.push(paraply);
            } else if (this.precipitation >= 20 && !clothes.includes(regnjacka)) {
                clothes.push(regnjacka, regnbyxor, stövlar, paraply);
            }

            // Skapa ett objekt som representerar klädkombinationen och lägg till det i outfits-arrayen
            const outfit = {
                time: new Date(), // Använda tiden för genereringen av klädkombinationen
                clothes: clothes,
                weatherSymbol: 'custom' // Använd en symbol som representerar manuellt inställt väder
            };
            this.outfits.push(outfit);
        }

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
    /* Adjust margin for mobile */
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
    /* Adjust margin for mobile */
}

.popup-overlay {
    background-color: #F2A42D;
    position: absolute;
    bottom: 0;
    /* Placera längst ner */
    left: 25%;
    /* Justera till vänster */
    width: 50%;
    /* Bredden ska täcka hela karusellen */
    align-items: center;
}

.wrapper-carousel {
    align-content: center;
    justify-content: center;
    height: fit-content;
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
        /* Placera längst ner */
        left: 25%;
        /* Justera till vänster */
        width: 50%;
        /* Bredden ska täcka hela karusellen */
        align-items: center;
    }

    .weather-gif {
        position: relative;
        width: 50cqmax;
        height: 30%;
        justify-content: center;
        margin-left: 75%;
        /* Adjust margin for mobile */
    }

    .carousel-item {
        position: relative;
        justify-content: flex-start;
        margin-right: 25cqmax;
        /* Adjust margin for mobile */
    }

    /* .carousel {
        position: relative;
        display: flex;
        justify-content: left;
        margin-bottom: 20px;
    } */

    /* .outfit-item {
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
    } */

    /* .clothing {
        min-width: auto;
        height: auto;
        justify-content: center;
    } */


}
</style>
