<template>
    <div class="p-4 min-h-screen bg-view-bg">
      <div class="form-control">
            <RouterLink to="/settings" class="flex flex-col items-center">
                <div class="flex items-center w-full">
                    <img src="@/assets/Ikonerstilarlogo/back_arrow_icon.svg" alt="profile icon"
                        class="w-7 h-7 ml-2">
                    <div class="flex-1 flex justify-center">
                        <h1 class="font-headline text-headline1 mt-8">Profil</h1>
                    </div>
                </div>
            </RouterLink>
        </div>
      
      <div class="form-control mt-16 pr-6">
        <RouterLink to="/" class="flex items-center pl-6">
          <img src="@/assets/Ikonerstilarlogo/settings-profile-icon.svg" alt="profile icon" class="w-7 h-7 mr-4">
          <span class="label-text font-headline text-headline2">{{ currentUserName }}</span>
        </RouterLink>
        <hr class="border-t border-gray-300 ml-6 pl-6 my-2">
      </div>
  
      <div class="form-control mt-4 pr-6">
        <RouterLink to="/" class="flex items-center pl-6">
          <img src="@/assets/Ikonerstilarlogo/settings-mail-icon.svg" alt="help icon" class="w-7 h-7 mr-4">
          <span class="label-text font-headline text-headline2">{{ currentUserEmail }}</span>
        </RouterLink>
        <hr class="border-t border-gray-300 ml-6 pl-6 my-2">
      </div>
  
      <div class="form-control mt-4 pr-6">
        <RouterLink to="/" class="flex items-center pl-6">
          <img src="@/assets/Ikonerstilarlogo/settings-phone-icon.svg" alt="info icon" class="w-7 h-7 mr-4">
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
  
