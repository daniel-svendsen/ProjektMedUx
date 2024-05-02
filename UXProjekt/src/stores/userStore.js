// stores/userStore.js
import { defineStore } from 'pinia';

export const useUserStore = defineStore('userStore', {
  state: () => ({
    users: [],
    currentUser: null,
  }),
  getters: {
    userChildren: (state) => {
      return state.currentUser ? state.currentUser.children : [];
    },
  },
  actions: {
    addUser(user) {
      this.users.push(user);
      this.saveUsers();
    },
    removeUser(userId) {
      this.users = this.users.filter(user => user.id !== userId);
      this.saveUsers();
    },
    addChild(child) {
      if (this.currentUser) {
        this.currentUser.children.push(child);
        this.saveUsers();
      }
    },
    removeChild(childId) {
      if (this.currentUser) {
        this.currentUser.children = this.currentUser.children.filter(child => child.id !== childId);
        this.saveUsers();
      }
    },
    setCurrentUser(userId) {
      this.currentUser = this.users.find(user => user.id === userId);
    },
    fetchUsers() {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      this.users = users;
      this.currentUser = users[0] || null;  // Sätter första användaren som nuvarande eller null
    },
    saveUsers() {
      localStorage.setItem('users', JSON.stringify(this.users));
    }
  }
});
