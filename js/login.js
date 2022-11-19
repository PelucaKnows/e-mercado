function autenticar(event) {
  event.preventDefault();//para que no se recargue
  let email = document.getElementById("email");
  let password = document.getElementById("password");
  
  if (email.value !== "" && password.value !== "") {
    // login ok! 
    sessionStorage.setItem("user", email.value);
    sessionStorage.setItem("login", true);
    window.location = "index.html";
  }
  const forms = document.getElementsByClassName("needs-validation");
  forms[0].classList.add("was-validated");
}
/////////////////////////////LOGIN GOOGLE







import { GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.11.0/firebase-auth.js";

const provider = new GoogleAuthProvider();


// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCkcwFoVVa8xUmklfCe3sBvydZaKFEO_ic",
  authDomain: "e-commerce-jovenes-a-programar.firebaseapp.com",
  projectId: "e-commerce-jovenes-a-programar",
  storageBucket: "e-commerce-jovenes-a-programar.appspot.com",
  messagingSenderId: "707394185384",
  appId: "1:707394185384:web:f0beb4af667cd6a5f8ba9d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const auth = getAuth();
signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });

  