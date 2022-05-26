import { initializeApp  } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";
import { getFirestore, collection, addDoc, setDoc, doc} from 'https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js';


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
    try {
    const email = emaillogin.value;
    const password = passwordlogin.value;
    onAuthStateChanged(auth, async (user)=> {
        try{
        if (!user){
            const userCredentials = await signInWithEmailAndPassword(auth, email, password);
            console.log('User Logged in');
        } else {
            throw new Error('Already Logged in');
        }
    } catch (err){
        alert(err.message);
    }
    });

        // console.log(userCredentials.user);
    } catch (err) {
        alert(err.message);
    }
    $(function (){
        $('#modal-login').modal('toggle');
    });
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

            const bookmarks = addDoc(
                collection(db, 'Users', docRef.id , 'Bookmarks'), {
            });

            console.log('bookmarks created');

            const donations = addDoc(
                collection(db, 'Users', docRef.id , 'Donations'), {
            });
            console.log('donations collection created');

            
    } catch (err) {
        console.log(({
            'message': err.message,
            'code': err.code
        }));
    }
    $(function (){
        $('#modal-donor').modal('toggle');
    });
}

const orgName = document.getElementById('org-name');
const orgEmail = document.getElementById('org-email');
const orgNum = document.getElementById('org-number');
async function createOrgWithEmaillPass() {
    try {
        throw new Error("Cannot create admin account at this time.")
    } catch (err) {
        console.log(({
            'message': err.message,
            'code': err.code
        }));
    }

    $(function (){
        $('#modal-partner').modal('toggle');
    })
}
const orgSignUpBtn = document.getElementById('partner-signup-btn');
orgSignUpBtn.addEventListener('click', createOrgWithEmaillPass)

function resetEmail(){
    const emailInput = document.getElementById('forgot-password-email');
    const email = emailInput.value;
    if (email === null){
        throw new Error('Email Field is Empty');
    }
    sendPasswordResetEmail(auth, email)
    .then(() => {
      alert('Password reset email sent!');
    })
    .catch((error) => {
      alert(error.message);
    });
}

const forgotPasswordLink = document.getElementById('send-reset-email-btn');
forgotPasswordLink.addEventListener('click', resetEmail)


// const loginBTN = document.getElementById()
var loginBtn = document.getElementById('login-btn');


// loginWithEmailPassword();
async function createUser(){
    const email = 'email@email21.com';
    const password = 'testpass';
    createUserWithEmailAndPassword(auth, email, password) 
}

async function donate(){
    const bookmarks = addDoc(
        collection(db, 'Users', docRef.id , 'Bookmarks'), {
    });

}

async function signOutUser(){
    try{
        const signedOut =await signOut(auth)
        console.log('logged out');
    } catch(error){
        console.log(error.message);
        console.log('in signoutuser')
    }
}

$(document).ready(function(){

console.log('hehehehe');
    $('#signout-temp').click(signOutUser)

})
signOutUser()
    
    // createUser();




