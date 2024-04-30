<script setup>
import { RouterLink, RouterView } from 'vue-router'
import '@fortawesome/fontawesome-free/css/all.css'; // Import Font Awesome styles
import GetPosition from './components/GetPosition.vue';
</script>

<template>
  <div>
    <header>
      <div class="wrapper">
        <nav>
          <RouterLink to="/">
            <i class="fas fa-home"></i> <!-- Home Icon -->
            Hem
          </RouterLink>
          <RouterLink to="/packing">
            <i class="fas fa-suitcase"></i> <!-- Packing Icon -->
            Packning
          </RouterLink>
          <RouterLink to="/oversight">
            <i class="fas fa-chart-pie"></i> <!-- Oversight Icon -->
            Översikt
          </RouterLink>
          <RouterLink to="/notices">
            <i class="fas fa-bell"></i> <!-- Notices Icon -->
            Notiser
          </RouterLink>
          <RouterLink to="/settings">
            <i class="fas fa-cog"></i> <!-- Settings Icon -->
            Inställningar
          </RouterLink>
          <GetPosition @position-updated="updatePosition" />
        </nav>
      </div>
    </header>

    <RouterView />
  </div>
</template>
<style scoped></style>
