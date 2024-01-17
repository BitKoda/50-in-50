const BASE_URL = 'https://api.themoviedb.org/3/'
const DISCOVER = 'discover/movie'
const SORT_ORDER = '?sort_by=popularity.desc'
const API_KEY = '&api_key=2dba80bdc6afe446e856bcf71a6140ef'
const NUM_PAGES = '&page=1'
// Image path
const IMG_PATH = "https://image.tmdb.org/t/p/w500"


// 753342?language=en-US 


// Routes
const MOVIES_URL = BASE_URL + DISCOVER + SORT_ORDER + API_KEY + NUM_PAGES
const SEARCH_URL = "https://api.themoviedb.org/3/search/movie?api_key=2dba80bdc6afe446e856bcf71a6140ef&query=''"

// Grab DOM elements
const form = document.getElementById('form')
const header = document.getElementById('header')

// Get initial movies
getMovies(MOVIES_URL)

async function getMovies(url) {
  const res = await fetch(url)
  const data = await res.json()
  showMovies(data.results)
}

// Get a movie

async function getMovie(movie_id) {
  const url = BASE_URL + `movie/${movie_id}?language=en-US` + API_KEY 
  const res = await fetch(url)
  const data = await res.json()

  showMovie(data)
}

// Search movies
form.addEventListener('submit', (e) => {
  e.preventDefault()

  const searchTerm = search.value

  if(searchTerm && searchTerm != '') {
    getMovies(SEARCH_URL + searchTerm)
    search.value = ''
  } else {
    window.location.reload();
  }
})

// showMovies
function showMovies(movies) {
  main.innerHTML = '';
  movies.forEach((movie) => {
    const { id, original_title, title, poster_path, vote_average, overview } = movie;

    const movie_url = getMoviePageUrl(original_title, id);

    let votes_rounded = Math.round(vote_average * 10) / 10;

    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');

    movieEl.innerHTML = `
      <img src="${IMG_PATH + poster_path}" alt="${title}">
      <div class="movie-info">
        <h3>${title}</h3>
          <span class="${voteClass(votes_rounded)}">${votes_rounded}</span>
      </div>
      <div class="overview">
        <h3>Overview</h3>
        ${overview}
      </div>`

      main.appendChild(movieEl)
      movieEl.addEventListener(('click'), () => {
        getMovie(id)
    })
  })
}

// Colour coding for average votes
function voteClass(vote_average) {
  if(vote_average > 7.9) {
    return 'green'
  } else if (vote_average < 5) {
    return 'red'
  } else {
    return 'orange'
  }
}

// generate movie show page url
function getMoviePageUrl(title, movie_id) {
  const sanitizedTitle = title.replace(/[\W_]+/g, "-").toLowerCase();
  return `${movie_id + '-' + sanitizedTitle}`
}

function showMovie(movie) {

  const { title, genres, poster_path, backdrop_path, vote_average, overview } = movie;
  
  // remove search and replace with 'back' button
  form.remove('form');
  const backButton = document.createElement("a");
  backButton.innerText = '< Back'
  backButton.href = "#"
  backButton.classList.add('back_btn')
  header.appendChild(backButton)
  backButton.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.reload();
  });

  // Get genre names
  genres.forEach((genre) => {
    console.log(genre.name) 
  })

  // clear the main div and append movie info
  main.innerHTML = '';
  
  //let votes_rounded = Math.round(vote_average * 10) / 10;

  const movieEl = document.createElement('div');
  movieEl.classList.add('single-movie-info');

  movieEl.innerHTML = `
    <img src="${IMG_PATH + backdrop_path}" alt="backdrop picture">
    <img src="${IMG_PATH + poster_path}" alt="${title}">

      <h1>${movie.title}</h1>
      <p>${genres[0].name}</p>
      <h3>Overview</h3>
      ${overview}
    </div>`

    main.appendChild(movieEl)
}
