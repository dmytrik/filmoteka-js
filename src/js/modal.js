const axios = require('axios');

const API_KEY = '5fe2b2c003e2bf661ee6b8424d931ac2';
const IMG_REGUEST = 'https://image.tmdb.org/t/p/original';

const closeModal = document.querySelector('.close-modal');
const moviesList = document.querySelector('[data-movies]');
const modalRef = document.querySelector('.modal');
const modalConteinerRef = document.querySelector('.modal-conteiner');

closeModal.addEventListener('click', onCloseModal);
moviesList.addEventListener('click', openModal);

async function getFullMoveInformation(id) {
  const informtionAboutMovie = await axios
    .get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
    )
    .then(response => response.data);
  return informtionAboutMovie;
}

function renderFullInformationAboutMovies(informtionAboutMovie) {
  console.log('=>', informtionAboutMovie);
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
  // console.log(genres);
  let genresArr = [];
  for (let i = 0; i < genres.length; i += 1) {
    // console.log(genres[i].name);

    genresArr.push(genres[i].name);
  }
  // console.log(genresArr.join(', '));
  const genresString = genresArr.join(', ');
  const voteAverageRounding = vote_average.toFixed(1);
  const markapInformation = `<div class="img-wrap">
  <img src="${IMG_REGUEST + poster_path}" alt="${title}" calss="img" />
</div>
<div>
  <h2 class="modal-title">${title}</h2>
  <div class="general-wrap">
    <div class="name-wrap">
      <p class="name">Vote / Votes</p>
      <p class="name">Popularity</p>
      <p class="name">Original Title</p>
      <p class="name">Genre</p>
    </div>
    <div class="value-wrap">
      <p class='name'><span class='vote_average'>${voteAverageRounding}</span>/<span class='vote_count'>${vote_count}</sapan></p>
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
    <button type="button" class="btn add-to-watched" data-watched data-id = ${id}>add to watched</button>
    <button type="button" class="btn add-to-queue" data-queue data-id = ${id}>add to queue</button>
  </div>
</div>
`;
  modalConteinerRef.insertAdjacentHTML('afterbegin', markapInformation);
}

function onCloseModal(event) {
  event.preventDefault();
  modalRef.classList.add('is-hidden');
  modalConteinerRef.innerHTML = '';
}

function openModal(event) {
  const l = event.target.closest('.films__item');
  // console.log('===', l);

  if (l === null) {
    return;
  }
  const id = l.attributes[1].value;
  // console.log(l.attributes[1].value);
  modalRef.classList.remove('is-hidden');
  getFullMoveInformation(id).then(renderFullInformationAboutMovies);

  // console.log('open', event.target);
}
