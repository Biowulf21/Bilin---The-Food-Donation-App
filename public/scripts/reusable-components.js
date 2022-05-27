import { initializeApp  } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyAtgFAs4hvlpMQStzVnD3tRJ9N8jLB98b0",
    authDomain: "bilin---the-food-donatio-a24c6.firebaseapp.com",
    projectId: "bilin---the-food-donatio-a24c6",
    storageBucket: "bilin---the-food-donatio-a24c6.appspot.com",
    messagingSenderId: "105362764313",
    appId: "1:105362764313:web:71739e5e422c213546f088",
    measurementId: "G-YLCFCJDLG1"
};
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth();


//Nav bar
onAuthStateChanged(auth, async(user)=>{
    
    user ?
    fetch('/../assets/reusable-components/nav-loggedin.html')
        .then(res => res.text())
        .then(text => {
            let oldelem = document.querySelector("script#replace_with_navbar");
            let newelem = document.createElement("div");
            newelem.innerHTML = text;
            oldelem.parentNode.replaceChild(newelem, oldelem);
        }) : fetch('/../assets/reusable-components/nav.html')
        .then(res => res.text())
        .then(text => {
            let oldelem = document.querySelector("script#replace_with_navbar");
            let newelem = document.createElement("div");
            newelem.innerHTML = text;
            oldelem.parentNode.replaceChild(newelem, oldelem);
        })
})




//Footer
fetch('/../assets/reusable-components/footer.html')
    .then(res => res.text())
    .then(text => {
        let oldelem = document.querySelector("script#replace_with_footer");
        let newelem = document.createElement("div");
        newelem.innerHTML = text;
        oldelem.parentNode.replaceChild(newelem, oldelem);
    })



// //Get involved modals
// fetch('/../assets/reusable-components/modals.html')
// .then(res => res.text())
// .then(text => {
//     let oldelem = document.querySelector("script#replace_with_modals");
//     let newelem = document.createElement("div");
//     newelem.innerHTML = text;
//     oldelem.parentNodereplaceChild(newelem, oldelem);
// })



//TEST
fetch('../../assets/reusable-components/test.html')
.then(res => res.text())
.then(text => {
    let oldelem = document.querySelector("script#replace_with_test");
    let newelem = document.createElement("div");
    newelem.innerHTML = text;
    oldelem.parentElement.replaceChild(newelem, oldelem);
})