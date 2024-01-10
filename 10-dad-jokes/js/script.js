const jokeEl = document.getElementById('joke');
const jokeBtn = document.getElementById('jokeBtn');

jokeBtn.addEventListener('click', getJoke);

getJoke()

// Using async await
async function getJoke() {
  const url = "https://icanhazdadjoke.com"
  const config = { 
    headers: {
      'Accept': 'application/json'
    },
  }

  /* using async/await */
  const res = await fetch(url, config);
  const data = await res.json();
  jokeEl.innerHTML = data.joke;
}

// Using Promises
//
//function getJoke() {
//  const url = "https://icanhazdadjoke.com"
//  const config = { 
//    headers: {
//      'Accept': 'application/json'
//    },
//  }
//
//  fetch(url, config)
//  .then((res) => res.json())
//  .then((data) => {
//    jokeEl.innerHTML = data.joke
//  })
//}
