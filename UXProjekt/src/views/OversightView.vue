<!-- OverSightView.vue -->
<template>
  <div class="oversikt">
    <h1>This is an oversikt page</h1>
    <!-- Include the AllTimeData component here -->
    <AllTimeData />
  </div>
</template>

<script>
// Import the AllTimeData component
import AllTimeData from '../components/AllTimeData.vue';

export default {
  components: {
    AllTimeData // Register the AllTimeData component
  }
};
</script>

<style>
@media (min-width: 1024px) {
  .oversikt {
    min-height: 100vh;
    display: flex;
    align-items: center;
    flex-direction: column;
    /* Align items vertically */
  }
}
</style>
