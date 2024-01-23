const hourHand = document.querySelector('.hour');
const minuteHand = document.querySelector('.minute');
const secondHand = document.querySelector('.second');
const timeEl = document.querySelector('.time');
const dateEl = document.querySelector('.date');
const toggleEl = document.querySelector('.toggle');

const days = [
  "Sunday", 
  "Monday", 
  "Tuesday", 
  "Wednesday", 
  "Thursday", 
  "Friday", 
  "Saturday"
]

const months = [
  "January", 
  "February", 
  "March", 
  "April", 
  "May", 
  "June", 
  "July", 
  "August", 
  "September", 
  "October", 
  "November", 
  "December"
]

toggleEl.addEventListener('click', (e) => {
  const htmlEl = document.querySelector('html');
  if (htmlEl.classList.contains('dark')) {
    htmlEl.classList.remove('dark');
    htmlEl.classList.add('light');
    e.target.innerText = 'Dark mode';
  } else {
    htmlEl.classList.remove('light');
    htmlEl.classList.add('dark');
    e.target.innerText = 'Light mode';
  }
})

function setTime() {
  const time = new Date();
  const month = time.getMonth();
  const day = time.getDay();
  const hours = time.getHours();
  const hoursHand = hours % 12;
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  const date = time.getDate();
  const year = time.getFullYear();

  // analogue clock
  hourHand.style.transform = `translate(-50%, -100%) rotate(${scale(hoursHand, 0, 11, 0, 360)}deg)`;
  minuteHand.style.transform = `translate(-50%, -100%) rotate(${scale(minutes, 0, 59, 0, 360)}deg)`;
  secondHand.style.transform = `translate(-50%, -100%) rotate(${scale(seconds, 0, 59, 0, 360)}deg)`;

  // digital clock
  timeEl.innerHTML = `${hours}:${minutes < 10 ? `0${minutes}` : `${minutes}`}`
  dateEl.innerHTML = `${days[day]}, <span class="circle">${date}</span> ${months[month]} ${year}`
}

// Stack Overflow Link: https://bit.ly/3StJKJ6
const scale = (num, in_min, in_max, out_min, out_max) => {
  return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

setInterval(() => {
  setTime();
}, 1000);
