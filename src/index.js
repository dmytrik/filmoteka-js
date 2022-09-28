const axios = require('axios');

let currentPage = 1
const paginationContainer = document.querySelector("#pagination")
const moviesList = document.querySelector('[data-movies]');
const IMG_REGUEST = 'https://image.tmdb.org/t/p/original';
const API_KEY = '5fe2b2c003e2bf661ee6b8424d931ac2';
const POPULAR_MOVIE_REGUEST =
  'https://api.themoviedb.org/3/trending/movie/week';
getMovies(currentPage).then(renderMovies);

axios
  .get(
    `https://api.themoviedb.org/3/movie/616037?api_key=${API_KEY}&language=en-US`
  )
  .then(console.log);

async function getMovies(currentPage) {
  console.log(currentPage);
  const movies = await axios
    .get(`${POPULAR_MOVIE_REGUEST}?api_key=${API_KEY}&page=${currentPage}`)
    .then(async res => {
      const totalPages = await res.data.total_pages
      pagination(totalPages, currentPage)
      return res.data.results
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

async function pagination(totalPages, currentPage) {
  const page = []
  let numberPage = Number(currentPage) + 7
  if (currentPage < 4) {
    for (let index = 1; index < Number(numberPage) && index < totalPages; index++) {
      page.push(`<a id="${index}">${index}</a>`)
    }
    page.push(`<a id="">...</a><a id="${totalPages}">${totalPages}</a><a class="next"> > </a>`)
  } else {
    page.push(`<a class="back" data-backbtn> < </a><a id="">1</a><a id="">...</a>`)
    for (let index = Number(currentPage - 2); index < Number(numberPage - 4) && index < totalPages; index++) {
      page.push(`<a id="${index}">${index}</a>`)
    }
    page.push(`<a id="">...</a><a id="${totalPages}">${totalPages}</a><a class="next" data-nextBtn> > </a>`)
  }

  paginationContainer.innerHTML = page.join("")
  const activeEl = document.getElementById(`${currentPage}`)
  activeEl.classList.add("active")
}

paginationContainer.addEventListener("click", paginationAdd)

function paginationAdd(e) {
  const container = document.querySelector(".films__list")
  if (e.target.classList.contains("back")) {

    container.innerHTML = ""
    let prevPage = currentPage--
    getMovies(prevPage).then(renderMovies)
    return
  }
  if (e.target.classList.contains("next")) {
    getMovies(currentPage++).then(renderMovies)
    container.innerHTML = ""
    return
  }

  currentPage = Number(e.target.getAttribute("id"))
  container.innerHTML = ""
  getMovies(currentPage).then(renderMovies)
}