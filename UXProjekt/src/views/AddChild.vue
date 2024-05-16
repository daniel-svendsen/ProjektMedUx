<template>
    <div class="p-4 min-h-screen bg-view-bg">

        <h1 class="font-headline text-headline1 text-center mt-4">Lägg till barn</h1>
        <hr class="border-t border-gray-300 mx-auto w-64 my-2">

        <div class="form-control flex justify-center items-center">
            <img src="@/assets/Ikonerstilarlogo/add-child-logo.svg" alt="add-child-icon"
                class="cursor-pointer w-28 h-28 flex-shrink-0 mt-2">
        </div>

        <div class="form-control">
            <label class="label">
                <span class="label-text font-headline text-headline2 mt-10">Namn</span>
            </label>
            <input type="text" placeholder="" class="input input-bordered bg-info-bg" v-model="newChild.name">
        </div>

        <div class="form-control">
            <label class="label">
                <span class="label-text font-headline text-headline2 mt-10">Ålder</span>
            </label>
            <input type="text" placeholder="" class="input input-bordered bg-info-bg" v-model="newChild.age">
        </div>

        <div class="form-control mt-4 flex items-start justify-start">
            <button
                :class="['btn shadow-lg font-headline text-headline2 font-thin px-4 py-2 mt-10', isFormValid ? 'bg-blue text-white' : 'bg-gray-400 text-gray-500 cursor-not-allowed']"
                @click="addChild" :disabled="!isFormValid">
                Lägg till
            </button>
        </div>
    </div>
</template>

<script>
import { useUserStore } from '@/stores/userStore';

export default {
    data() {
        return {
            newChild: {
                id: Date.now(),
                name: '',
                age: ''
            }
        };
    },
    computed: {
        children() {
            const store = useUserStore();
            return store.userChildren;
        },
        isFormValid() {
            return this.newChild.name.trim().length > 0 && /^\d+$/.test(this.newChild.age);
        }
    },
    methods: {
        addChild() {
            const store = useUserStore();
            store.addChild({ ...this.newChild, id: Date.now() });
            this.$router.push('/'); // Navigera direkt efter att barnet har lagts till
        },
        removeChild(id) {
            const store = useUserStore();
            store.removeChild(id);
        },
    }
}
</script>



<style></style>