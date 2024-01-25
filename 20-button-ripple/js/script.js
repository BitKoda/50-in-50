const btn = document.querySelectorAll('.ripple');

btn.forEach((btn) => {
  btn.addEventListener('click', function (e) {

    // get click co-ordinates in the viewport 
    const x = e.clientX;
    const y = e.clientY;
    
    // get position of button
    const btnTop = e.target.offsetTop;
    const btnLeft = e.target.offsetLeft;

    // calculate co-ordinates of a click within the
    // button element
    const btnX = x - btnLeft;
    const btnY = y - btnTop;

    // create a span element and add the circle class
    const circle = document.createElement('span');
    circle.classList.add('circle');
    circle.style.top = btnY + 'px';
    circle.style.left = btnX + 'px';

    // add the span tag with circle class to the
    // button element (this)
    this.appendChild(circle);

    // remove the span tag from the DOM
    setTimeout(() => circle.remove(), 500);
  })
})
