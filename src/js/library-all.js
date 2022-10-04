const axios = require('axios');
import imageURL from '../images/oops.jpg';
const API_KEY = '5fe2b2c003e2bf661ee6b8424d931ac2';
const IMG_REGUEST = 'https://image.tmdb.org/t/p/w500';

const myLibraryEl = document.querySelector('.header__list');
const filmListEl = document.querySelector('[data-movies]');

const closeBtn = document.querySelector('.close-library-modal');
const backdropEl = document.querySelector('.library-backdrop');
const playerEl = document.querySelector('.library-modal-trailer');
const linkBox = document.querySelector('#modal-div-link');
const libraryRemoveBtn = document.querySelector('.library-modal-btn');

let watchedEl = localStorage.getItem('STORAGE_KEY_WATCHED');

let queueEl = localStorage.getItem('STORAGE_KEY_QUEUE');

let libraryAllEl = '';
checkedLS();

myLibraryEl.addEventListener('click', checkEventLibrary);
filmListEl.addEventListener('click', checkEventModal);
closeBtn.addEventListener('click', closeModal);

libraryRemoveBtn.addEventListener('click', deleteFromLibraryAndLS);

function checkedLS() {
  filmListEl.innerHTML = '';
  if (
    (queueEl === null && watchedEl === null) ||
    (queueEl === '[]' && watchedEl === '[]') ||
    (queueEl === null && watchedEl === '[]') ||
    (queueEl === '[]' && watchedEl === null)
  ) {
    const marckup = `<div class="library__empty-container"><div class="library__empty"><div class="left__eye"></div><div class="right__eye"></div></div><p class="library__text-white">Your library is <span class="library__text-red">empty!</span></p></div>`;
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

function checkEventLibrary(evt) {
  if (evt.target.innerText === 'MY LIBRARY') {
    getId();
  }
}

function getId() {
  // if (libraryAllEl.length === 0) {
  //   return;
  // }
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
  const genres = data.genres.map(el => el.name);
  const marckup = `<li class="films__item" data-id = ${data.id}>
      <img src=${
        data.poster_path ? IMG_REGUEST + data.poster_path : imageURL
      } alt=${data.title} class="film_img"/>
      <p class="film__name">${data.title}</p>
      <p class="film__description">${genres} | ${data.release_date.slice(
    0,
    4
  )}</p>
    </li>`;

  filmListEl.innerHTML += marckup;
}

function checkEventModal(evt) {
  const target = evt.target.closest('.films__item');
  if (target) {
    const idAttribute = target.getAttribute('data-id');
    openModal();
    renderModalLink(idAttribute);
    getVideoUrlAndRenderPlayer(idAttribute);
    chekModalBtn(idAttribute);
  } else {
    return;
  }
}

function openModal() {
  libraryRemoveBtn.disabled = false;
  backdropEl.classList.remove('library-backdrop-is-hiden');
  window.addEventListener('keydown', closeModal);
  backdropEl.addEventListener('click', closeModal);
}

function closeModal(e) {
  if (
    e.target.classList.contains('library-backdrop') ||
    e.code === 'Escape' ||
    e.target.classList.contains('close-library-modal') ||
    e.target.classList.contains('library-modal-img')
  ) {
    backdropEl.classList.add('library-backdrop-is-hiden');
    playerEl.innerHTML = '';
    window.removeEventListener('keydown', closeModal);
    backdropEl.removeEventListener('click', closeModal);
    console.clear();
  }
}

async function getVideoUrlAndRenderPlayer(movie) {
  const data = await axios
    .get(
      `https://api.themoviedb.org/3/movie/${movie}/videos?api_key=${API_KEY}&language=en-US`
    )
    .then(results => {
      if (results.data.results.length === 0) {
        playerEl.innerHTML = `<div class = "library-modal-iframe" data-id = ${movie}></div>`;
        return;
      }
      return results.data.results.map(el => {
        if (el.site === 'YouTube') {
          const marcup = `<iframe class="library-modal-iframe" data-id = "${movie}" 
   src="https://www.youtube.com/embed/${el.key}?&autoplay=1"
   frameborder="0" allowfullscreen></iframe>`;
          playerEl.innerHTML = marcup;
        }
      });
    });
}

async function renderModalLink(movie) {
  const respounse = await axios
    .get(
      `https://api.themoviedb.org/3/movie/${movie}?api_key=${API_KEY}&language=en-US`
    )
    .then(respounse => {
      const homepage = respounse.data.homepage;
      return homepage;
    })
    .then(homepage => {
      if (homepage === '') {
        linkBox.innerHTML = '';
      } else {
        const marckup = `<a href="${homepage}" rel=" noopener noreferrer nofollow " target = "blank" class="library-modal-link">NETFLIX</a>`;
        linkBox.innerHTML = marckup;
      }
    });
}

function chekModalBtn(id) {
  if (watchedEl.includes(id)) {
    libraryRemoveBtn.innerText = 'REMOVE FROM WATCHED';
  } else {
    libraryRemoveBtn.innerText = 'REMOVE FROM QUEUE';
  }
}

function deleteFromLibraryAndLS(evt) {
  evt.currentTarget.disabled = true;
  const element = backdropEl.querySelector('.library-modal-iframe');
  const idAttribute = element.getAttribute('data-id');
  const findEl = document.querySelector(`[data-id="${idAttribute}"]`);
  findEl.remove();

  if (watchedEl.includes(idAttribute)) {
    const watchEl = localStorage.getItem('STORAGE_KEY_WATCHED');
    const arraysWatchId = JSON.parse(watchEl);
    const newWatchArrId = arraysWatchId.filter(item => item !== idAttribute);
    const newWatchedString = JSON.stringify(newWatchArrId);
    localStorage.removeItem('STORAGE_KEY_WATCHED');
    localStorage.setItem('STORAGE_KEY_WATCHED', newWatchedString);
    // location.reload();
    closeModal();
    // checkedLS();
  } else {
    const queEl = localStorage.getItem('STORAGE_KEY_QUEUE');
    const arraysQueId = JSON.parse(queEl);
    const newQueArrId = arraysQueId.filter(item => item !== idAttribute);
    const newQueueString = JSON.stringify(newQueArrId);
    localStorage.removeItem('STORAGE_KEY_QUEUE');
    localStorage.setItem('STORAGE_KEY_QUEUE', newQueueString);
    // location.reload();
    closeModal();
    // checkedLS();
  }
}
