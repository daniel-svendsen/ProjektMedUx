import { defineStore } from 'pinia';

export const useWeatherStore = defineStore('weather', {
    state: () => ({
        weatherObjects: [],
    }),
    actions: {
        setWeatherObjects(weatherObjects) {
            this.weatherObjects = weatherObjects;
        },
        addWeatherObject(weatherObject) {
            this.weatherObjects.push(weatherObject);
        },
        clearWeatherObjects() {
            this.weatherObjects = [];
        },
    },
});