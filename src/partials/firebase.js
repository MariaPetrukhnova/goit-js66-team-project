
import "firebase/auth";
import "firebase/database";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
// import { signOut } from "firebase/auth";
// import { onAuthStateChanged } from "firebase/auth";
import Notiflix from 'notiflix';
const firebaseConfig = {
  apiKey: "AIzaSyARa5Hh8nGBMHOsxW-0GD7_PQkq_qzHkeQ",
  authDomain: "team-14-baf33.firebaseapp.com",
  databaseURL: "https://team-14-baf33-default-rtdb.firebaseio.com",
  projectId: "team-14-baf33",
  storageBucket: "team-14-baf33.appspot.com",
  messagingSenderId: "599688518334",
  appId: "1:599688518334:web:c8a0ec7eee91b2b9d59cef",
  measurementId: "G-PHYJDS3YTC"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

const refs = {
    openModalBtn: document.querySelector("[data-modal-open]"),
    closeUserModalBtn: document.querySelector("[data-modal-close]"),
    closeRegBtn: document.querySelector("[data-modal-close-reg]"),
    closeLogin: document.querySelector("[data-modal-close-log]"),
    openLoginBtn: document.querySelector(".login"),
    modal: document.querySelector("[data-modal]"),
    modalLogin: document.querySelector("[data-modal-login]"),
    modalUser: document.querySelector("[data-modal-user]"),
    modalEmail: document.getElementById('email'),
    modalPassword: document.getElementById('psw'),
    loginEmail: document.getElementById('mail'),
    loginPassword: document.getElementById('password'),
    singBtn: document.getElementById("auth-form"),
    loginBtn: document.getElementById('log-form'),
    logOut: document.getElementById('login-btn'),
    userBtn: document.querySelector(".user"),
    
  };
 
  refs.userBtn.style.display = "none";
  refs.openModalBtn.addEventListener("click", onModal);
  refs.openLoginBtn.addEventListener("click", onModalLogin);
  refs.singBtn.addEventListener("submit", authFormHandlerModal);
  refs.loginBtn.addEventListener('submit', authFormHandler, );
  refs.closeUserModalBtn.addEventListener("click", closeUserModal);
  refs.logOut.addEventListener("click",logOut)
  refs.userBtn.addEventListener("click", onUser);
  refs.closeRegBtn.addEventListener("click", closeRegistration);
  refs.closeLogin.addEventListener("click", closeLogin);

//  FUNCTION/\\\\\\\\\

  function local () {
    if (localStorage.auth === 'yes'){
      showOneBtn()
      return;
    } 
      shoTtwoBtn()
   
     }
  local();
  function shoTtwoBtn() {
      refs.openModalBtn.style.display = '';
      refs.openLoginBtn.style.display = '';
      refs.userBtn.style.display = "none"
  }
  function showOneBtn() {
    refs.openModalBtn.style.display = 'none';
      refs.openLoginBtn.style.display = 'none';
      refs.userBtn.style.display = ""
}

//   ДОДАВАННЯ КОРИСТУВАЧА   //

  function onModal(e) {
    e.preventDefault();
    refs.modal.classList.toggle("is-hidden");
  }

  function authFormHandlerModal(e) {
    e.preventDefault();
    createNewUser();   
  }     
      
  function createNewUser() {
    const email = refs.modalEmail.value;
    const password = refs.modalPassword.value;
    if(email === "" || password === "") {
        Notiflix.Notify.warning('For signing up you need to enter both E-mail and Password');
        return;
        }

        checkUserRegistration(email, password).then(data => {
        if(data.registered === true){
            Notiflix.Notify.warning('This user already exists! Please enter your personal account!');
            refs.modal.classList.toggle("is-hidden");
            refs.modalLogin.classList.toggle("is-hidden");
            refs.modal.remove();
        }})
              

        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
         console.log(userCredential);
  
          const user = userCredential.user;
          Notiflix.Report.success('Registration completed successfully! Welcome');
          refs.modal.classList.toggle("is-hidden");
          localStorage.auth = "yes"
          showOneBtn();
        })
        .catch((error) => {
          Notiflix.Notify.warning('Email and password entered incorrectly!')
          refs.singBtn.reset();
                   
        });

      }

    function checkUserRegistration(email, password) {
        const apiKey = 'AIzaSyARa5Hh8nGBMHOsxW-0GD7_PQkq_qzHkeQ';
        return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
            method: 'POST',
            body: JSON.stringify({
              email, password,
              returnSecureToken: true,
            })
          })
            .then(response => response.json())
            .catch();
      };

    // Вхід існуючого користувача!!!\\\\\
    
    function onModalLogin(e) {
    e.preventDefault();
    refs.modalLogin.classList.toggle("is-hidden");
  
  }

  function authFormHandler(e) {
     e.preventDefault();
     authWithEmailAndPassword()
     
      }  
    
     function authWithEmailAndPassword() {
        const email = refs.loginEmail.value;
        const password = refs.loginPassword.value;
        if(email === "" || password === "") {
            Notiflix.Notify.warning('For signing up you need to enter both E-mail and Password');
            
           }
         
           signInWithEmailAndPassword(auth, email, password)
           .then((userCredential) => {
   
           const user = userCredential.user;
           localStorage.auth = "yes";
           Notiflix.Report.success( 'Successful Login');
           refs.modalLogin.classList.toggle("is-hidden");
           refs.modalUser.classList.toggle("is-hidden");
           showOneBtn();
           
     })
     .catch((error) => {
      Notiflix.Notify.warning('Email and password entered incorrectly!')
      refs.loginBtn.reset();
     
     });
         }
  
// Вхід в кабінет\\\\\\\
function onUser(e){
    e.preventDefault();
    if (localStorage.auth=== "yes") {
        refs.modalUser.classList.toggle("is-hidden");
        return;
    }
    }

    // Вихід з кабінету\\\\\\\

    function logOut(e){

     localStorage.auth = "no"
    refs.modalUser.classList.toggle("is-hidden");
    shoTtwoBtn()
   
}
    //   Кнопки закриття
    // кабінет\\\\\\\
    function closeUserModal(e) {
   refs.modalUser.classList.toggle("is-hidden");
  }

    // Закриття Регистрации\\\
function closeRegistration(e) {
  e.preventDefault()
   refs.modal.classList.toggle("is-hidden");
 }
 // Закриття Login\\\
function closeLogin(e) {
  e.preventDefault()
  refs.modalLogin.classList.toggle("is-hidden");
 }
        
export * as firebase from './firebase.js';