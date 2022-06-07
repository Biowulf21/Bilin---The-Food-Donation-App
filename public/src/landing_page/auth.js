import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import {
  connectAuthEmulator,
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDoc,
  setDoc,
  doc,
  connectFirestoreEmulator,
} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAtgFAs4hvlpMQStzVnD3tRJ9N8jLB98b0",
  authDomain: "bilin---the-food-donatio-a24c6.firebaseapp.com",
  projectId: "bilin---the-food-donatio-a24c6",
  storageBucket: "bilin---the-food-donatio-a24c6.appspot.com",
  messagingSenderId: "105362764313",
  appId: "1:105362764313:web:71739e5e422c213546f088",
  measurementId: "G-YLCFCJDLG1",
};
initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
const usersRef = collection(db, "Users");
// connectFirestoreEmulator(db, "localhost", 8080);
// connectAuthEmulator(auth, "http://localhost:9099");

// LOGIN
$(".reusable-component").on(
  "click",
  ".login-btn, .login-btn-large",
  async function loginWithEmailPassword() {
    const emaillogin = document.getElementById("login_page_email_input").value;
    const passwordlogin = document.getElementById(
      "login_page_password_input"
    ).value;
    console.log(emaillogin, passwordlogin);
    try {
      const email = emaillogin;
      const password = passwordlogin;
      onAuthStateChanged(auth, async (user) => {
        try {
          if (!user) {
            const userCredentials = await signInWithEmailAndPassword(
              auth,
              email,
              password
            );
            console.log("User Logged in");
            // determine if user is admin or donor
            //   const userID = auth.currentUser.uid;
            const docRef = doc(db, "Users", auth.currentUser.uid);
            const docsnap = await getDoc(docRef);
            if (docsnap.exists()) {
              if (docsnap.data().accountType === "organization") {
                console.log(docsnap.data().accountType);
                window.location.assign("../../faq.html");
              }
            }
            location.reload(true);
          }
        } catch (err) {
          alert(err.message);
        }
      });

      // console.log(userCredentials.user);
    } catch (err) {
      alert(err.message);
    }
  }
);

// PARTNER SIGNUP
$(".reusable-component").on(
  "click",
  ".partner-signup-btn, .partner-signup-btn-large",
  async function createOrgWithEmaillPass() {
    const orgName = document.getElementById("org-name").value;
    const orgEmail = document.getElementById("org-email").value;
    const orgNum = document.getElementById("org-number").value;
    console.log(orgName, orgEmail, orgNum);
    try {
      throw new Error("Cannot create admin account at this time.");
    } catch (err) {
      alert(err.message);
    }
    // $(function (){
    //     $("#modal-partner").modal("toggle");
    // })
  }
);

// DONOR SIGN UP
$(".reusable-component").on(
  "click",
  ".donor-signup-btn, .donor-signup-btn-large",
  async function createDonorWithEmaillPass() {
    const donorName = document.getElementById("donor-full-name").value;
    const donorEmail = document.getElementById("donor-email").value;
    const donorNumber = document.getElementById("donor-number").value;
    const donorPassword = document.getElementById("donor-password").value;
    const donorConfirmPassword = document.getElementById(
      "donor-confirm-password"
    ).value;
    console.log(
      donorName,
      donorEmail,
      donorNumber,
      donorPassword,
      donorConfirmPassword
    );
    try {
      console.log("creatingUser");
      const email = donorEmail;
      const password = donorPassword;

      if (password !== donorConfirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User Created");
      const docRef = await setDoc(doc(db, "Users", auth.currentUser.uid), {
        id: auth.currentUser.uid,
        name: donorName,
        email: donorEmail,
        number: donorNumber,
        accountType: "donor",
      });
      console.log("User document created");

      const bookmarks = addDoc(
        collection(db, "Users", auth.currentUser.uid, "Bookmarks"),
        {}
      );

      console.log("bookmarks created");

      const donations = addDoc(
        collection(db, "Users", docRef.id, "Donations"),
        {}
      );
      console.log("donations collection created");
      alert("You have created an account!");
      location.reload(true);
    } catch (err) {
      alert(err.message);
    }
    // $(function () {
    //   $("#modal-donor").modal("toggle");
    // });
  }
);

// FORGOT PASSWORD
$(".reusable-component").on(
  "click",
  ".reset-btn, .reset-btn-large",
  function resetEmail() {
    const emailInput = document.getElementById("forgot-password-email").value;
    const email = emailInput;
    console.log(email);
    if (email === null) {
      throw new Error("Email Field is Empty");
    }
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Password reset email sent!");
      })
      .catch((error) => {
        alert(error.message);
      });
  }
);

// const forgotPasswordLink = document.getElementById("send-reset-email-btn");
// forgotPasswordLink.addEventListener("click", resetEmail)

// const loginBTN = document.getElementById()
var loginBtn = document.getElementById("login-btn");

// loginWithEmailPassword();
async function createUser() {
  const email = "email@email21.com";
  const password = "testpass";
  createUserWithEmailAndPassword(auth, email, password);
}

async function donate() {
  const bookmarks = addDoc(collection(db, "Users", docRef.id, "Bookmarks"), {});
}

// SIGN OUT USER
$(".sticky-top").on(
  "click",
  ".signout-btn",
  ".signout-btn-large",
  async function signOutUser() {
    try {
      const signedOut = await signOut(auth);
      console.log("logged out");
      location.reload(true);
    } catch (error) {
      console.log(error.message);
      console.log("in signoutuser");
    }
  }
);

// $("#modal-login").on("shown.bs.modal", function () {
//   $(document).on("click", "login-btn", function () {
//     alert("loggedin");
//   });
// });
