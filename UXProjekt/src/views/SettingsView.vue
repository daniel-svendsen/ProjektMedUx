<template>
  <div class="bg-view-bg">
    <h1 class="font-headline text-headline1 text-center mt-4">Inställningar</h1>

    <div class="form-control pl-6 mt-10 flex justify-start">
      <RouterLink to="/settingsprofile" class="flex items-center">
        <img src="@/assets/Ikonerstilarlogo/settings-profile-icon.svg" alt="profile icon" class="mt-4 w-7 h-7 mr-4">
        <span class="label-text font-headline text-headline2 mt-3">Profil</span>
      </RouterLink>
      <hr class="border-t border-gray-300 mx-0 w-64 my-2">
    </div>
 
    <div class="form-control pl-6 mt-4 flex justify-start">
      <RouterLink to="/" class="flex items-center">
        <img src="@/assets/Ikonerstilarlogo/settings-help-icon.svg" alt="profile icon" class="mt-4 w-7 h-7 mr-4">
        <span class="label-text font-headline text-headline2 mt-3">Hjälp och support</span>
      </RouterLink>
      <hr class="border-t border-gray-300 mx-0 w-64 my-2">
    </div>

    <div class="form-control pl-6 mt-4 flex justify-start">
      <RouterLink to="/settingsabout" class="flex items-center">
        <img src="@/assets/Ikonerstilarlogo/settings-info-icon.svg" alt="profile icon" class="mt-4 w-7 h-7 mr-4">
        <span class="label-text font-headline text-headline2 mt-3">Om</span>
      </RouterLink>
      <hr class="border-t border-gray-300 mx-0 w-64 my-2">
    </div>
  </div>
</template>


<script>
</script>

<style scoped>
</style>