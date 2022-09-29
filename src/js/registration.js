document.querySelector('.more-button').addEventListener('click', function () {
  document
    .querySelector('.more-button_img')
    .classList.toggle('more-button_img-anim');
  document.querySelector('.more-button-list').classList.toggle('active');
});

import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';

// import { getFirestore } from "firebase/firestore"; // підключення бази даних
const firebaseConfig = {
  apiKey: 'AIzaSyDCze2CrAUTNL3TmB373IK_WEsQrxOxZn8',
  authDomain: 'filmoteka-e9068.firebaseapp.com',
  databaseURL:
    'https://filmoteka-e9068-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'filmoteka-e9068',
  storageBucket: 'filmoteka-e9068.appspot.com',
  messagingSenderId: '396825569828',
  appId: '1:396825569828:web:7e0a0372dc39792a89c6b1',
  measurementId: 'G-TQ5KLBB80B',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// const db = getFirestore(app); // підключення бази даних

document.querySelector('.more-button-list').addEventListener('click', e => {
  if (e.target.classList.contains('login__button')) {
    loginEmailPassword();
  } else if (e.target.classList.contains('signup__button')) {
    createAccount();
  }
});

//замість бібліотеки notify
const notify = document.createElement('p');
notify.classList.add('notify');
document
  .querySelector('.signup__button')
  .insertAdjacentElement('afterend', notify);

// створення нового користуача
const createAccount = async () => {
<<<<<<< HEAD
  const email = document.querySelector('[placeholder="Login"]').value
  const password = document.querySelector('[placeholder="Password"]').value
  if (email === "" || password === "") {
    notify.innerHTML = "Enter login and password to register"
    return
=======
  const email = document.querySelector('[placeholder="Login"]').value;
  const password = document.querySelector('[placeholder="Password"]').value;
  if (email === '' || password === '') {
    notify.innerHTML = 'Введіть логін/пароль для реєстрації';
    return;
>>>>>>> 5d57401e8f13034ded1d23bc1144ae11c3160918
  }
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    // коли користувач зареєструвався, виконується функція onAuthStateChanged в monitorAuthState
<<<<<<< HEAD
    notify.innerHTML = `You're create account ${email}.`
  }
  catch (error) {
    if (error.message.includes("invalid-email")) {
      notify.innerHTML = "Wrong email"
    }
    if (error.message.includes("weak-password")) {
      notify.innerHTML = "Password must have at least 6 symbol"
    }
    if (error.message.includes("email-already-in-use")) {
      notify.innerHTML = "User alreary created"
=======
    notify.innerHTML = `You're create account ${email}.`;
  } catch (error) {
    if (error.message.includes('invalid-email')) {
      notify.innerHTML = 'Невірно вказаний email/пароль';
    }
    if (error.message.includes('weak-password')) {
      notify.innerHTML = 'Пароль повинен мати хотяб 6 символів';
    }
    if (error.message.includes('email-already-in-use')) {
      notify.innerHTML = 'Користувач вже існує';
>>>>>>> 5d57401e8f13034ded1d23bc1144ae11c3160918
    }
  }
};
//

// вхід зареєстрованого користувача
const loginEmailPassword = async () => {
<<<<<<< HEAD
  const loginEmail = document.querySelector('[placeholder="Login"]').value
  const loginPassword = document.querySelector('[placeholder="Password"]').value
  if (loginEmail === "" || loginPassword === "") {
    notify.innerHTML = "Enter login and password"
    return
  } else if (loginPassword < 6) {
    notify.innerHTML = "Password must have at least 6 symbol"
    return
=======
  const loginEmail = document.querySelector('[placeholder="Login"]').value;
  const loginPassword = document.querySelector(
    '[placeholder="Password"]'
  ).value;
  if (loginEmail === '' || loginPassword === '') {
    notify.innerHTML = 'Щоб увійти введіть логін/пароль';
    return;
  } else if (loginPassword < 6) {
    notify.innerHTML = 'Пароль повинен мати хотяб 6 символів';
    return;
>>>>>>> 5d57401e8f13034ded1d23bc1144ae11c3160918
  }
  try {
    await signInWithEmailAndPassword(auth, loginEmail, loginPassword).then(
      userCredential => {
        user = userCredential.user;
<<<<<<< HEAD
      })
  }
  catch (error) {
    if (error.message.includes("invalid-email") || error.message.includes("wrong-password")) {
      notify.innerHTML = "Wrong password or email"
    } else if (error.message.includes("user-not-found")) {
      notify.innerHTML = "User not found"
    } else if (error.message.includes("too-many-requests")) {
      notify.innerHTML = "Too many request, please try later"
=======
      }
    );
  } catch (error) {
    if (
      error.message.includes('invalid-email') ||
      error.message.includes('wrong-password')
    ) {
      notify.innerHTML = 'Невірно вказаний email/пароль';
    } else if (error.message.includes('user-not-found')) {
      notify.innerHTML = 'Користувача не знайдено';
    } else if (error.message.includes('too-many-requests')) {
      notify.innerHTML = 'Забагато невдалих спроб, спробуйте пізніше';
>>>>>>> 5d57401e8f13034ded1d23bc1144ae11c3160918
    }
  }
};
//

//перевірка чи зареєстрований користувач
// цю функцію можна перевикористовувати будь-де, і на будь-якій сторінці
// з user можна можна витягнути все необхідне(логін, ім'я і т.д.)
const monitorAuthState = async () => {
  onAuthStateChanged(auth, user => {
    if (user) {
      const notify = document.createElement('p');
      notify.classList.add('notify');
      document.querySelector('.more-button-list').innerHTML = `
        <button class="login__button1" id="logout__button">Logout</button>
          <label class="switch">
                <input type="checkbox">
                <span class="slider round"></span>
<<<<<<< HEAD
              </label>`
      notify.innerHTML = `Welcome back ${user.email}!.`
      document.querySelector(".more-button-list").insertAdjacentElement("afterbegin", notify)
      document.querySelector("#logout__button").addEventListener("click", logout)
=======
              </label>`;
      notify.innerHTML = `Вітаємо ${user.email}.`;
      document
        .querySelector('.more-button-list')
        .insertAdjacentElement('afterbegin', notify);
      document
        .querySelector('#logout__button')
        .addEventListener('click', logout);
>>>>>>> 5d57401e8f13034ded1d23bc1144ae11c3160918
    }
  });
};
//

const logout = async () => {
  await signOut(auth);
<<<<<<< HEAD
  location.reload()
}
=======
  location.reload();
};
>>>>>>> 5d57401e8f13034ded1d23bc1144ae11c3160918

monitorAuthState(); // авто-виклик функції перевірки зареєстрованого користувача
