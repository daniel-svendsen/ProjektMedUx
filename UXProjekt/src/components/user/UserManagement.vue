<template>
    <div>
      <h2>Användarhantering</h2>
      <form @submit.prevent="addUser">
        <input v-model="newUser.name" placeholder="Namn">
        <input v-model="newUser.email" placeholder="E-post">
        <input v-model="newUser.phone" placeholder="Telefonnummer">
        <button type="submit">Lägg till användare</button>
      </form>
      <ul>
        <li v-for="user in users" :key="user.id">
          {{ user.name }} - {{ user.email }}
          <button @click="removeUser(user.id)">Ta bort</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { useUserStore } from '@/stores/userStore';
  
  export default {
    data() {
      return {
        newUser: {
          id: Date.now(),
          name: '',
          email: '',
          phone: '',
          children: []
        }
      };
    },
    computed: {
      users() {
        const store = useUserStore();
        return store.users;
      }
    },
    methods: {
      addUser() {
        const store = useUserStore();
        store.addUser({ ...this.newUser, id: Date.now() });
        this.newUser = { id: Date.now(), name: '', email: '', phone: '', children: [] };
      },
      removeUser(id) {
        const store = useUserStore();
        store.removeUser(id);
      }
    }
  }
  </script>