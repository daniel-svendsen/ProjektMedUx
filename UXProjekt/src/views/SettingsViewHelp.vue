<template>
    <div class="p-4 min-h-screen bg-view-bg">
      <div class="form-control">
            <RouterLink to="/settings" class="flex flex-col items-center">
                <div class="flex items-center w-full">
                    <img src="@/assets/Ikonerstilarlogo/back_arrow_icon.svg" alt="profile icon"
                        class="w-7 h-7 ml-2">
                    <div class="flex-1 flex justify-center">
                        <h1 class="font-headline text-headline1 mt-8">Hjälp och support</h1>
                    </div>
                </div>
            </RouterLink>
        </div>
        
      <div class="form-control mt-16 pr-6">
        <RouterLink to="/" class="flex items-center pl-6">
          <img src="@/assets/Ikonerstilarlogo/settings-mail-icon.svg" alt="help icon" class="w-7 h-7 mr-4">
          <span class="label-text font-headline text-headline2">kladkollen@hotmail.com</span>
        </RouterLink>
        <hr class="border-t border-gray-300 ml-6 pl-6 my-2">
      </div>
  
      <div class="form-control mt-4 pr-6">
        <RouterLink to="/" class="flex items-center pl-6">
          <img src="@/assets/Ikonerstilarlogo/settings-phone-icon.svg" alt="info icon" class="w-7 h-7 mr-4">
          <span class="label-text font-headline text-headline2">0707363738</span>
        </RouterLink>
        <hr class="border-t border-gray-300 ml-6 pl-6 my-2">
      </div>
      
    </div>
  </template>