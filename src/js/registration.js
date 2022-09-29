document.querySelector('.more-button').addEventListener('click', function () {
  document
    .querySelector('.more-button_img')
    .classList.toggle('more-button_img-anim');
  document.querySelector('.more-button-list').classList.toggle('active');
});
