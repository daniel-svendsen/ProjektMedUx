<!-- UsualWeatherData.vue -->
<template>
    <div>
        <h2>Usual Weather Data</h2>
        <ul>
            <li v-for="(entry, index) in usualWeatherData" :key="index">
                {{ entry }}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        usualWeatherData: {
            type: Array,
            default: () => []
        }
    }
};
</script>

<style>
/* Dina stilar här */
</style>