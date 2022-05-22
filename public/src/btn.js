import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getFirestore, doc, getDoc, getDocs, collection, onSnapshot, connectFirestoreEmulator } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
// import { getAuth } from "firebase/auth";


const firebaseApp = initializeApp({
    apiKey: "AIzaSyAtgFAs4hvlpMQStzVnD3tRJ9N8jLB98b0",
    authDomain: "bilin---the-food-donatio-a24c6.firebaseapp.com",
    projectId: "bilin---the-food-donatio-a24c6",
    storageBucket: "bilin---the-food-donatio-a24c6.appspot.com",
    messagingSenderId: "105362764313",
    appId: "1:105362764313:web:71739e5e422c213546f088",
    measurementId: "G-YLCFCJDLG1"
});

const db = getFirestore(firebaseApp);
const eventsRef = collection(db, 'Events')


var btn = document.getElementById('show-event-btn');
btn.addEventListener('click', getIDValue);

function getIDValue(){
    const val = $('#hidden-input').val();
    console.log(val);
};
getIDValue();