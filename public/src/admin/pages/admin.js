import { initializeApp  } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";
import { getFirestore, collection, addDoc, Timestamp, serverTimestamp, setDoc, doc, getDocs , connectFirestoreEmulator} from 'https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js';

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
const eventsRef  = collection(db, 'Events');
connectFirestoreEmulator(db, 'localhost', 8080);



const createEvent = async (user) => {

    //TODO: check if the user logged in is an organization account and if it's not, throw an error
    onAuthStateChanged(auth, async (user)=> {
        try{
        if (!user){
            console.log('You are not Logged in');
            throw new Error('You are not logged in');
        } else {
            // add current admin user's ID to event
            const userID = auth.currentUser.uid;
            const eventInfo = {
                orgID: userID,
                name: 'Bilin Launch2',
                volunteerNumber: 0,
                date: Timestamp.fromDate(new Date("December 10, 1815")),
                lat: 41.40338,
                long: 2.17403,
                address1: 'Block 1 Lot 14',
            address2: 'Southview Homes, Cagayan de Oro City',
            imageURL: ''
            }

            // console.log(eventInfo);
            // create an event document
            const docRef = await addDoc(eventsRef, {
                ...eventInfo
            })
            // create a reference to document above on the user/Events/ collection
            const eventByUser = await addDoc(
                collection(db, 'Users', userID, 'Events'), {
                    ...eventInfo
            });

            console.log('created event in Events collection');

            // add a volunteers subcollection for under Users/user/Events/event/volunteers
            const eventVolunteers = await addDoc(
                collection(db, 'Users', userID, 'Events', eventByUser.id, 'Volunteers' ), {
                
            });
            console.log('volunteers collection created');
            


            const eventDonations = await addDoc(
                collection(db, 'Users', userID, 'Events', eventByUser.id, 'Donations' ), {
                
            });

            console.log('donations collection created');

              
        }
    } catch (err){
        alert(err.message);
        console.log('in create event')

    }
    });
}

const createEventBtn = document.getElementById('add-event-btn');
createEventBtn.addEventListener('click', createEvent);

// Login
async function loginWithEmailPassword(email, password) {
    try {
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
        console.log('in login')

    }
    });

        // console.log(userCredentials.user);
    } catch (err) {
        alert(err.message);
    }
}

// Log out
async function signOutUser(){
    try{
        const signedOut =await signOut(auth)
        console.log('logged out');
    } catch(error){
        console.log(error.message);
        console.log('in signoutuser')
    }
}

async function getAllEvents(){
    const uid = auth.currentUser.uid;
    const query = query(collection(db, "Users", uid));
    const querySnapshot = await getDocs(query);
    querySnapshot.forEach(doc => {
        console.log(doc.id);
    });
}

async function getAllDonations(eventID){
    const uid = auth.currentUser.uid;
    const query = query(collection(db, "Users", uid, eventID));
    const querySnapshot = await getDocs(query);
    querySnapshot.forEach(doc => {
        console.log(doc.id);
    });
}

    // loginWithEmailPassword('notail2111@gmail.com', 'testpass')
    // signOutUser(); 
    // createEvent();
