<script setup>
import { RouterLink, RouterView } from 'vue-router'
import '@fortawesome/fontawesome-free/css/all.css'; // Import Font Awesome styles
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
<<<<<<< HEAD
=======
       
>>>>>>> 3220a6a71036419f1e7a4139bf08d435c43d0c9b
        </nav>
      </div>
    </header>

    <router-view></router-view>
  </div>
</template>
<style scoped></style>
