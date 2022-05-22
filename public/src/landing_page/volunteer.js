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
                const fname = document.getElementById('donate_full-name');
                const contact = document.getElementById('donate_contact');
                const date = document.getElementById('donate_deliver-date')
                const time = document.getElementById('donate_deliver-time');
                const description = document.getElementById('donate_description');
                const serve = document.getElementById('donate_serve');
                // const packagedYes = document.getElementById('donate_radio1');
                // const packagedNo = document.getElementById('donate_radio2');
                const expiryDate = document.getElementById('donate_expiry');
                const freshness = document.getElementById('donate_freshness');
                const nearExpiry = document.getElementById('donate_reason1');
                const rejected = document.getElementById('donate_reason2');
                const promotion = document.getElementById('donate_reason3');
                const excess = document.getElementById('donate_reason4');
                const error = document.getElementById('donate_reason5');
                const damaged = document.getElementById('donate_reason6');
                const upload = document.getElementById('donate_upload');
                const submitBtn = document.getElementById('donate_submit');

               
               // Event listeners
                submitBtn.addEventListener('click', donate);
                const hidden = document.getElementById("donation-hidden");
                
               async function donate(){

                    data = [
                        pickupDate: date.value,


                    ]
                    const fname = document.getElementById('volunteer_full-name');
                    const contact = document.getElementById('volunteer_contact');
                    // const date = document.getElementById('volunteer_title')
                    // const time = document.getElementById('volunteer_occupation');
                    const bday = document.getElementById('volunteer_bday');
                    const email = document.getElementById('volunteer_email');
                    const home = document.getElementById('volunteer_home');
                    const reason = document.getElementById('volunteer_reason');
                    const upload = document.getElementById('volunteer_upload');

                

                    console.log(fname.value);
                    console.log(contact.value);
                    console.log(bday.value);
                    console.log(email.value);
                    console.log(home.value);
                    console.log(reason.value);
                    console.log(upload.value);
                    // console.log(packagedYes.value);
                    // console.log(packagedNo.value);
                    console.log(expiryDate.value);
                    console.log(freshness.value);
                    console.log(nearExpiry.value);
                    console.log(rejected.value);
                    console.log(promotion.value);
                    console.log(excess.value);
                    console.log(error.value);
                    console.log(damaged.value);
                    console.log(upload.value);

                        const bookmarks = addDoc(
                            collection(db, 'Users', docRef.id , 'Bookmarks'), {
                        

                }
                        )
            }
            

    // $('#donation-modal').on('shown', function(){
    //     $('#donate_submit').on('click', function(){
    //         console.log('oten dako');
    //     })
    // })