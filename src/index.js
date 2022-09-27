const axios = require('axios');

const moviesList = document.querySelector('[data-movies]');
const IMG_REGUEST = 'https://image.tmdb.org/t/p/original';
const API_KEY = '5fe2b2c003e2bf661ee6b8424d931ac2';
const POPULAR_MOVIE_REGUEST =
  'https://api.themoviedb.org/3/trending/movie/week';
getMovies().then(renderMovies);

axios
  .get(
    `https://api.themoviedb.org/3/movie/616037?api_key=${API_KEY}&language=en-US`
  )
  .then(console.log);

async function getMovies() {
  const movies = await axios
    .get(`${POPULAR_MOVIE_REGUEST}?api_key=${API_KEY}&page=1`)
    .then(res => res.data.results);
  return movies;
}

function renderMovies(movies) {
  console.log(movies);
  const moviesHtml = movies
    .map(
      ({ poster_path, release_date, title }) => `<li class="films__item">
  <img src=${IMG_REGUEST + poster_path} alt=${title} />
  <p class="film__name">${title}</p>
  <p class="film__description">Drama, Action | ${release_date}</p>
</li>`
    )
    .join('');
  moviesList.innerHTML = moviesHtml;
}
