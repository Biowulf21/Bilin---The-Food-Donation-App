import { initializeApp  } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";
import { getFirestore, collection, addDoc } from 'https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js';


const firebaseConfig = {
    apiKey: "AIzaSyAtgFAs4hvlpMQStzVnD3tRJ9N8jLB98b0",
    authDomain: "bilin---the-food-donatio-a24c6.firebaseapp.com",
    projectId: "bilin---the-food-donatio-a24c6",
    storageBucket: "bilin---the-food-donatio-a24c6.appspot.com",
    messagingSenderId: "105362764313",
    appId: "1:105362764313:web:71739e5e422c213546f088",
    measurementId: "G-YLCFCJDLG1"
};
initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
const usersRef = collection(db, 'Users')

const BtnLogin = document.getElementById('login-btn');
const emaillogin = document.getElementById('login_page_email_input');
const passwordlogin = document.getElementById('login_page_password_input')
BtnLogin.addEventListener('click', loginWithEmailPassword);



// Login
async function loginWithEmailPassword() {
    const email = emaillogin.value;
    const password = passwordlogin.value;

    try {
        const userCredentials = await signInWithEmailAndPassword(auth, email, password);
        console.log('User Logged in');
        // console.log(userCredentials.user);
    } catch (err) {
        console.log(err);
    }

}


const donorBtn = document.getElementById('donor-sign-up-btn');
donorBtn.addEventListener('click', createDonorWithEmaillPass);
const donorName = document.getElementById('donor-full-name');
const donorEmail = document.getElementById('donor-email');
const donorNumber = document.getElementById('donor-number');
const donorPassword = document.getElementById('donor-password');
const donorConfirmPassword = document.getElementById('donor-confirm-password');
// Sign Up as Donor
async function createDonorWithEmaillPass() {
    try {
        console.log('creatingUser')
            const email = donorEmail.value;
            const password = donorPassword.value

            if (password !== donorConfirmPassword.value) {
                console.log('passwords do not match!');
                return;
            }
            const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
            console.log('User Created');    
            const docRef = await addDoc(usersRef, {
                id: auth.currentUser.uid,
                name: donorName.value,
                email: donorEmail.value,
                number: donorNumber.value,
                accountType: 'donor'
            })
            console.log('User document created');
    } catch (err) {
        console.log(({
            'message': err.message,
            'code': err.code
        }));
    }
}

const orgName = document.getElementById('org-name');
const orgEmail = document.getElementById('org-email');
const orgNum = document.getElementById('org-number');
async function createOrgWithEmaillPass() {
    try {
        console.log('creatingUser')
        const email = orgEmail.value;
            const password = 'testpass';
            const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
            console.log('User Created');    
            const docRef = await addDoc(usersRef, {
                id: auth.currentUser.uid,
                name: orgName.value,
                email: orgEmail.value,
                number: orgNum.value,
                accountType: 'organization'
            })
            console.log('User document created');
    } catch (err) {
        console.log(({
            'message': err.message,
            'code': err.code
        }));
    }
}
const orgSignUpBtn = document.getElementById('partner-signup-btn');
orgSignUpBtn.addEventListener('click', createOrgWithEmaillPass)




// const loginBTN = document.getElementById()
var loginBtn = document.getElementById('login-btn');


// loginWithEmailPassword();




