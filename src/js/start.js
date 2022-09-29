const axios = require('axios');

import TmdbApiService from './tmdb-api-service';

let currentPage = 1;
let totPages = null;
const container = document.querySelector('.films__list');
const paginationContainer = document.querySelector('#pagination');
const moviesList = document.querySelector('[data-movies]');
const formEl = document.querySelector('.search_form');
const IMG_REGUEST = 'https://image.tmdb.org/t/p/original';
const API_KEY = '5fe2b2c003e2bf661ee6b8424d931ac2';
const POPULAR_MOVIE_REGUEST =
  'https://api.themoviedb.org/3/trending/movie/week';

const tmdbApiService = new TmdbApiService();

getMovies(currentPage).then(renderMovies);

formEl.addEventListener('submit', createMovieGallery);

async function getMovies(currentPage) {
  const movies = await axios
    .get(`${POPULAR_MOVIE_REGUEST}?api_key=${API_KEY}&page=${currentPage}`)
    .then(async res => {
      const totalPages = await res.data.total_pages;
      pagination(totalPages, currentPage);
      return res.data.results;
    });
  const dataMovies = [];
  for (const { id } of movies) {
    const dataMovie = await axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
      )
      .then(res => res.data);
    dataMovies.push(dataMovie);
  }
  return dataMovies;
}

function renderMovies(movies) {
  const moviesHtml = movies
    .map(({ poster_path, release_date, title, genres, id }) => {
      const genre = genres.map(({ name }) => name).join(', ');
      return `<li class="films__item" data-id = ${id}>
    <img src=${IMG_REGUEST + poster_path} alt=${title} />
    <p class="film__name">${title}</p>
    <p class="film__description">${genre} | ${release_date.slice(0, 4)}</p>
  </li>`;
    })
    .join('');
  moviesList.innerHTML = moviesHtml;
}

function pagination(totalPages, currentPage) {
  totPages = totalPages;
  const page = [];
  let numberPage = Number(currentPage) + 7;
  if (currentPage < 4) {
    page.push('<a class="back pagination__arrow pagination__arrow_prev" >');
    for (
      let index = 1;
      index < Number(numberPage) && index < totalPages;
      index++
    ) {
      page.push(`<a id="${index}">${index}</a>`);
    }
    page.push(
      `<a id="">...</a><a id="${totalPages}">${totalPages}</a><a class="next pagination__arrow pagination__arrow_next"></a>`
    );
  } else {
    page.push(
      `<a class="back pagination__arrow pagination__arrow_prev" ></a><a id="1">1</a><a id="">...</a>`
    );
    for (
      let index = Number(currentPage - 2);
      index < Number(numberPage - 4) && index < totalPages;
      index++
    ) {
      page.push(`<a id="${index}">${index}</a>`);
    }
    page.push(
      `<a id="">...</a><a id="${totalPages}">${totalPages}</a><a class="next pagination__arrow pagination__arrow_next"></a>`
    );
  }

  paginationContainer.innerHTML = page.join('');
  const activeEl = document.getElementById(`${currentPage}`);
  activeEl.classList.add('active');
}

paginationContainer.addEventListener('click', paginationAdd);

function paginationAdd(e) {
  if (e.target.classList.contains('back')) {
    currentPage -= 1;
    if (currentPage < 1) {
      // currentPage = 1;
      return;
    }
    container.innerHTML = '';
    getMovies(currentPage).then(renderMovies);
    return;
  }
  if (e.target.classList.contains('next')) {
    currentPage += 1;
    if (currentPage > totPages) {
      // currentPage = totPages;
      return;
    }
    container.innerHTML = '';
    getMovies(currentPage).then(renderMovies);
    return;
  }

  currentPage = Number(e.target.getAttribute('id'));
  container.innerHTML = '';
  getMovies(currentPage).then(renderMovies);
}

async function createMovieGallery(e) {
  e.preventDefault();
  const searshQuery = e.currentTarget.elements.searshQuery.value.trim();
  if (!searshQuery) {
    return alert('please enter something');
  }
  tmdbApiService.query = searshQuery;
  tmdbApiService.resetPage();
  rendeNewPage();
  paginationContainer.addEventListener('click', onChangePage);
}

function onClearPage() {
  container.innerHTML = '';
  paginationContainer.innerHTML = '';
}

function rendeNewPage() {
  tmdbApiService.fetchMovie().then(response => {
    onClearPage();
    const totalPages = response.data.total_pages;
    pagination(totalPages, tmdbApiService.getpage());
    const movies = response.data.results;
    fetchSearshedQuery(movies);
  });
}

async function fetchSearshedQuery(movies) {
  const dataMovies = [];
  for (const { id } of movies) {
    const dataMovie = await axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
      )
      .then(res => res.data);
    dataMovies.push(dataMovie);
  }
  renderMovies(dataMovies);
}

function onChangePage(e) {
  if (e.target.classList.contains('back')) {
    tmdbApiService.decrementPage();
    console.log(tmdbApiService.getpage());
    if (tmdbApiService.getpage() < 1) {
      return;
    }
    rendeNewPage();
    return;
  }
  if (e.target.classList.contains('next')) {
    tmdbApiService.incrementPage();
    if (tmdbApiService.getpage() > totPages) {
      return;
    }
    rendeNewPage();
    return;
  }

  tmdbApiService.setPage(Number(e.target.getAttribute('id')));
  rendeNewPage();
}
