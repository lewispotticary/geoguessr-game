import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";

import {getDatabase, ref, set, child, update, remove}
from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js"

import { getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, onAuthStateChanged, updateProfile } 
from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js"

//Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZpjshBQB-W8nfcBF9G8jBjTeWNasf5uc",
  authDomain: "geoguessr-clone-959c0.firebaseapp.com",
  projectId: "geoguessr-clone-959c0",
  databaseURL: "https://geoguessr-clone-959c0-default-rtdb.europe-west1.firebasedatabase.app",
  storageBucket: "geoguessr-clone-959c0.appspot.com",
  messagingSenderId: "829776637609",
  appId: "1:829776637609:web:e09429870bb507df7003b8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Database
const db = getDatabase();

// Initialize Firebase Auth
const auth = getAuth();

var signup = document.getElementsByClassName("signup")[0];
var login = document.getElementsByClassName("login")[0];
var welcomeUser = document.getElementById("welcomeUser");

onAuthStateChanged(auth, (user) => {
  if (user) {
    var username = auth.currentUser.displayName;
    welcomeUser.innerHTML = "Hello, " + username.charAt(0).toUpperCase() + username.slice(1);
    signup.style.display = "none";
    login.style.display = "none";
    logoutButton.style.display = "block";
    welcomeUser.style.display = "flex";
    // ...
  } else {
    signup.style.display = "flex";
    login.style.display = "flex";
    logoutButton.style.display = "none";
    welcomeUser.style.display = "none";
    // ...
  }
});

//Save Data to Database

function saveData(){
  console.log(scoreNumber1);
    console.log("submit");
    set(ref(db, "Username/" + userName.value),{
        Name: userName.value,
        Score: scoreNumber1.value,
    });
}

//Sign Up Function

const signupForm = document.querySelector('.signup')

signupForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const email = signupForm.email.value;
  const password = signupForm.password.value;
  const name = signupForm.name.value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      console.log('user created:', cred.user)
      updateProfile(auth.currentUser, {
        displayName: name
      }).then(() => {
        // Profile updated!
        // ...
      }).catch((err) => {
        alert(err.message)
      });
      signupForm.reset()
    })
    .catch((err) => {
      alert(err.message)
    })
})

//Sign In Function

const loginForm = document.querySelector('.login')

loginForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const email = loginForm.email.value;
  const password = loginForm.password.value;

  signInWithEmailAndPassword(auth, email, password)

  signInWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      loginForm.reset()
    })
    .catch((err) => {
      alert(err.message);
    })
})

//Log Out Function

const logoutButton = document.querySelector('.logout')

logoutButton.addEventListener('click', () => {
  signOut(auth)
  .then(() => {
    console.log('the user signed out')
  })
  .catch((err) => {
    console.log(err.message)
  })
})








//submitButton.addEventListener("click", saveData);

//var userName = document.getElementById("submit-input");
//var scoreNumber1 = document.getElementById("score-input");
//var submitButton = document.getElementById("submit-button");