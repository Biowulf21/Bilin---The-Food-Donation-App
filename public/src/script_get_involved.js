import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getFirestore, doc, getDoc, getDocs, collection, onSnapshot } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
// import { getAuth } from "firebase/auth";


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

let events = [];

// will automatically scan for any added events and get its data
function getAllEvents(db, eventsRef) {
    const unsub = onSnapshot(eventsRef, (snapshot) => {

        snapshot.docs.forEach((doc) => {
            events.push({ ...doc.data(), id: doc.id });
        })
        // console.log(events);
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

            html_str += '<div class=\"card\" style=\"width: 16rem;\" id=\"event-entry\">';
            html_str += '<svg class=\"bd-placeholder-img card-img-top\" width=\"100%\" height=\"180\"';
            html_str += 'xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"Placeholder: Image cap\"';
            html_str += 'preserveAspectRatio=\"xMidYMid slice\" focusable=\"false\">';

            html_str += '<title>Placeholder</title>';
            html_str += '<rect width=\"100%\" height=\"100%\" fill=\"#868e96\"></rect>';
            html_str += '<text x=\"43%\" y=\"50%\" fill=\"#dee2e6\" dy=\".3em\">Image</text>';
            html_str += '</svg>';

            html_str += '<div class=\"card-body\">';
            const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

            var date = new Date(snapshot.docs[ctr].data().date.seconds * 1000);
            var dateString = date.getDate() + " " + monthNames[date.getMonth()] + " " + date.getFullYear();
            var timeString = date.getHours() + ":" + date.getMinutes();

            html_str += '<h6 class=\"card-subtitle mb-2 text-muted\">' + dateString + ', ' + timeString + ' </h6>';
            html_str += '<h5 class=\"card-title\">' + snapshot.docs[ctr].data().name + '</h5>';
            html_str += '<p class=\"card-text\">' + snapshot.docs[ctr].data().address1 + '<br>' + snapshot.docs[ctr].data().address2 + '</p>';
            html_str += '<button id=\"show-event-btn"\ class=\"btns as bg-color3 text-color2 \ data-bs-dismiss=\"modal"\  data-bs-target=\"#event-modals"\ data-bs-toggle=\"modal"\>VIEW';
            html_str += 'DETAILS</button>';
            html_str += '</div>';
            html_str += '</div>';

            // console.log(snapshot.docs[ctr].data().name);


            // stop until the 4th entry (0,1,2,3)
            if (ctr == 3) break;
        }

        // add to events-container
        document.getElementById('events-container').innerHTML = html_str;
    })
}
displayAllEvents(db, eventsRef);

// $('#show-event-btn').on('click', function(){
//     console.log('hey');
//     $('#modal-event').show();
// })

setTimeout(function(){

    // const viewDetailsBtn = document.getElementById('show-event-btn');
    // viewDetailsBtn.addEventListener('click', showDetails);
    showDetails();

}, 1000); 

function showDetails(){
    console.log('hey');
   const variable =  $('#modal-event')
   console.log(variable)
    console.log('hello');
}



