import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useUserStore } from '@/stores/userStore.js';


import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

app.mount('#app')

const userStore = useUserStore();
userStore.fetchUsers();

if (!userStore.users.length) {
    // Om ingen användare finns, navigera till SettingsView
    router.push({ name: 'Create Profile' });
} else {
    // Om användare finns, navigera till HomeView
    router.push({ name: 'Home' });
}

