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


                //items
                const time = document.getElementById('donation-time');
                const description = document.getElementById('donation-description');
                const submitBtn = document.getElementById('donation-submit');
                const serve = document.getElementById('donation-serve');
                // const packagedYes = document.getElementById('option1');
                // const packagedNo = document.getElementById('option2');
                const expiryDate = document.getElementById('expiry');
                const nearExpiry = document.getElementById('near-expiry');
                const rejected = document.getElementById('rejected');
                const promotion = document.getElementById('promotion');
                const excess = document.getElementById('excess-inventory');
                const labelerror = document.getElementById('labelling-error');
                const damaged = document.getElementById('damaged');
               const date = document.getElementById('donation-date')
               // Event listeners
                submitBtn.addEventListener('click', donate);
                const docID = document.getElementById("donation-hidden");
                
               async function donate(){

                    data = {
                        pickupDate: date.value,
                        pickupTime: time.value,
                        donationDesc:description.value,
                        peopleServe: serve.value,
                        expiry: expiryDate.value,
                        isnearExpiry: nearExpiry.value,
                        isrjected: rejected.value,
                        ispromotion: promotion.value,
                        isexcess: excess.value,
                        iserror: labelerror.value,
                        isdamaged: damaged.value
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

                        console.log('created Donation');
            }
            

    // $('#donation-modal').on('shown', function(){
    //     $('#donation-btn').on('click', function(){
    //         console.log('oten dako');
    //     })
    // })