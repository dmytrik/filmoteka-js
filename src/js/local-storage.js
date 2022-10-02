let watchedBtn;
let queueBtn;

function addEventsOnModalBtn() {
  watchedBtn = document.querySelector('.add-to-watched');
  queueBtn = document.querySelector('.add-to-queue');
  watchedBtn.addEventListener('click', addToWatched);
  queueBtn.addEventListener('click', addToQueue);
  watchedBtn.addEventListener('click', removeFromWatched);
  queueBtn.addEventListener('click', removeFromQueue);
}
export { addEventsOnModalBtn };
    
export const STORAGE_KEY_WATCHED = 'watched-films-id';
export const STORAGE_KEY_QUEUE = 'queue-films-id';



function addToWatched(event) {
    const id = event.target.dataset.id;
    if (watchedBtn.textContent === 'add to watched') {
        jsonLocalStorage("STORAGE_KEY_WATCHED", id);
        event.target.textContent = 'remove from watched';
        watchedBtn.removeEventListener('click', removeFromWatched);
    }
    if (watchedBtn.textContent === 'remove from watched') {
        watchedBtn.addEventListener('click', removeFromWatched);
        removeFromQueue(event);
    }
}

function removeFromWatched(event) {
    const id = event.target.dataset.id;
    removeFromStorage("STORAGE_KEY_WATCHED", id);
    watchedBtn.textContent = 'add to watched';
    watchedBtn.removeEventListener('click', removeFromWatched);
}

function addToQueue(event) {
    const id = event.target.dataset.id;
    if (queueBtn.textContent === 'add to queue') {
        jsonLocalStorage("STORAGE_KEY_QUEUE", id);
        event.target.textContent = 'remove from queue';
        queueBtn.removeEventListener('click', removeFromQueue);
    }
    if (queueBtn.textContent === 'remove from queue') {
        queueBtn.addEventListener('click', removeFromQueue);
        removeFromWatched(event);
    } 
}

function removeFromQueue(event) {
    const id = event.target.dataset.id;
    removeFromStorage("STORAGE_KEY_QUEUE", id);
    queueBtn.textContent = 'add to queue';
    queueBtn.removeEventListener('click', removeFromQueue);
}

function removeFromStorage(value, id) {
    const arr = JSON.parse(localStorage.getItem(value));
    if (arr === null) {
        return
    }
    // console.log(arr);
    const newArray = arr.filter(film => film !== id);
    localStorage.setItem(value, JSON.stringify(newArray));
}

function jsonLocalStorage(value , id) {
  const oldItems = JSON.parse(localStorage.getItem(value)) || [];
    
  oldItems.push(id);

  localStorage.setItem(value, JSON.stringify(oldItems));
}


