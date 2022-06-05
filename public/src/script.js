import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc,
  getDocs,
  collection,
  onSnapshot,
  connectFirestoreEmulator,
} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
// import { getAuth } from "firebase/auth";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyAtgFAs4hvlpMQStzVnD3tRJ9N8jLB98b0",
  authDomain: "bilin---the-food-donatio-a24c6.firebaseapp.com",
  projectId: "bilin---the-food-donatio-a24c6",
  storageBucket: "bilin---the-food-donatio-a24c6.appspot.com",
  messagingSenderId: "105362764313",
  appId: "1:105362764313:web:71739e5e422c213546f088",
  measurementId: "G-YLCFCJDLG1",
});

const db = getFirestore(firebaseApp);
const eventsRef = collection(db, "Events");
connectFirestoreEmulator(db, "localhost", 8080);
connectAuthEmulator(auth, "http://localhost:9099");

// will automatically scan for any added events and get its data
function getAllEvents(db, eventsRef) {
  const unsub = onSnapshot(eventsRef, (snapshot) => {
    let events = [];

    snapshot.docs.forEach((doc) => {
      events.push({ ...doc.data(), id: doc.id });
    });
    console.log(events);
  });
}
getAllEvents(db, eventsRef);
