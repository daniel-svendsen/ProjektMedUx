import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

// Function to initialize carousel and text switching for a given container
function initializeCarousel(imageContainerSelector, textContainerSelector, prevBtnSelector, nextBtnSelector) {
    // Select the image container, images, and text container
    const imageSlide = document.querySelector(imageContainerSelector + ' .image-slide');
    const images = document.querySelectorAll(imageContainerSelector + ' .image-slide img');
    const textSlides = document.querySelectorAll(textContainerSelector + ' .text-slide');

    // Select the previous and next buttons
    const prevBtn = document.querySelector(prevBtnSelector);
    const nextBtn = document.querySelector(nextBtnSelector);

    let counter = 1;
    const size = images[0].clientWidth;

    // Set initial transform
    imageSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';

    // Function to update text based on the current image
    function updateText() {
        // Hide all text slides
        textSlides.forEach(slide => slide.style.display = 'none');

        // Show the appropriate text slide based on the counter
        if (counter >= 1 && counter <= textSlides.length) {
            textSlides[counter - 1].style.display = 'block';
        }
    }

    // Initial text update
    updateText();

    // Event listener for the next button
    nextBtn.addEventListener('click', () => {
        if (counter >= images.length - 1) {
            // Reset to the beginning if the end is reached
            imageSlide.style.transition = "none";
            counter = 1;
            imageSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
            updateText();
        } else {
            imageSlide.style.transition = "transform 0.4s ease-in-out";
            counter++;
            imageSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
            updateText();
        }
    });

    // Event listener for the previous button
    prevBtn.addEventListener('click', () => {
        if (counter <= 1) {
            // Reset to the end if the beginning is reached
            imageSlide.style.transition = "none";
            counter = images.length - 2;
            imageSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
            updateText();
        } else {
            imageSlide.style.transition = "transform 0.4s ease-in-out";
            counter--;
            imageSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
            updateText();
        }
    });

    // Event listener for the transition end
    imageSlide.addEventListener('transitionend', () => {
        // Reset transition style if the last or first clone is shown
        if (images[counter].id === 'lastClone') {
            imageSlide.style.transition = "none";
            counter = images.length - 2;
            imageSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
        } else if (images[counter].id === 'firstClone') {
            imageSlide.style.transition = "none";
            counter = 1;
            imageSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
        }
        updateText();
    });
}

// Initialize the first carousel
initializeCarousel('#image-container1', '#text-container1', '#prevBtn', '#nextBtn');

// Initialize the second carousel
initializeCarousel('#image-container2', '#text-container2', '#prevBtn2', '#nextBtn2');



const app = createApp(App)

app.use(createPinia())

app.mount('#app')

