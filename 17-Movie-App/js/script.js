const BASE_URL = 'https://api.themoviedb.org/3/'
const DISCOVER = 'discover/movie'
const SORT_ORDER = '?sort_by=popularity.desc'
const API_KEY = '&api_key=2dba80bdc6afe446e856bcf71a6140ef'
const NUM_PAGES = '&page=1'
const APPEND_TO_RES = '&append_to_response=release_dates'
// Image path
const IMG_PATH = "https://image.tmdb.org/t/p/w500"

// Routes
const MOVIES_URL = BASE_URL + DISCOVER + SORT_ORDER + API_KEY + NUM_PAGES
const SEARCH_URL = BASE_URL + "search/movie?" + API_KEY + "&query=''"

// Grab DOM elements
const form = document.getElementById('form')
const header = document.getElementById('header')
const main = document.getElementById('main')

// Get all movies
getMovies(MOVIES_URL)

async function getMovies(url) {
  const res = await fetch(url)
  const data = await res.json()
  showMovies(data.results)
}

// Get one movie
async function getMovie(movie_id) {
  const url = BASE_URL + `movie/${movie_id}?language=en-US` + API_KEY + APPEND_TO_RES 
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
    const { id, overview, poster_path, title, vote_average } = movie;

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
  const { backdrop_path, 
    genres, 
    homepage, 
    overview, 
    poster_path, 
    release_date, 
    release_dates,
    runtime,
    title, 
  } = movie;
 
  // Scroll to top of page, so header and back button
  // can be seen
  window.scrollTo(0,0);

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

  // Convert runtime into hours and mins
  const hrs = (Math.floor(runtime / 60)).toString() 
  const mins = (runtime % 60).toString();
  const hrs_mins = hrs + 'h ' + mins + 'm';

  // Get genre names
  const genre_names = []
  genres.forEach((genre) => {
    genre_names.push(genre.name)
  })

  //const cert = release_dates.results[20].release_dates[0].certification
  
  // clear the main div and attach new id 
  main.innerHTML = '';
  document.getElementById('main').id = 'single-movie'

  main.innerHTML = `
    <div class="images">    
      <img class="backdrop" src="${IMG_PATH + backdrop_path}" alt="backdrop picture">
      <img class="poster" src="${IMG_PATH + poster_path}" alt="${title}">
    </div>
    <div class="movie-details"> 
      <h1>
        ${title}
        <span>15</span>
      </h1>
      <span>${release_date} &bull; (GB) &bull; ${genre_names} &bull; ${hrs_mins} </spna>
      <p>Visit: <a href="${homepage}">${title} Movie</a></p>
      <h3>Overview</h3>
      ${overview}
    </div>`
}
