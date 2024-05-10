import { createRouter, createWebHistory } from 'vue-router'
import createprofile from '../views/CreateProfile.vue'
import home from '../views/HomeView.vue'
import packing from '../views/PackingView.vue'
import oversight from '../views/OversightView.vue'
import notices from '../views/NoticeView.vue'
import settings from '../views/SettingsView.vue'

const routes = [
  {
    path: '/createprofile',
    name: 'Create Profile',
    component: createprofile
  },
  {
    path: '/',
    name: 'Home',
    component: home
  },
  {
    path: '/packing',
    name: 'Packing',
    component: packing
  },
  {
    path: '/oversight',
    name: 'Oversight',
    component: oversight
  },
  {
    path: '/notices',
    name: 'Notices',
    component: notices
  },
  {
    path: '/settings',
    name: 'Settings',
    component: settings
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
