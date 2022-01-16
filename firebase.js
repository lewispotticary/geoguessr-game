import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";

import {getDatabase, ref, set, child, update, remove}
from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js"

import { getAuth, createUserWithEmailAndPassword } 
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

//var userName = document.getElementById("submit-input");
//var scoreNumber1 = document.getElementById("score-input");
//var submitButton = document.getElementById("submit-button");

function saveData(){
  console.log(scoreNumber1);
    console.log("submit");
    set(ref(db, "Username/" + userName.value),{
        Name: userName.value,
        Score: scoreNumber1.value,
    });
}

const signupForm = document.querySelector('.signup')

signupForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const email = signupForm.email.value;
  const password = signupForm.password.value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      console.log('user created:', cred.user)
      signupForm.reset()
    })
    .catch((err) => {
      console.log(err.message)
    })
})

//submitButton.addEventListener("click", saveData);