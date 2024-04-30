<!-- TransformedData.vue -->
<template>
    <div>
        <h2>Transformed Weather Data</h2>
        <ul>
            <li v-for="(entry, index) in transformedData" :key="index">
                {{ entry }}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        transformedData: {
            type: Array,
            default: () => []
        }
    }
};
</script>

<style>
/* Dina stilar här */
</style>