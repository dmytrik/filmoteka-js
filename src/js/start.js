const axios = require('axios');

let currentPage = 1;
let totPages = null;
const paginationContainer = document.querySelector('#pagination');
const moviesList = document.querySelector('[data-movies]');
const IMG_REGUEST = 'https://image.tmdb.org/t/p/original';
const API_KEY = '5fe2b2c003e2bf661ee6b8424d931ac2';
const POPULAR_MOVIE_REGUEST =
  'https://api.themoviedb.org/3/trending/movie/week';
const windowWidth = window.innerWidth;

getMovies(currentPage).then(renderMovies);

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
    <img src=${IMG_REGUEST + poster_path} alt=${title} class="film_img"/>
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
  if (windowWidth >= 768) {
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
  }
  if (windowWidth < 768) {
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
  const container = document.querySelector('.films__list');
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
  if (currentPage === 0) {
    return;
  }
  container.innerHTML = '';
  getMovies(currentPage).then(renderMovies);
}
