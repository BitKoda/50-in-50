const counters = document.querySelectorAll('.counter');

counters.forEach(counter => {
  counter.innerHTML = '0'

  const updateCounter = () => {
    // Turn counter from string into integer using '+'
    const target = +counter.getAttribute('data-target');
    const c = +counter.innerHTML;
    const increment = target / 200;

    //console.log({c, target});

    if(c < target) {
      counter.innerHTML = `${Math.ceil(c + increment)}`;

      setTimeout(updateCounter,  1);

    } else {
      counter.innerHTML = target;
    }
  }

  updateCounter();
})
