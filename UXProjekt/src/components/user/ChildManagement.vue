<template>
    <div>
      <h2>Barnhantering</h2>
      <form @submit.prevent="addChild">
        <input v-model="newChild.name" placeholder="Barnets namn">
        <input v-model="newChild.age" placeholder="Barnets ålder">
        <button type="submit">Lägg till barn</button>
      </form>
      <ul>
        <li v-for="child in children" :key="child.id">
          {{ child.name }} ({{ child.age }} år)
          <button @click="removeChild(child.id)">Ta bort</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { useUserStore } from '@/stores/userStore';
  
  export default {
    data() {
      return {
        newChild: {
          id: Date.now(),
          name: '',
          age: ''
        }
      };
    },
    computed: {
      children() {
        const store = useUserStore();
        return store.userChildren;
      }
    },
    methods: {
      addChild() {
        const store = useUserStore();
        store.addChild({ ...this.newChild, id: Date.now() });
        this.newChild = { id: Date.now(), name: '', age: '' };
      },
      removeChild(id) {
        const store = useUserStore();
        store.removeChild(id);
      }
    }
  }
  </script>
  