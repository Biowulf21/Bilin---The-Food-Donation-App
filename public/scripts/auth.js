import {
    loginBtn,
    loginEmail,
    loginPassword,
    forgotPassword
} from './ui_references';
import { CONFIG } from './firebase-config';
import {
    getAuth,
    connectAuthEmulator,
    signInWithEmailAndPassword
} from 'firebase/auth';

const auth = getAuth(CONFIG);

// const emulator = connectAuthEmulator(auth, 'http://localhost:9000');
const BtnLogin = document.getElementById('login-btn');
const emaillogin = document.getElementById('login_page_email_input');
const passwordlogin = document.getElementById('login_page_password_input')
const loginWithEmailPassword = async () => {
    const email = 'testemail@email.com';
    // emaillogin.value;
    const password = 'testpass21!';
    // passwordlogin.value;
    const userCredentials = await signInWithEmailAndPassword(auth, email, password);
    console.log(userCredential.user);
}

BtnLogin.addEventListener('click', loginWithEmailPassword)





