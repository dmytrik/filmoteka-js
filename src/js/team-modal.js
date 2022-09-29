const refs = {
  aboutDev: document.querySelector('.footer-btn'),
  backdrop: document.querySelector('.backdrop'),
};

const { aboutDev, backdrop } = refs;
aboutDev.addEventListener('click', openTeamModal);
backdrop.addEventListener('click', closeTeamModal);

function openTeamModal() {
  backdrop.classList.toggle('is-hidden');
  window.addEventListener('keydown', closeTeamModal);
}

function closeTeamModal(e) {
  if (
    e.target.classList.contains('backdrop') ||
    e.target.classList.contains('close_modal') ||
    e.code === 'Escape'
  ) {
    backdrop.classList.toggle('is-hidden');
    window.removeEventListener('keydown', closeTeamModal);
  }
}