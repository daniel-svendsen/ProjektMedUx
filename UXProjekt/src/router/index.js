import { createRouter, createWebHistory } from 'vue-router'
import createprofile from '../views/CreateProfile.vue'
import addchild from '../views/AddChild.vue'
import home from '../views/HomeView.vue'
import packing from '../views/PackingView.vue'
import oversight from '../views/OversightView.vue'
import notices from '../views/NoticeView.vue'
import settings from '../views/SettingsView.vue'
import settingsprofile from '../views/SettingsViewProfile.vue'
import settingsabout from '../views/SettingsViewAbout.vue'
import settingshelp from '../views/SettingsViewHelp.vue'

const routes = [
  {
    path: '/createprofile',
    name: 'Create Profile',
    component: createprofile,
    meta: { showFooter: false }
  },
  {
    path: '/addchild',
    name: 'Add Child',
    component: addchild,
    meta: { showFooter: false }
  },
  {
    path: '/',
    name: 'Home',
    component: home,
    meta: { showFooter: true }
  },
  {
    path: '/packing',
    name: 'Packing',
    component: packing,
    meta: { showFooter: true }
  },
  {
    path: '/oversight',
    name: 'Oversight',
    component: oversight,
    meta: { showFooter: true }
  },
  {
    path: '/notices',
    name: 'Notices',
    component: notices,
    meta: { showFooter: true }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: settings,
    meta: { showFooter: true }
  },
  {
    path: '/settingsprofile',
    name: 'Settings Profile',
    component: settingsprofile,
    meta: { showFooter: true }
  },
  {
    path: '/settingsabout',
    name: 'Settings About',
    component: settingsabout,
    meta: { showFooter: true }
  },
  {
    path: '/settingshelp',
    name: 'Settings Help',
    component: settingshelp,
    meta: { showFooter: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
