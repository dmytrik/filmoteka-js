const axios = require('axios');
const API_KEY = '5fe2b2c003e2bf661ee6b8424d931ac2';
const IMG_REGUEST = 'https://image.tmdb.org/t/p/original';

const myLibraryEl = document.querySelector('.header__list');
const filmListEl = document.querySelector('[data-movies]');

const watchedEl = localStorage.getItem('STORAGE_KEY_WATCHED');
const queueEl = localStorage.getItem('STORAGE_KEY_QUEUE');
let libraryAllEl = '';

checkedLS();

myLibraryEl.addEventListener('click', checkEvent);

function checkEvent(evt) {
  if (evt.target.innerText === 'MY LIBRARY') {
    getId();
  }
}

function getId() {
  libraryAllEl.forEach(element => {
    getElementById(element);
  });
}

async function getElementById(id) {
  const respounse = await axios
    .get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
    )
    .then(respounse => {
      renderMarckup(respounse.data);
    });
}

function renderMarckup(data) {
  const marckup = `<li class="films__item" data-id = ${data.id}>
      <img src=${IMG_REGUEST + data.poster_path} alt=${
    data.title
  } class="film_img"/>
      <p class="film__name">${data.title}</p>
      <p class="film__description">${data.genre} | ${data.release_date.slice(
    0,
    4
  )}</p>
    </li>`;

  filmListEl.innerHTML += marckup;
}

function checkedLS() {
  if (localStorage.length === 0) {
    const marckup = `<span class="film__name">Your library is empty!</span>`;
    filmListEl.innerHTML = marckup;
    return;
  } else if (queueEl === null) {
    libraryAllEl = JSON.parse(watchedEl);
    getId();
  } else if (watchedEl === null) {
    libraryAllEl = JSON.parse(queueEl);
    getId();
  } else {
    libraryAllEl = JSON.parse(watchedEl).concat(JSON.parse(queueEl));
    getId();
  }
}
