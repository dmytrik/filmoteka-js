const axios = require('axios');
import imageURL from '../images/oops.jpg';
import TmdbApiService from './tmdb-api-service';

let isTizenPag = true;
let currentPage = 1;
let totPages = null;
let isFilter = null;
const container = document.querySelector('.films__list');
const paginationContainer = document.querySelector('#pagination');
const moviesList = document.querySelector('[data-movies]');
const formEl = document.querySelector('.search_form');
const formInput = document.querySelector('.search');
const warning = document.querySelector('.search_warning');
const IMG_REGUEST = 'https://image.tmdb.org/t/p/w342';
const API_KEY = '5fe2b2c003e2bf661ee6b8424d931ac2';
const POPULAR_MOVIE_REGUEST =
  'https://api.themoviedb.org/3/trending/movie/week';
const windowWidth = window.innerWidth;
const tmdbApiService = new TmdbApiService();

getMovies(currentPage).then(renderMovies);

formEl.addEventListener('submit', createMovieGallery);
document.querySelector('.form-filter-reset').addEventListener('submit', e => {
  e.preventDefault();
  warning.textContent = '';
  if (!isTizenPag) {
    paginationContainer.addEventListener('click', paginationAdd);
    paginationContainer.removeEventListener('click', onChangePage);
  }
  isFilter = false;
  currentPage = 1;
  getMovies(currentPage).then(renderMovies);
  const loader = document.querySelector('.loader');
  loader.classList.remove('loader__hidden');
});
document.getElementById('filter-form').addEventListener('change', e => {
  isFilter = true;
  warning.textContent = '';
  if (!isTizenPag) {
    paginationContainer.addEventListener('click', paginationAdd);
    paginationContainer.removeEventListener('click', onChangePage);
  }
  currentPage = 1;
  getMovies(currentPage).then(renderMovies);
  const loader = document.querySelector('.loader');
  loader.classList.remove('loader__hidden');
});
function getFilteredData(currentPage) {
  const year = document.getElementById('year');
  const sortBy = document.getElementById('sort-by');
  const genre = document.getElementById('genre');
  if (genre.value === '' && sortBy.value === '' && year.value === '') {
    isFilter = false;
    currentPage = 1;
    getMovies(currentPage).then(renderMovies);
    return;
  }
  return `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genre.value}&primary_release_year=${year.value}&sort_by=${sortBy.value}&language=en-US&page=${currentPage}`;
}

async function getMovies(currentPage) {
  const movies = await axios
    .get(
      `${
        isFilter
          ? getFilteredData(currentPage)
          : `${POPULAR_MOVIE_REGUEST}?api_key=${API_KEY}&page=${currentPage}`
      }`
    )
    .then(async res => {
      const checkData = await res.data;
      if (typeof checkData === 'string') {
        return;
      }
      const genres = await axios
        .get(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
        )
        .then(res => res.data.genres);
      const movies = {
        genres,
        movies: await res.data.results,
      };
      const totalPages = await res.data.total_pages;
      pagination(totalPages, currentPage);

      const loader = document.querySelector('.loader');
      loader.classList.add('loader__hidden');

      // return res.data.results;
      return movies;
    });

  return movies;
}

function renderMovies(moviesObj) {
  if (!moviesObj) {
    return;
  }
  const { genres, movies } = moviesObj;
  const moviesHtml = movies
    .map(({ poster_path, release_date, title, genre_ids, id }) => {
      const genre = genres
        .reduce((acc, el) => {
          const { id, name } = el;
          for (const idFilm of genre_ids) {
            if (id === idFilm) {
              acc.push(name);
            }
          }
          return acc;
        }, [])
        .join(', ');

      return `<li class="films__item" data-id = ${id}>
    <img src=${
      poster_path ? IMG_REGUEST + poster_path : imageURL
    } alt=${title} class="film_img dark-theme" loading="lazy"/>
    <p class="film__name">${title}</p>
    <p class="film__description">${genre} | ${
        release_date ? release_date.slice(0, 4) : '2022'
      }</p>
  </li>`;
    })
    .join('');
  moviesList.innerHTML = moviesHtml;
}

function pagination(totalPages, currentPage) {
  totPages = totalPages;
  const page = [];
  if (windowWidth >= 768) {
    let numberPage = Number(currentPage) + 7;
    if (totalPages <= 8) {
      for (let i = 1; i <= totalPages; i += 1) {
        page.push(`<a id="${i}">${i}</a>`);
      }
    } else if (currentPage < 4) {
      // console.log(push);
      page.push('<a class="back pagination__arrow pagination__arrow_prev" >');
      for (
        let index = 1;
        index < Number(numberPage) && index < totalPages;
        index++
      ) {
        page.push(`<a id="${index}">${index}</a>`);
      }
      page.push(
        `<a id="" class ='no-click'>...</a><a id="${totalPages}">${totalPages}</a><a class="next pagination__arrow pagination__arrow_next"></a>`
      );
    } else {
      page.push(
        `<a class="back pagination__arrow pagination__arrow_prev" ></a><a id="1">1</a><a id="" class ='no-click'>...</a>`
      );
      for (
        let index = Number(currentPage - 2);
        index < Number(numberPage - 4) && index < totalPages;
        index++
      ) {
        page.push(`<a id="${index}">${index}</a>`);
      }
      page.push(
        `<a id="" class ='no-click'>...</a><a id="${totalPages}">${totalPages}</a><a class="next pagination__arrow pagination__arrow_next"></a>`
      );
    }
  }
  if (windowWidth < 768) {
    if (totPages <= 5) {
      for (let i = 1; i <= totPages; i += 1) {
        page.push(`<a id="${i}">${i}</a>`);
      }
      paginationContainer.innerHTML = page.join('');
      const activeEl = document.getElementById(`${currentPage}`);
      activeEl.classList.add('active');
      return;
    }
    page.push('<a class="back pagination__arrow pagination__arrow_prev" >');
    if (currentPage <= 3) {
      for (let i = 1; i <= 5; i += 1) {
        page.push(`<a id="${i}">${i}</a>`);
      }
    }
    if (3 < currentPage && currentPage < totPages - 2) {
      for (let i = currentPage - 2; i <= currentPage + 2; i += 1) {
        page.push(`<a id="${i}">${i}</a>`);
      }
    }
    if (currentPage === totPages - 2) {
      for (let i = currentPage - 2; i <= totPages; i += 1) {
        page.push(`<a id="${i}">${i}</a>`);
      }
    }

    page.push('<a class="next pagination__arrow pagination__arrow_next"></a>');
  }

  paginationContainer.innerHTML = page.join('');
  const activeEl = document.getElementById(`${currentPage}`);
  activeEl.classList.add('active');
}

paginationContainer.addEventListener('click', paginationAdd);

function paginationAdd(e) {
  const warning = document.querySelector('.search_warning');
  formInput.value = '';
  warning.innerHTML = '';
  if (e.target.classList.contains('back')) {
    currentPage -= 1;
    if (currentPage < 1) {
      // currentPage = 1;
      return;
    }
    container.innerHTML = '';
    const loader = document.querySelector('.loader');
    loader.classList.remove('loader__hidden');
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
    const loader = document.querySelector('.loader');
    loader.classList.remove('loader__hidden');
    getMovies(currentPage).then(renderMovies);

    return;
  }

  currentPage = Number(e.target.getAttribute('id'));
  if (currentPage === 0) {
    return;
  }
  container.innerHTML = '';
  const loader = document.querySelector('.loader');
  loader.classList.toggle('loader__hidden');
  getMovies(currentPage).then(renderMovies);
}

function createMovieGallery(e) {
  e.preventDefault();
  const loader = document.querySelector('.loader');
  loader.classList.remove('loader__hidden');
  const searshQuery = e.currentTarget.elements.searshQuery.value.trim();
  if (!searshQuery) {
    warning.textContent =
      'Search result not successful. Enter the correct movie name';
    loader.classList.add('loader__hidden');
    return;
  }
  tmdbApiService.query = searshQuery;
  tmdbApiService.resetPage();
  rendeNewPage();
  isTizenPag = false;
}

function onClearPage() {
  container.innerHTML = '';
  paginationContainer.innerHTML = '';
}

function rendeNewPage() {
  tmdbApiService.fetchMovie().then(response => {
    const loader = document.querySelector('.loader');
    loader.classList.add('loader__hidden');
    if (response.data.results.length === 0) {
      paginationContainer.addEventListener('click', paginationAdd);
      paginationContainer.removeEventListener('click', onChangePage);
      const warning = document.querySelector('.search_warning');
      formInput.value = '';
      onClearPage();
      warning.textContent =
        'Search result not successful. Enter the correct movie name';

      return;
    }
    if (isTizenPag) {
      paginationContainer.addEventListener('click', paginationAdd);
      paginationContainer.removeEventListener('click', onChangePage);
    } else {
      paginationContainer.removeEventListener('click', paginationAdd);
      paginationContainer.addEventListener('click', onChangePage);
    }
    formInput.value = '';
    const warning = document.querySelector('.search_warning');
    warning.innerHTML = '';
    onClearPage();
    const totPages = response.data.total_pages;
    pagination(totPages, tmdbApiService.getpage());
    const movies = response.data.results;
    fetchSearshedQuery(movies);
  });
}

async function fetchSearshedQuery(movies) {
  const genres = await axios
    .get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
    )
    .then(res => res.data.genres);
  const moviesData = {
    genres,
    movies,
  };
  renderMovies(moviesData);
}

function onChangePage(e) {
  formInput.value = '';
  warning.innerHTML = '';
  if (e.target.classList.contains('no-click')) {
    return;
  }
  if (e.target.classList.contains('back')) {
    const loader = document.querySelector('.loader');
    loader.classList.remove('loader__hidden');
    console.log(tmdbApiService.getpage());
    tmdbApiService.decrementPage();
    if (tmdbApiService.getpage() < 1) {
      tmdbApiService.setPage(1);
      return;
    }
    rendeNewPage();
    // const loader = document.querySelector('.loader');
    // loader.classList.toggle('loader__hidden');
    return;
  }
  if (e.target.classList.contains('next')) {
    const loader = document.querySelector('.loader');
    loader.classList.remove('loader__hidden');
    tmdbApiService.incrementPage();
    if (tmdbApiService.getpage() > totPages) {
      tmdbApiService.setPage(totPages);
      return;
    }
    rendeNewPage();
    // const loader = document.querySelector('.loader');
    // loader.classList.toggle('loader__hidden');
    return;
  }

  tmdbApiService.setPage(Number(e.target.getAttribute('id')));
  rendeNewPage();
  const loader = document.querySelector('.loader');
  loader.classList.remove('loader__hidden');
}
