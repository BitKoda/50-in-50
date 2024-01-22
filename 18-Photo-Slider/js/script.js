const body = document.body;
const slides = document.querySelectorAll('.slide');
const leftBtn = document.getElementById('left');
const rightBtn = document.getElementById('right');

// set initial slide to background and active
let activeSlide = 0;
setBgToBody();
setActiveSlide();

// set background image
function setBgToBody() {
  body.style.backgroundImage = slides[activeSlide].style.backgroundImage
}

// set the active slide
function setActiveSlide() {
  slides.forEach(slide => slide.classList.remove('active'));

  slides[activeSlide].classList.add('active');
}

// clicking the right button advances the activeSlide count
// by 1. If on the last slide, the next click takes user
// back to the first slide.
rightBtn.addEventListener('click', () => {
  activeSlide++
  if (activeSlide > slides.length - 1) {
    activeSlide = 0;
  }

  setBgToBody();
  setActiveSlide();
})

// clicking the left button decreases the activeSlide count
// by 1. If on the frst slide, the next click takes user
// to the last slide.
leftBtn.addEventListener('click', () => {
  activeSlide--
  if (activeSlide < 0) {
    activeSlide = slides.length - 1;
  }

  setBgToBody();
  setActiveSlide();
})
