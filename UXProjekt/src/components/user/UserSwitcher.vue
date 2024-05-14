<template>
    <div>
      <h2>Byt användare</h2>
      <select v-model="selectedUserId" @change="switchUser">
        <option disabled value="">Välj en användare</option>
        <option v-for="user in users" :key="user.id" :value="user.id">
          {{ user.name }}
        </option>
      </select>
    </div>
  </template>
  
  <script>
  import { useUserStore } from '@/stores/userStore';
  
  export default {
    data() {
      return {
        selectedUserId: null
      };
    },
    computed: {
      users() {
        const store = useUserStore();
        return store.users;
      }
    },
    methods: {
      switchUser() {
        const store = useUserStore();
        store.setCurrentUser(this.selectedUserId);
      }
    },
    mounted() {
      const store = useUserStore();
      if (store.currentUser) {
        this.selectedUserId = store.currentUser.id;
      }
    }
  }
  </script>
