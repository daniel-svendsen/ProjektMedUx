<!-- GetPosition.vue -->
<template>
    <div>
        <p v-if="position">Latitude: {{ position.latitude }} <br>Longitude: {{ position.longitude }}</p>
        <p v-else>Loading...</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            position: null,
        };
    },
    created() {
        this.getPosition();
    },
    methods: {
        getPosition() {
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const latitude = position.coords.latitude.toFixed(4);
                        const longitude = position.coords.longitude.toFixed(4);
                        this.position = { latitude, longitude };
                        // Emit the position to the parent component
                        this.$emit('position-updated', this.position);
                    },
                    (error) => {
                        console.error("Error getting position:", error.message);
                    }
                );
            } else {
                console.error("Geolocation is not supported by your browser");
            }
        },
    },
};
</script>