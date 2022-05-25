import { initializeApp  } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";
import { getFirestore, collection, addDoc, Timestamp, serverTimestamp, setDoc, doc, getDocs , getDoc} from 'https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js';

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

$(document).ready( function (){

    $('#create-modal').on('shown.bs.modal', function(){


        const title = document.getElementById('event_title');
        const start = document.getElementById('event_start');
        const end = document.getElementById('event_end');
        const about = document.getElementById('event_about');
        const fruit = document.getElementById('event_accept-fruit');
        const meat = document.getElementById('event_accept-meat');
        const seafood = document.getElementById('event_accept-seafood');
        const processed = document.getElementById('event_accept-processed');
        const cooked = document.getElementById('event_accept-cooked');
        const bread = document.getElementById('event_accept-bread');
        const canned = document.getElementById('event_accept-canned');
        const instant = document.getElementById('event_accept-instant');
        const dryGood = document.getElementById('event_accept-dry');
        const other = document.getElementById('event_accept-other');
        const numVolunteer = document.getElementById('event_volunteer');
        const location = document.getElementById('event_location');
        const upload = document.getElementById('event_upload');
        const    submitBtn = document.getElementById('event_add-btn') 
        // Event listeners
        submitBtn.addEventListener('click', create);
        const docID = document.getElementById("event-hidden");

    })



})
                //items
                
                
               async function create(){

                    data = {
                        eventTitle: title.value,
                        eventStart: start.value,
                        eventEnd: end.value,
                        eventDesc: about.value,
                        isFruit: fruit.value,
                        isMeat: meat.value,
                        isSeafood: seafood.value,
                        isProcessed: processed.value,
                        isCooked: cooked.value,
                        isBread: bread.value,
                        isCanned: canned.value,
                        isInstant: instant.value,
                        isDryGood: dryGood.value,
                        isOther: other.value,
                        eventVolun: numVolunteer.value,
                        eventLoc: location.value,
                        eventFile: upload.value,
                    }

                    //get specific event on events collection
                    const docRef = getDoc(
                        collection(db, "Events", docID)
                    )
                    
                    //get value for orgID
                    const orgID = docRef['orgID'];
                    console.log(orgID)

                    //add donation to org's event under the donation sub collection
                        const donation = setDoc(
                            doc(db, 'Users', orgID , 'Events', docID, "Donations", auth.currentUser.uid), {
                ...data

                }
                        );

                        console.log('created Event');
            }
            

    // $('#create-modal').on('shown', function(){
    //     $('#volunteer-submit').on('click', function(){
    //         console.log('oten dako');
    //     })
    // })