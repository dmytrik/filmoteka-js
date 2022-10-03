const axios = require('axios');
import imageURL from '../images/oops.jpg';
import { addEventsOnModalBtn } from './local-storage';
const API_KEY = '5fe2b2c003e2bf661ee6b8424d931ac2';

const IMG_REGUEST = 'https://image.tmdb.org/t/p/w342';
let movieId = null;
const closeModal = document.querySelector('.close-modal');
const moviesList = document.querySelector('[data-movies]');
const modalRef = document.querySelector('.backdrop_modal_film');
const modalConteinerRef = document.querySelector('.modal-conteiner');
const body = document.querySelector('body');
closeModal.addEventListener('click', onCloseModal);
moviesList.addEventListener('click', openModal);
modalRef.addEventListener('click', clickModal);

function clickModal(event) {
  if (event.currentTarget === event.target) {
    onCloseModal();
  }
}

async function getFullMoveInformation(id) {
  const informtionAboutMovie = await axios
    .get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
    )
    .then(response => response.data);
  return informtionAboutMovie;
}

function renderFullInformationAboutMovies(informtionAboutMovie) {
  let watchedText = 'add to watched';
  let queueText = 'add to queue';
  const {
    poster_path,
    title,
    vote_average,
    vote_count,
    popularity,
    original_title,
    genres,
    overview,
    id,
  } = informtionAboutMovie;
  let genresArr = [];
  for (let i = 0; i < genres.length; i += 1) {
    genresArr.push(genres[i].name);
  }
  const genresString = genresArr.join(', ');
  const voteAverageRounding = vote_average.toFixed(1);
  const localStorageWatchedId = JSON.parse(
    localStorage.getItem('STORAGE_KEY_WATCHED')
  );
  if (localStorageWatchedId === null) {
    watchedText = 'add to watched';
  } else if (localStorageWatchedId.some(value => value == id)) {
    watchedText = 'remove from watched';
  }

  const localStorageQueueId = JSON.parse(
    localStorage.getItem('STORAGE_KEY_QUEUE')
  );
  if (localStorageQueueId === null) {
    queueText = 'add to queue';
  } else if (localStorageQueueId.some(value => value == id)) {
    queueText = 'remove from queue';
  }
  //   const markapInformation = `<div class="img-wrap">
  //   <img src="${IMG_REGUEST + poster_path}" alt="${title}" class="img" />
  // </div>
  // <div>
  const markapInformation = `
  <img src=${
    poster_path ? IMG_REGUEST + poster_path : imageURL
  } alt="${title}" class="modal-img" />
<div class="right-wrap">
  <h2 class="modal-title">${title}</h2>
  <div class="general-wrap">
    <div class="name-wrap">
      <p class="name">Vote / Votes</p>
      <p class="name">Popularity</p>
      <p class="name">Original Title</p>
      <p class="name">Genre</p>
    </div>
    <div class="value-wrap">
      <p class='name'><span class='vote_average'>${voteAverageRounding}</span>/<span class='vote_count'>${vote_count}</span></p>
      <p class='value p'>${popularity}</p>
      <p class='value '>${original_title}</p>
      <p class='value '>${genresString}</p>
    </div>
  </div>
  <div class='text-wrap'>
    <p class='about'>About</p>
    <p class='overview'>${overview}</p>
  </div>

  <div class="button-wrap">
    <button type="button" class="btn add-to-watched" data-watched data-id = ${id}>${watchedText}</button>
    <button type="button" class="btn add-to-queue" data-queue data-id = ${id}>${queueText}</button>
  </div>
</div>
`;
  modalConteinerRef.insertAdjacentHTML('afterbegin', markapInformation);
}

function onCloseModal(event) {
  window.removeEventListener('keydown', onEscClose);
  modalRef.classList.add('is-hidden');
  body.classList.remove('no-scroll');
  modalConteinerRef.innerHTML = '';
}

function openModal(event) {
  window.addEventListener('keydown', onEscClose);
  const li = event.target.closest('.films__item');
  body.classList.add('no-scroll');

  if (li === null) {
    return;
  }
  const id = li.attributes[1].value;
  modalRef.classList.remove('is-hidden');
  movieId = id;
  getFullMoveInformation(id)
    .then(renderFullInformationAboutMovies)
    .then(addEventsOnModalBtn);
}

function onEscClose(event) {
  if (event.code === 'Escape') onCloseModal();
}
