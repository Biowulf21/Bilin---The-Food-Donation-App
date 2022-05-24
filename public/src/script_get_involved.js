import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getFirestore, doc, getDoc, getDocs, collection, onSnapshot, connectFirestoreEmulator } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { getStorage, ref, connectStorageEmulator } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-storage.js";



const firebaseApp = initializeApp({
    apiKey: "AIzaSyAtgFAs4hvlpMQStzVnD3tRJ9N8jLB98b0",
    authDomain: "bilin---the-food-donatio-a24c6.firebaseapp.com",
    projectId: "bilin---the-food-donatio-a24c6",
    storageBucket: "bilin---the-food-donatio-a24c6.appspot.com",
    messagingSenderId: "105362764313",
    appId: "1:105362764313:web:71739e5e422c213546f088",
    measurementId: "G-YLCFCJDLG1"
});

const db = getFirestore(firebaseApp);
const eventsRef = collection(db, 'Events')
const storage = getStorage(firebaseApp);
connectStorageEmulator(storage, "localhost", 9199);
connectFirestoreEmulator(db, 'localhost', 8080);

let events = [];

// will automatically scan for any added events and get its data
function getAllEvents(db, eventsRef) {
    const unsub = onSnapshot(eventsRef, (snapshot) => {

        snapshot.docs.forEach((doc) => {
            events.push({ ...doc.data(), id: doc.id });
        })
        // return events
    })
}
getAllEvents(db, eventsRef);

// Display all events 

// TODO : 
//          1. format time
//          2. insert image properly
//          3. pagination

async function displayAllEvents(db, eventsRef) {
    const unsub = onSnapshot(eventsRef, (snapshot) => {

        var html_str = "";

        for (let ctr = 0; ctr < snapshot.docs.length; ctr++) {

            const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

            var date = new Date(snapshot.docs[ctr].data().date.seconds * 1000);
            var dateString = date.getDate() + " " + monthNames[date.getMonth()] + " " + date.getFullYear();
            var timeString = date.getHours() + ":" + date.getMinutes();

            html_str += `

                    <div class="card bg-color1" style="width: 20rem;" id="event-entry">
                        <div class="fill" style="max-height: 200px;">
                            <img src="`+ snapshot.docs[ctr].data().imageURL+`" style="display: block; margin-left: auto; margin-right: auto;">
                        </div>
                        <div class="card-body text-start">
                            <h6 class="card-subtitle mb-2 text-muted">` + dateString + ', ' + timeString + `</h6>
                            <h5 class="card-title">` + snapshot.docs[ctr].data().name + `</h5>
                            <input value=` + snapshot.docs[ctr].id +` id="hidden-input" type="hidden"   data-bs-dismiss="modal"  data-bs-target="#event-modal" data-bs-toggle="modal">
                            <p class="card-text">` + snapshot.docs[ctr].data().address1 + `<br>` + snapshot.docs[ctr].data().address2 + `</p>
                            <div class="container">
                                <div class="row">
                                    <button id="show-event-btn" class="btn bg-color3 text-color2"  data-bs-target="#event-modal" data-bs-toggle="modal" onclick=""> VIEW DETAILS</button>
                                </div>
                            </div>
                        </div>
                    </div>
                
                `;

            
            // stop until the 4th entry (0,1,2,3)
            if (ctr == 3) break;
            $('#event-picture').attr('src', snapshot.docs[ctr].data().imageURL);
            console.log(snapshot.docs[ctr].data().imageURL);
        }
        document.getElementById('events-tab').innerHTML = html_str;
    })
}
displayAllEvents(db, eventsRef);

// $('#show-event-btn').on('click', function(){
//     console.log('hey');
//     $('#modal-event').show();
// })

// setTimeout(function(){

    // const viewDetailsBtn = document.getElementById('show-event-btn');
    // viewDetailsBtn.addEventListener('click', showDetails);
//     showDetails();

// }, 1000); 

// function showDetails(){
//     console.log('hey');
//    const variable =  $('#event-modal').show()
//    console.log(variable)
//     console.log('hello');
// }



