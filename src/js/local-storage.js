const modalRef = document.querySelector('.modal_film');

modalRef.addEventListener('click', addFilmIdToLocalStorage);

const STORAGE_KEY_WATCHED = 'watched-films-id';
const STORAGE_KEY_QUEUE = 'queue-films-id';

let watchedLocalStorageIdArr = [];
let queueLocalStorageIdArr = [];

function addFilmIdToLocalStorage(event) {
  event.preventDefault();

  addToWatchedArr(event);

  addQueueArr(event);
}

function addToWatchedArr(event) {
  const id = event.target.dataset.id;
  console.log(event.target.textContent);
  if (event.target.textContent === 'add to watched') {
    if (watchedLocalStorageIdArr.includes(id)) {
      return;
    }
    watchedLocalStorageIdArr.push(id);
    console.log(watchedLocalStorageIdArr);
    changeTextWatchedBtn(event);
    localStorage.setItem(
      'STORAGE_KEY_WATCHED',
      JSON.stringify(watchedLocalStorageIdArr)
    );
  }
}

function addQueueArr(event) {
  const id = event.target.dataset.id;
  if (event.target.textContent === 'add to queue') {
    if (queueLocalStorageIdArr.includes(id)) {
      return;
    }
    addedStyleToQueue(event);
    queueLocalStorageIdArr.push(id);
    localStorage.setItem(
      'STORAGE_KEY_QUEUE',
      JSON.stringify(queueLocalStorageIdArr)
    );
  }
}

function changeTextWatchedBtn(event) {
  event.target.textContent = 'remove from watched';
}

function addedStyleToQueue(event) {
  event.target.textContent = 'remove from queue';
}
