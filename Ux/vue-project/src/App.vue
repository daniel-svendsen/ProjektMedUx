import images from '@/assets/img/*.jpg';

<template>
  <div>
    <header>
      <div id="titleBar">
        <aside id="page"></aside>
        <aside id="temperature"></aside>
        <aside id="location"></aside>
      </div>
    </header>

    <div>
      <!-- First text and image containers -->
      <div class="text-container" id="text-container1">
        <div class="text-slide" id="text1" v-show="activeSlide1 === 1">
          <h1 class="child-name">imageOne</h1>
          <p class="display-time">Eftermiddag</p>
        </div>
        <div class="text-slide" id="text2" v-show="activeSlide1 === 2">
          <h1 class="child-name">imageTwo</h1>
          <p class="display-time">Eftermiddag</p>
        </div>
        <div class="text-slide" id="text3" v-show="activeSlide1 === 3">
          <h1 class="child-name">imageThree</h1>
          <p class="display-time">Eftermiddag</p>
        </div>
      </div>

      <div class="image-container" id="image-container1">
        <div class="image-slide">
          <img src="img/image3.jpg" id="lastClone" alt="">
          <img src="img/image1.jpg" alt="">
          <img src="img/image2.jpg" alt="">
          <img src="img/image3.jpg" alt="">
          <img src="img/image1.jpg" id="firstClone" alt="">
        </div>
        <div class="button-container">
          <button @click="nextSlide1" id="nextBtn">next</button>
        </div>
      </div>

      <button @click="prevSlide1" id="prevBtn">prev</button>

      <!-- Second text and image containers -->
      <div class="text-container" id="text-container2">
        <div class="text-slide" id="text4" v-show="activeSlide2 === 1">
          <h1 class="child-name">imageOne</h1>
          <p class="display-time">Eftermiddag</p>
        </div>
        <div class="text-slide" id="text5" v-show="activeSlide2 === 2">
          <h1 class="child-name">imageTwo</h1>
          <p class="display-time">Eftermiddag</p>
        </div>
        <div class="text-slide" id="text6" v-show="activeSlide2 === 3">
          <h1 class="child-name">imageThree</h1>
          <p class="display-time">Eftermiddag</p>
        </div>
      </div>

      <div class="image-container" id="image-container2">
        <div class="image-slide">
          <img src="img/image3.jpg" id="lastClone2" alt="">
          <img src="img/image1.jpg" alt="">
          <img src="img/image2.jpg" alt="">
          <img src="img/image3.jpg" alt="">
          <img src="img/image1.jpg" id="firstClone2" alt="">
        </div>
        <div class="button-container">
          <button @click="nextSlide2" id="nextBtn2">next</button>
        </div>
      </div>

      <button @click="prevSlide2" id="prevBtn2">prev</button>

    </div>

    <div id="weatherDisplay"></div>

    <footer>
      <div id="navicationBar">
        <div id="homeButton">
          <h6 class="navigation-text">Home</h6>
        </div>
        <div id="packageButton">
          <h6 class="navigation-text">Package</h6>
        </div>
        <div id="overview">
          <h6 class="navigation-text">Overview</h6>
        </div>
        <div id="notification">
          <h6 class="navigation-text">Notification</h6>
        </div>
        <div id="Settings">
          <h6 class="navigation-text">Settings</h6>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const activeSlide1 = ref(1)
    const activeSlide2 = ref(1)

    const nextSlide1 = () => {
      if (activeSlide1.value < 3) {
        activeSlide1.value++
      } else {
        activeSlide1.value = 1
      }
    }

    const prevSlide1 = () => {
      if (activeSlide1.value > 1) {
        activeSlide1.value--
      } else {
        activeSlide1.value = 3
      }
    }

    const nextSlide2 = () => {
      if (activeSlide2.value < 3) {
        activeSlide2.value++
      } else {
        activeSlide2.value = 1
      }
    }

    const prevSlide2 = () => {
      if (activeSlide2.value > 1) {
        activeSlide2.value--
      } else {
        activeSlide2.value = 3
      }
    }

    return {
      activeSlide1,
      activeSlide2,
      nextSlide1,
      prevSlide1,
      nextSlide2,
      prevSlide2
    }
  }
}
</script>

<style scoped>
/* Style definitions go here, you can transfer the CSS from your original HTML */
</style>
