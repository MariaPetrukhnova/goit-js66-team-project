
import "firebase/auth";
import "firebase/database";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import Notiflix from 'notiflix';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";

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
  };

  refs.openModalBtn.addEventListener("click", onModal);
  refs.openLoginBtn.addEventListener("click", onModalLogin);
  refs.singBtn.addEventListener("submit", authFormHandlerModal,{once:true});
  refs.loginBtn.addEventListener('submit', authFormHandler, {once:true});
 
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
                      
            createUserWithEmailAndPassword(auth, email, password)
              .then((userCredential) => {
               console.log(userCredential);
        
                const user = userCredential.user;
                Notiflix.Report.success('Registration completed successfully! Welcome');
                refs.modal.classList.toggle("is-hidden");
              })
              .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                
              });

            }
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
            return;
           }
        signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
  
    const user = userCredential.user;
    Notiflix.Report.success( 'Successful Login')
    refs.modalLogin.classList.toggle("is-hidden");
    refs.modalUser.classList.toggle("is-hidden");
    
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
      }

        
export * as firebase from './firebase.js';