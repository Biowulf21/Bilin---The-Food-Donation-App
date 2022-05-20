import { initializeApp  } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";
import { getFirestore, collection, addDoc, Timestamp, serverTimestamp, setDoc, doc } from 'https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js';

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
            // create an event document
            const docRef = await addDoc(eventsRef, {
                ...eventInfo
            })
            // create a reference to document above on the user/Events/ collection
            const eventByUser = await (
                collection(db, 'Users', userID, 'Events'), {
                    ...eventInfo
                //     eventID:eventInfo.id,
                //     name:eventInfo.name,
                //     volunteerNumber:eventInfo.volunteerNumber,
                //     date:eventInfo.date,
                //     lat:eventInfo.lat,
                //     long:eventInfo.long,
                //     address1:eventInfo.address1,
                //     address2:eventInfo.address2,
                //  imageURL:eventInfo.imageURL
            });

            // add a volunteers subcollection for under Users/user/Events/event/volunteers
            const eventVolunteers = await addDoc(
                collection(db, 'Users', userID, 'Events',  ), {
                name: "test"
                //     eventID:eventInfo.id,
                //     name:eventInfo.name,
                //     volunteerNumber:eventInfo.volunteerNumber,
                //     date:eventInfo.date,
                //     lat:eventInfo.lat,
                //     long:eventInfo.long,
                //     address1:eventInfo.address1,
                //     address2:eventInfo.address2,
                //  imageURL:eventInfo.imageURL
            });

              
        }
    } catch (err){
        alert(err.message);
        console.log('in create event')

    }
    });
}

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

    // loginWithEmailPassword('notail2111@gmail.com', 'testpass')
    // signOutUser(); 
    // createEvent();
