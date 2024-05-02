<template>
  <div>
    <h1>Inställningar</h1>
    <!-- Användarhantering -->
    <user-management></user-management>
    <!-- Endast visa barnhantering om en användare är vald -->
    <div v-if="currentUser">
      <child-management></child-management>
    </div>
    <!-- Användarväxlare -->
    <user-switcher @userChanged="handleUserChange"></user-switcher>
  </div>
</template>

<script>
import UserManagement from '@/components/user/UserManagement.vue';
import ChildManagement from '@/components/user/ChildManagement.vue';
import UserSwitcher from '@/components/user/UserSwitcher.vue';
import { useUserStore } from '@/stores/userStore';

export default {
  components: {
    UserManagement,
    ChildManagement,
    UserSwitcher
  },
  computed: {
    currentUser() {
      const store = useUserStore();
      return store.currentUser;
    }
  },
  methods: {
    handleUserChange() {
      // Uppdaterar vyn när en ny användare väljs, kan inkludera logik för att rensa/formatera vyn
      this.$forceUpdate(); // Ett enkelt sätt att tvinga en om-rendering, om nödvändigt
    }
  }
}
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>