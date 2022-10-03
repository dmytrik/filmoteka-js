document.querySelector('.more-button').addEventListener('click', function () {
  document
    .querySelector('.more-button_img')
    .classList.toggle('more-button_img-anim');
  document.querySelector('.more-button-list').classList.toggle('active');
});

import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";

// import { getFirestore } from "firebase/firestore"; // підключення бази даних
const firebaseConfig = {
  apiKey: "AIzaSyDCze2CrAUTNL3TmB373IK_WEsQrxOxZn8",
  authDomain: "filmoteka-e9068.firebaseapp.com",
  databaseURL: "https://filmoteka-e9068-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "filmoteka-e9068",
  storageBucket: "filmoteka-e9068.appspot.com",
  messagingSenderId: "396825569828",
  appId: "1:396825569828:web:7e0a0372dc39792a89c6b1",
  measurementId: "G-TQ5KLBB80B"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// const db = getFirestore(app); // підключення бази даних

document.querySelector(".more-button-list").addEventListener("click", (e) => {
  if (e.target.classList.contains("login__button")) {
    loginEmailPassword()
  } else if (e.target.classList.contains("signup__button")) {
    createAccount()
  }

})

//замість бібліотеки notify
const notify = document.createElement("p")
notify.classList.add("notify")
document.querySelector(".signup__button").insertAdjacentElement("afterend", notify)

// створення нового користуача
const createAccount = async () => {
  const email = document.querySelector('[placeholder="Login"]').value
  const password = document.querySelector('[placeholder="Password"]').value
  if (email === "" || password === "") {
    notify.innerHTML = "Enter login and password to register"
    return
  }
  try {
    await createUserWithEmailAndPassword(auth, email, password)
    // коли користувач зареєструвався, виконується функція onAuthStateChanged в monitorAuthState
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
    }
  }
}
//

// вхід зареєстрованого користувача
const loginEmailPassword = async () => {
  const loginEmail = document.querySelector('[placeholder="Login"]').value
  const loginPassword = document.querySelector('[placeholder="Password"]').value
  if (loginEmail === "" || loginPassword === "") {
    notify.innerHTML = "Enter login and password"
    return
  } else if (loginPassword < 6) {
    notify.innerHTML = "Password must have at least 6 symbol"
    return
  }
  try {
    await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
      .then((userCredential) => {
        user = userCredential.user;
      })
  }
  catch (error) {
    if (error.message.includes("invalid-email") || error.message.includes("wrong-password")) {
      notify.innerHTML = "Wrong password or email"
    } else if (error.message.includes("user-not-found")) {
      notify.innerHTML = "User not found"
    } else if (error.message.includes("too-many-requests")) {
      notify.innerHTML = "Too many request, please try later"
    }
  }
}
//

//перевірка чи зареєстрований користувач
// цю функцію можна перевикористовувати будь-де, і на будь-якій сторінці
// з user можна можна витягнути все необхідне(логін, ім'я і т.д.)
const monitorAuthState = async () => {
  onAuthStateChanged(auth, user => {
    if (user) {
      const notify = document.createElement("p")
      notify.classList.add("notify")
      document.querySelector(".more-button-list")
        .innerHTML = `
        <button class="logout__button" id="logout__button">Logout</button>`
      notify.innerHTML = `Welcome back ${user.email}!.`
      document.querySelector(".more-button-list").insertAdjacentElement("afterbegin", notify)
      document.querySelector("#logout__button").addEventListener("click", logout)
    }
  })
}
//

const logout = async () => {
  await signOut(auth);
  location.reload()
}

monitorAuthState(); // авто-виклик функції перевірки зареєстрованого користувача
