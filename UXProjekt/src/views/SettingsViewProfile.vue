<template>
    <div class="p-4 bg-view-bg">
      <h1 class="font-headline text-headline1 text-center mt-4">Inställningar</h1>
      
      <div class="form-control mt-10">
        <RouterLink to="/" class="flex items-center pl-6">
          <img src="@/assets/Ikonerstilarlogo/settings-profile-icon.svg" alt="profile icon" class="w-7 h-7 mr-4">
          <span class="label-text font-headline text-headline2">{{ currentUserName }}</span>
        </RouterLink>
        <hr class="border-t border-gray-300 ml-6 pl-6 my-2">
      </div>
  
      <div class="form-control mt-4">
        <RouterLink to="/" class="flex items-center pl-6">
          <img src="@/assets/Ikonerstilarlogo/settings-help-icon.svg" alt="help icon" class="w-7 h-7 mr-4">
          <span class="label-text font-headline text-headline2">{{ currentUserEmail }}</span>
        </RouterLink>
        <hr class="border-t border-gray-300 ml-6 pl-6 my-2">
      </div>
  
      <div class="form-control mt-4">
        <RouterLink to="/" class="flex items-center pl-6">
          <img src="@/assets/Ikonerstilarlogo/settings-info-icon.svg" alt="info icon" class="w-7 h-7 mr-4">
          <span class="label-text font-headline text-headline2">{{ currentUserPhone }}</span>
        </RouterLink>
        <hr class="border-t border-gray-300 ml-6 pl-6 my-2">
      </div>
      
    </div>
  </template>
  
  <script>
  import { useUserStore } from '@/stores/userStore';
  
  export default {  
    computed: {
      currentUserName() {
        const store = useUserStore();
        return store.currentUser?.name || 'Inget namn angivet';
      },
      currentUserEmail() {
        const store = useUserStore();
        return store.currentUser?.email || 'Ingen e-post angiven';
      },
      currentUserPhone() {
        const store = useUserStore();
        return store.currentUser?.phone || 'Inget telefonnummer angivet';
      }
    }
  }
  </script>
  
  <style>
    /* Din lokal CSS kan gå här för ytterligare styling */
  </style>
  
