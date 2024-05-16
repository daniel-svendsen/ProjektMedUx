<template>

    <div class="p-4 min-h-screen bg-view-bg">
        <h1 class="font-headline text-headline1 text-center mt-4">Dagens packlista</h1>
        <hr class="border-t border-gray-300 mx-auto w-64 my-2">

        <div class="form-control px-4 mt-10 flex justify-start">
            <ul>
                <li v-for="(item, index) in packingList" :key="index" class="mb-1">
                    <div class="flex items-center w-full bg-lightgrey rounded-lg p-2">
                        <div @click="toggleMark(item)" class="relative cursor-pointer">
                            <img src="@/assets/Ikonerstilarlogo/packing-rectangle.png" alt="profile icon"
                                class="mr-4 w-7 h-7">
                            <img v-if="isMarked(item)" src="@/assets/Ikonerstilarlogo/packing-checkmark-icon.svg"
                                alt="checkmark icon" class="absolute top-0 left-0 w-7 h-7">
                        </div>
                        <div class="flex-1 flex text-left font-large-text text-large-text">
                            {{ item }}
                        </div>
                        <img @click="removeItem(item)" src="@/assets/Ikonerstilarlogo/packing-trash-icon.svg"
                            alt="trash icon" class="ml-4 w-5 h-5 cursor-pointer">
                    </div>
                </li>
            </ul>
        </div>

    </div>

</template>

<script>
import { generatePackingList } from '@/scripts/getPackingList.js';


export default {
    data() {
        return {
            packingList: [],
            markedItems: []
        };
    },
    async mounted() {
        await this.generatePackingList();
    },
    methods: {
        async generatePackingList() {
            try {
                const outfits = await generatePackingList();
                // Flatten the list of clothes and remove duplicates
                const allClothes = outfits.flatMap(outfit => outfit.clothes);
                // Convert the Set to an Array using Array.from
                this.packingList = Array.from(new Set(allClothes));
            } catch (error) {
                console.error('Error generating packing list:', error);
            }
        },
        toggleMark(item) {
            const index = this.markedItems.indexOf(item);
            if (index === -1) {
                this.markedItems.push(item);
            } else {
                this.markedItems.splice(index, 1);
            }
        },
        isMarked(item) {
            return this.markedItems.includes(item);
        },
        removeItem(item) {
            const index = this.packingList.indexOf(item);
            if (index !== -1) {
                this.packingList.splice(index, 1);
            }
        }
    }
    }
</script>

<style scoped>
/* Dina stilar för packningslistan */
</style>
