<template>
    <div class="p-4 bg-view-bg">

        <h1 class="font-headline text-headline1 text-center">Skapa profil</h1>
        <hr class="border-t border-gray-300 mx-auto w-64 my-2">


        <div class="form-control">
            <label class="label">
                <!-- Använd klassen från din Tailwind-konfiguration för att sätta storlek på texten -->
                <span class="label-text font-headline text-headline2 mt-10">Namn</span>
            </label>
            <!-- Använd den anpassade bakgrundsfärgen för input-rutan -->
            <input type="text" placeholder="" class="input input-bordered bg-info-bg" v-model="newUser.name">
        </div>

        <div class="form-control">
            <label class="label">
                <span class="label-text font-headline text-headline2 mt-10">Email</span>
            </label>
            <input type="text" placeholder="" class="input input-bordered bg-info-bg" v-model="newUser.email">
        </div>

        <div class="form-control">
            <label class="label">
                <span class="label-text font-headline text-headline2 mt-10">Mobil</span>
            </label>
            <input type="text" placeholder="" class="input input-bordered bg-info-bg" v-model="newUser.phone">
        </div>

        <div class="form-control mt-4 flex justify-start">
            <span class="label-text font-headline text-headline2 mt-2">Lägg till barn</span>
            <img src="@/assets/Ikonerstilarlogo/icons8_plus.svg" alt="Lägg till"
                class="cursor-pointer w-16 h-16 flex-shrink-0 mt-2" @click="addUser">
        </div>
    </div>
</template>

<script lang="js">
import { useUserStore } from '@/stores/userStore'; // Importera din store
import { defineComponent } from 'vue';

export default defineComponent({
    name: "SkapaProfil",
    data() {
        return {
            newUser: {
                id: Date.now(),
                name: '',
                email: '',
                phone: '',
                children: []
            }
        };
    },
    computed: {
        users() {
            const store = useUserStore();
            return store.users;
        }
    },
    methods: {
        addUser() {
            const store = useUserStore();
            store.addUser({ ...this.newUser, id: Date.now() });
            this.newUser = { id: Date.now(), name: '', email: '', phone: '', children: [] };
        },
        removeUser(id) {
            const store = useUserStore();
            store.removeUser(id);
        }
    }
})
</script>

<style>
/* Du kan lägga till lokal CSS här om nödvändigt */
</style>