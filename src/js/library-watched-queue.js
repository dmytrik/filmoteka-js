const axios = require('axios');
const API_KEY = '5fe2b2c003e2bf661ee6b8424d931ac2';
const IMG_REGUEST = 'https://image.tmdb.org/t/p/w342';

const btnWatched = document.querySelector('.header__library-button-watch');
const btnQueue = document.querySelector('.header__library-button-queue');
const moviesList = document.querySelector('[data-movies]');
let parseFilm = [];

btnWatched.addEventListener('click', onLoadWatched);
btnQueue.addEventListener('click', onLoadQueue);

function onLoadWatched() {
  btnWatched.classList.add('btn-color-change');
  btnQueue.classList.remove('btn-color-change');
  moviesList.innerHTML = '';
  const filmsWatched = localStorage.getItem('STORAGE_KEY_WATCHED');
  parseFilm = JSON.parse(filmsWatched);

  if (!filmsWatched) {
    const marckup = `<span class="film__name">Your watched is empty!</span>`;
    moviesList.innerHTML = marckup;
    return;
  }
  getId();
}

function onLoadQueue() {
  btnQueue.classList.add('btn-color-change');
  btnWatched.classList.remove('btn-color-change');
  moviesList.innerHTML = '';
  const filmsQueue = localStorage.getItem('STORAGE_KEY_QUEUE');
  parseFilm = JSON.parse(filmsQueue);

  if (!filmsQueue) {
    const marckup = `<span class="film__name">Your queue is empty!</span>`;
    moviesList.innerHTML = marckup;
    return;
  }

  getId();
}

function getId() {
  parseFilm.forEach(element => {
    getElementById(element);
  });
}

async function getElementById(id) {
  const respounse = await axios
    .get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
    )
    .then(respounse => {
      renderMovies(respounse.data);
    });
}

function renderMovies(data) {
  const genre = data.genres.map(el => el.name).join(', ');
  const marckup = `<li class="films__item" data-id = ${data.id}>
      <img src=${IMG_REGUEST + data.poster_path} alt=${
    data.title
  } class="film_img"/>
      <p class="film__name">${data.title}</p>
      <p class="film__description">${genre} | ${data.release_date.slice(
    0,
    4
  )}</p>
    </li>`;
  moviesList.insertAdjacentHTML('beforeend', marckup);
}
