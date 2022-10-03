const changeColorButton = document.querySelector('.change__bg-color');
// console.log(changeColorButton);
const bodyTheme = document.querySelector('body');
const toogleEl = document.querySelector('.slider');
const headerTheme = document.querySelector('.header');
const headerThemeLibrary = document.querySelector('.header-library');
const headerBackground = document.querySelector('.header__container-library');
const footerTheme = document.querySelector('.footer');

function darkTheme() {
  bodyTheme.classList.add('dark-theme');
  headerTheme.classList.add('dark-theme');
  headerThemeLibrary.classList.add('dark-theme');
  headerBackground.classList.add('dark-theme');
  footerTheme.classList.add('dark-theme');
  bodyTheme.classList.remove('blue-theme');
  headerTheme.classList.remove('blue-theme');
  headerThemeLibrary.classList.remove('blue-theme');
  headerBackground.classList.remove('blue-theme');
  footerTheme.classList.remove('blue-theme');
}

function blueTheme() {
  bodyTheme.classList.add('blue-theme');
  headerTheme.classList.add('blue-theme');
  headerThemeLibrary.classList.add('blue-theme');
  headerBackground.classList.add('blue-theme');
  footerTheme.classList.add('blue-theme');
  bodyTheme.classList.remove('dark-theme');
  headerTheme.classList.remove('dark-theme');
  headerThemeLibrary.classList.remove('dark-theme');
  headerBackground.classList.remove('dark-theme');
  footerTheme.classList.remove('dark-theme');
}

changeColorButton.addEventListener('click', buttonClick);

function buttonClick() {
  if (bodyTheme.classList.contains('dark-theme')) {
    blueTheme();
    localStorage.setItem('theme', bodyTheme.classList);
  } else {
    darkTheme();
    localStorage.setItem('theme', bodyTheme.classList);
  }
}

const avtiveTheme = localStorage.getItem('theme');

toogleChecked();
updateTheme();
// rememberTheme();

function toogleChecked() {
  if (avtiveTheme === 'blue-theme') {
    changeColorButton.setAttribute('checked', true);
  }
}

function updateTheme() {
  if (avtiveTheme === 'blue-theme') {
    blueTheme();
  }
}

// function rememberTheme() {
//   if (activeTheme) {
//     bodyTheme.classList = activeTheme;
//   }
// }
