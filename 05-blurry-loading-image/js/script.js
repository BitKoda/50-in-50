const loadText = document.querySelector('.loading-text')
const bg = document.querySelector('.bg')

let load = 0
let int = setInterval(blurring, 30)

// Scaling function so opacity goes from 1 to 0 in
// same time as counter goes from 0% to 100%
// https://stackoverflow.com/questions/

const scale = (num, in_min, in_max, out_min, out_max) => {
  return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

function blurring() {
  load++

  if(load > 99) {
    clearInterval(int)
  }

  loadText.innerHTML = `${load}%` 
  loadText.style.opacity = scale(load, 0, 100, 1, 0)
  bg.style.filter = `blur(${scale(load, 0, 100, 30, 0)}px)`
}

