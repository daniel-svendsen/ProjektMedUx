<!-- PackingView.vue -->
<template>
  <div class="packing">
    <h1>This is a packing page</h1>
    <!-- Lägg till sökfältet här -->
    <!-- <SearchLocation /> -->
  </div>
  <div>
    <!-- Använd ClothesForPacking-komponenten här -->
    <ClothesForPacking />
  </div>
</template>

<script>
// Importera dina andra skript som behövs
import ClothesForPacking from "@/components/ClothesForPacking.vue";

// Importera SearchLocation komponenten
//import SearchLocation from "@/components/SearchLocation.vue";

export default {
  components: {
    // Registrera SearchLocation komponenten
    //SearchLocation,
    ClothesForPacking
  },
  // Dina andra optioner och metoder
}
</script>

<style>
@media (min-width: 1024px) {
  .packing {
    min-height: 100vh;
    display: flex;
    align-items: center;
    flex-direction: column;
    /* Om du vill centrera innehållet vertikalt */
  }
}
</style>
