import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js';
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";

console.log('here');

const CONFIG = initializeApp({
    apiKey: "AIzaSyAtgFAs4hvlpMQStzVnD3tRJ9N8jLB98b0",
    authDomain: "bilin---the-food-donatio-a24c6.firebaseapp.com",
    projectId: "bilin---the-food-donatio-a24c6",
    storageBucket: "bilin---the-food-donatio-a24c6.appspot.com",
    messagingSenderId: "105362764313",
    appId: "1:105362764313:web:71739e5e422c213546f088",
    measurementId: "G-YLCFCJDLG1"

});
async function loginWithEmailPass(config) {
    const auth = getAuth(config);
    const creds = await signInWithEmailAndPassword(auth, "testemail@email.com", 'testpass21!');
    console.log(creds.user);
    console.log('hehe');
}

loginWithEmailPass(CONFIG);