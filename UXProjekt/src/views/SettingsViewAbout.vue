<template>
    <div class="flex flex-col min-h-screen p-4 bg-view-bg">

        <div class="form-control">
            <RouterLink to="/settings" class="flex flex-col items-center">
                <div class="flex items-center w-full">
                    <img src="@/assets/Ikonerstilarlogo/back_arrow_icon.svg" alt="profile icon"
                        class="w-7 h-7 ml-2">
                    <div class="flex-1 flex justify-center">
                        <h1 class="font-headline text-headline1 mt-8">Om</h1>
                    </div>
                </div>
            </RouterLink>
        </div>


        <div class="flex-grow">
            <div class="flex justify-between items-center pl-6 pr-6 mt-16 w-full">
                <span class="label-text font-headline text-headline2">Namn</span>
                <span class="label-text font-headline text-headline2 text-grey">Klädkollen</span>
            </div>
            <hr class="border-t border-gray-300 ml-6 mr-6 my-2">

            <div class="flex justify-between items-center pl-6 pr-6 mt-10 w-full">
                <span class="label-text font-headline text-headline2">Version</span>
                <span class="label-text font-headline text-headline2 text-grey">17.01.08</span>
            </div>
            <hr class="border-t border-gray-300 ml-6 mr-6 my-2">

            <div class="flex justify-between items-center pl-6 pr-6 mt-10 w-full">
                <span class="label-text font-headline text-headline2">API</span>
                <span class="label-text font-headline text-headline2 text-grey">SMHI Open Data</span>
            </div>
            <hr class="border-t border-gray-300 ml-6 mr-6 my-2">
        </div>

        <!-- Div placed at the bottom -->
        <div class="text-center p-4 mb-44">
            <p class="font-sans text-small-text text-grey">
                Skapat av: <br><br>
                Erik Brandberg, Caroline Nordlund, Noah Törnell, Clara <br>
                Björkberg, Darko Zivkovic, Daniel Svendsén, Jimmy Emanuelsson, Ludwig Wågberg
            </p>
        </div>
    </div>
</template>
