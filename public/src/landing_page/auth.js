import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";
const firebaseconfig = {
    apiKey: "AIzaSyAtgFAs4hvlpMQStzVnD3tRJ9N8jLB98b0",
    authDomain: "bilin---the-food-donatio-a24c6.firebaseapp.com",
    projectId: "bilin---the-food-donatio-a24c6",
    storageBucket: "bilin---the-food-donatio-a24c6.appspot.com",
    messagingSenderId: "105362764313",
    appId: "1:105362764313:web:71739e5e422c213546f088",
    measurementId: "G-YLCFCJDLG1"
};




const BtnLogin = document.getElementById('login-btn');
const emaillogin = document.getElementById('login_page_email_input');
const passwordlogin = document.getElementById('login_page_password_input')
BtnLogin.addEventListener('click', loginWithEmailPassword);



async function loginWithEmailPassword() {
    const email = emaillogin.value;
    const password = passwordlogin.value;

    try {
        const heheapp = initializeApp(firebaseconfig);
        const auth = getAuth(heheapp);
        const userCredentials = await signInWithEmailAndPassword(auth, email, password);
        console.log('here3');
        console.log(userCredentials.user);
    } catch (err) {
        console.log(err);
    }

}

async function createUserWithEmaillPass() {
    try {
        const email = 'testemail2@email.com';
        const password = 'testpass2';
        const heheapp = initializeApp(firebaseconfig);
        const auth = getAuth(heheapp);
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
        console.log(userCredentials.user);
        console.log('here create');
    } catch (err) {
        console.log(({
            'message': err.message,
            'code': err.code
        }));
    }
}

// const loginBTN = document.getElementById()
var loginBtn = document.getElementById('login-btn');

// loginWithEmailPassword();
// createUserWithEmaillPass();




