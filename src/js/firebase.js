import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";

import {getDatabase, ref, set, get, child, update, remove}
from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js"

import { getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, onAuthStateChanged, updateProfile } 
from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js"

import { finalScore } from "./main.js";

import { sortScore } from "./table.js";

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
var welcomeUser = document.getElementById("welcome-user");
var userID;
var username;
var userBestScore;

//When user logged in change page content

onAuthStateChanged(auth, (user) => {
    var leaderboardMessage = document.getElementById("leaderboard-message");
    if (user) {
      userID = user.uid;
      username = auth.currentUser.displayName;
      welcomeUser.innerHTML = "Hello, " + username.charAt(0).toUpperCase() + username.slice(1);
      bestScore.style.display = "flex";
      signup.style.display = "none";
      login.style.display = "none";
      logoutButton.style.display = "block";
      welcomeUser.style.display = "flex";
      leaderboardMessage.innerHTML = "";
    } else {
      bestScore.style.display = "none";
      signup.style.display = "flex";
      login.style.display = "flex";
      logoutButton.style.display = "none";
      welcomeUser.style.display = "none";
      leaderboardMessage.innerHTML = "Please sign in to see leaderboard"
    } 
});

//Save Data to Database

export function saveData(){
    set(ref(db, "Users/" + userID),{
        Name: username,
        highScore: finalScore,
    });
}

//Retrieve score data from database

var userBestScore;

export function retrieveData(){
  const dbRef = ref(getDatabase());
  get(child(dbRef, `Users/${userID}/highScore`)).then((snapshot) => {
  if (snapshot.exists()) {
    userBestScore = snapshot.val();
    bestScore.innerHTML = "Your best score is " + userBestScore;
  } else {
    console.log("No data available");
  }
  }).catch((error) => {
    console.error(error);
  });
}

//Retrieve all data from database for leaderboard

var allDatabaseData;
var leaderboardArray = [];

export function retrieveAllData(){
  const dbRef = ref(getDatabase());
  get(child(dbRef, `Users`)).then((snapshot) => {
  if (snapshot.exists()) {
    leaderboardArray = [];
    allDatabaseData = snapshot.val();
    var arraySize = Object.keys(allDatabaseData).length - 1;
    for (let i = 0; i <= arraySize; i++) {
      console.log(leaderboardArray);
      leaderboardArray.push(allDatabaseData[Object.keys(allDatabaseData)[i]]);
    }
    leaderboardArray.sort(function (a, b) {return a.highScore - b.highScore});
    sortScore();
  } else {
    console.log("No data available");
  }
  }).catch((error) => {
    console.error(error);
  });
}

//Sign Up Function

const signupForm = document.querySelector('.signup')
var signupError = document.getElementById("signup-error");

signupForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const email = signupForm.email.value;
  const password = signupForm.password.value;
  const name = signupForm.name.value;

  signupError.innerHTML = "";

  createUserWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      updateProfile(auth.currentUser, {
        displayName: name
      })
      username = auth.currentUser.displayName;
      signupLogin(email, password, name);
    })
    .catch((err) => {
      signupError.innerHTML = err.message;
    })
})

//Sign In Function

const loginForm = document.querySelector('.login')

loginForm.addEventListener('submit', (e) => {
  e.preventDefault()

  var email = loginForm.email.value;
  var password = loginForm.password.value;
  var loginError = document.getElementById("login-error");

  loginError.innerHTML = "";

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      loginForm.reset();
      retrieveAllData();
      retrieveData();
    })
    .catch((err) => {
      loginError.innerHTML = err.message;
    })  
})

//Sign in when sign up

function signupLogin(email, password, name){

  signupError.innerHTML = "";

  signInWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      retrieveAllData();
      username = auth.currentUser.displayName;
      userID = auth.currentUser.uid;
      welcomeUser.innerHTML = "Hello, " + name.charAt(0).toUpperCase() + name.slice(1);
      bestScore.innerHTML = "Your best score is " + userBestScore;
      signup.style.display = "none";
      login.style.display = "none";
      logoutButton.style.display = "block";
      welcomeUser.style.display = "flex";
    })
    .catch((err) => {
      signupError.innerHTML = err.message;
    }) 
}

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

export {userID};
export {userBestScore};
export {leaderboardArray};