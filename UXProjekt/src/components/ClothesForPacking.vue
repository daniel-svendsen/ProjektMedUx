<!-- ClothesForPacking.vue -->
<template>
    <div class="packing">
        <!-- Inkludera sökfältet här -->
        <SearchLocation @locationSelected="handleLocationSelected" />

        <!-- Visa packningslistan här -->
        <div v-if="outfits.length">
            <h2>Packningslista</h2>
            <ul>
                <li v-for="(outfit, index) in outfits" :key="index">
                    <p>{{ outfit.time }}</p>
                    <ul>
                        <li v-for="(item, idx) in outfit.clothes" :key="idx">{{ item }}</li>
                    </ul>
                </li>
            </ul>
        </div>

        <!-- Visa eventuell felmeddelande här -->
        <div v-if="error">{{ error }}</div>
    </div>
</template>

<script>
import { useNominatimSearch } from "@/scripts/useNominatimSearch";
import debounce from "lodash/debounce";
import { filterWeatherDataByTime } from "@/scripts/filterWeatherDataByTime";
import SearchLocation from "@/components/SearchLocation.vue"; // Importera SearchLocation-komponenten


export default {
    data() {
        return {
            searchQuery: '',
            suggestions: [],
            showSuggestions: true,
            error: null,
            weatherObjects: [], // Variabel för att lagra väderinformationen
            outfits: [] // Variabel för att lagra packningslistan
        };
    },
    components: {
        SearchLocation
    },
    methods: {
        async fetchSuggestions() {
            if (this.searchQuery.length > 2) {
                const { results, error } = await useNominatimSearch(this.searchQuery);
                if (error) {
                    this.error = error;
                    this.suggestions = [];
                } else {
                    this.suggestions = results;
                }
            } else {
                this.suggestions = [];
            }
        },
        handleInput() {
            this.debouncedFetchSuggestions();
        },
        async selectLocation(suggestion) {
            this.searchQuery = suggestion.display_name;
            this.showSuggestions = false;
            try {
                // Anropa filterWeatherDataByTime med platsens koordinater för att hämta vädret för den platsen
                this.weatherObjects = await filterWeatherDataByTime(suggestion.lat, suggestion.lon);
                // Skapa packningslistan baserat på väderdata för platsen
                this.outfits = this.createOutfits(this.weatherObjects);
                console.log(`Selected location: Latitude ${suggestion.lat}, Longitude ${suggestion.lon}`);
            } catch (error) {
                this.error = error.message; // Om det uppstår ett fel, visa felmeddelandet
            }
        },
        // Uppdaterad createOutfits-metod för att matcha din användning
        createOutfits(weatherObjects) {
            return weatherObjects.map(weatherObj => {
                let clothes = [];
                const temperature = weatherObj.temperature;
                const windSpeed = weatherObj.windSpeed;
                const rain = weatherObj.averagePrecipitation;

                if (temperature <= 5) {
                    clothes.push('mössa', 'halsduk', 'vinterjacka', 'vantehöger', 'vantevänster', 'kängor');
                } else if (temperature <= 15) {
                    clothes.push('keps', 'vårjacka', 'långbyxor', 'sneakers');
                } else {
                    clothes.push('keps', 'solglasögon', 'tshirt', 'shorts', 'sandaler');
                }

                if (rain > 0 && rain < 1) {
                    clothes.push('paraply');
                }
                if (rain > 1 && rain < 5) {
                    clothes.push('regnjacka', 'regnbyxor', 'stövlar', 'paraply');
                }

                if (temperature > 0 && windSpeed >= 8) {
                    clothes.push('vindjacka', 'långbyxor');
                }
                console.log(this.outfits)
                return { time: weatherObj.date, clothes, weatherSymbol: weatherObj.weatherSymbol };
            });
        }
    },
    created() {
        this.debouncedFetchSuggestions = debounce(this.fetchSuggestions, 300);
    }
};
</script>
<style>
/* CSS för packningslistan */
.packing {
    max-width: 600px;
    /* Anpassa bredden efter behov */
    margin: 0 auto;
    /* Centrera packningslistan horisontellt */
    padding: 20px;
    font-family: Arial, sans-serif;
    /* Valfri typsnitt */
}

h2 {
    font-size: 24px;
    margin-bottom: 15px;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    margin-bottom: 10px;
}

/* Styling för tidsstämpel */
.time {
    font-weight: bold;
}

/* Styling för klädobjekt */
.clothes {
    margin-left: 20px;
}

/* Styling för felmeddelande */
.error {
    color: red;
    margin-top: 10px;
}
</style>