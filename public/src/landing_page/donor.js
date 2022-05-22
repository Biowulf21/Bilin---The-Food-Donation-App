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




                //items
                const time = document.getElementById('donation-time');
                const description = document.getElementById('donation-description');
                const submitBtn = document.getElementById('donation-btn');
                const serve = document.getElementById('donation-serve');
                // const packagedYes = document.getElementById('option1');
                // const packagedNo = document.getElementById('option2');
                const expiryDate = document.getElementById('expiry');
                const nearExpiry = document.getElementById('near-expiry');
                const rejected = document.getElementById('rejected');
                const promotion = document.getElementById('promotion');
                const excess = document.getElementById('excess-inventory');
                const error = document.getElementById('labelling-error');
                const damaged = document.getElementById('damaged');
               const date = document.getElementById('donation-date')
               // Event listeners
                submitBtn.addEventListener('click', donate);
                const hidden = document.getElementById("donation-hidden");
                
               async function donate(){

                    data = [
                        pickupDate: date.value,


                    ]
                    console.log(hidden.value);
                    console.log(date.value);
                    console.log(time.value);
                    console.log(serve.value);
                    // console.log(packagedYes.value);
                    // console.log(packagedNo.value);
                    console.log(expiryDate.value);
                    console.log(nearExpiry.value);
                    console.log(rejected.value);
                    console.log(promotion.value);
                    console.log(excess.value);
                    console.log(error.value);
                    console.log(damaged.value);
                    console.log(description.value);

                        const bookmarks = addDoc(
                            collection(db, 'Users', docRef.id , 'Bookmarks'), {
                        

                }
                        )
            }
            

    // $('#donation-modal').on('shown', function(){
    //     $('#donation-btn').on('click', function(){
    //         console.log('oten dako');
    //     })
    // })