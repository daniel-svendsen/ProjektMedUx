<script setup>
  import { RouterLink } from 'vue-router';
  import { ref } from 'vue'; 
  import { onMounted } from 'vue'; 
  import { useGeolocation } from '@/scripts/getPosition.js';
  import { getWeatherObjectsList } from './scripts/getAll.js'; 
  import homeIcon from '@/assets/Filer/Ikonerstilarlogo/home-icon-white.svg';
  import packingIcon from '@/assets/Filer/Ikonerstilarlogo/packing-white.svg';
  import noticesIcon from '@/assets/Filer/Ikonerstilarlogo/notice-white.svg';
  import settingsIcon from '@/assets/Filer/Ikonerstilarlogo/settings-white.svg';
  import '@fortawesome/fontawesome-free/css/all.css';

  const latitude = ref(null);
  const longitude = ref(null);
  const temperature = ref(null);

  useGeolocation().then(position => {
    latitude.value = position.latitude;
    longitude.value = position.longitude;
    console.log('Latitude:', latitude);
    console.log('Longitude:', longitude);
  });

  onMounted(async () => {
    const weatherObjects = await getWeatherObjectsList();
    if (weatherObjects && weatherObjects.length > 0) {
      temperature.value = weatherObjects[0].temperature;
      console.log('Temperature:', temperature);
    }
  });
</script>

<template>
  <Suspense>
    <div>
      <router-view></router-view>
      <footer class="bg-blue-900 py-4">
        <div class="wrapper flex justify-between items-center text-white">
          <RouterLink to="/" class="flex items-center">
            <img :src="homeIcon" alt="Home Icon" class="mr-2">
            <span>Hem</span>
          </RouterLink>
          <RouterLink to="/packing" class="flex items-center">
            <img :src="packingIcon" alt="Packing Icon" class="mr-2">
            <span>Packning</span>
          </RouterLink>
          <RouterLink to="/oversight" class="flex items-center">
            <i class="fas fa-chart-pie mr-2"></i> <!-- Oversight Icon -->
            <span>Översikt</span>
          </RouterLink>
          <RouterLink to="/notices" class="flex items-center">
            <img :src="noticesIcon" alt="Notices Icon" class="mr-2">
            <span>Notiser</span>
          </RouterLink>
          <RouterLink to="/settings" class="flex items-center">
            <img :src="settingsIcon" alt="Settings Icon" class="mr-2">
            <span>Inställningar</span>
          </RouterLink>
        </div>
      </footer>
    </div>
  </Suspense>
</template>

<style scoped>
 

  header,
  footer {
    background-color: #425890;
    width: 100%;
  }

  .wrapper>div>div>a {
    flex: 1;
  }
</style>