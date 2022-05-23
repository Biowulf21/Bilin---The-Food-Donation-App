import { initializeApp  } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";
import { getFirestore, collection, addDoc, Timestamp, onSnapshot, setDoc, doc, getDocs , connectFirestoreEmulator} from 'https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js';

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
            // create an event document
            const docRef = await addDoc(eventsRef, {
                ...eventInfo
            })

            console.log(docRef.id)
            // create a reference to document above on the user/Events/ collection
            const eventByUser = await setDoc(
                doc(db, 'Users', userID, 'Events', docRef.id), {
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

            console.log(docRef.id);

            // add a volunteers subcollection for under Users/user/Events/event/volunteers
            const eventVolunteers = await addDoc(
                collection(db, 'Users', userID, 'Events', docRef.id, 'Volunteers' ), {
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

            const eventDonations = await addDoc(
                collection(db, 'Users', userID, 'Events', docRef.id, 'Donations' ), {
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

const createEventBtn = document.getElementById('event_add-btn');
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


//DASHBOARD EVENTS
// Open events
async function displayOpenEvents(db, eventsRef) {
    const unsub = onSnapshot(eventsRef, (snapshot) => {

        var html_str = "";

        for (let ctr = 0; ctr < snapshot.docs.length; ctr++) {

            const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

            var date = new Date(snapshot.docs[ctr].data().date.seconds * 1000);
            var dateString = date.getDate() + " " + monthNames[date.getMonth()] + " " + date.getFullYear();
            var timeString = date.getHours() + ":" + date.getMinutes();

            html_str += 

                `<tr>
                    <td class="align-middle text-center text-sm">
                    <!-- JAMES dynamic: event status -->
                    <span class="badge badge-sm bg-gradient-success">Open</span>
                    </td>
                    <td>
                    <div class="d-flex px-2 py-1">
                        <div class="d-flex flex-column justify-content-center">
                        <!-- JAMES dynamic: event title -->
                        <a href="event.html"><h6 class="mb-0 text-sm">` + snapshot.docs[ctr].data().name + `</h6></a>
                        
                        </div>
                    </div>
                    </td>
                    <td class="align-middle text-center">
                    <!-- JAMES dynamic: event date and time -->
                    <span>
                        <p class="text-secondary text-xs font-weight-bold mb-0">` + dateString + `</p>
                        <p class="text-secondary text-xs font-weight-bold mb-0">` + timeString + `</p>
                    </span>  
                    </td>
                    <td class="align-middle text-center">
                    <!-- JAMES dynamic: # of donations accepted -->
                    <span class="text-secondary text-xs font-weight-bold"><a href="donations.html#accepted">3</a></span>
                    </td>
                    <td class="align-middle text-center">
                    <!-- JAMES dynamic: # of donations received -->
                    <span class="text-secondary text-xs font-weight-bold"><a href="donations.html#received">3</a></span>
                    </td>
                    <td class="align-middle text-center">
                    <!-- JAMES dynamic: # of volunteers accepted -->
                    <span class="text-secondary text-xs font-weight-bold"><a href="volunteers.html#accepted">3</a></span>
                    </td>
                    <td class="d-flex justify-content-center">
                    <!-- JAMES function: edit event details; your call nlng, open modal or open event.html page -->
                    <a href="event.html" class="text-secondary font-weight-bold text-xs-3 mx-2">
                        <h5><i class="bi bi-pencil-square"></i></h5>
                    </a>
                    <!-- JAMES function: delete event -->
                    <a href="javascript:;" class="text-secondary font-weight-bold text-xs mx-2">
                        <h5><i class="bi bi-trash-fill"></i></h5>
                    </a>
                    </td>
                </tr>
            `;

            // var s = document.createElement('script');
            // s.type = "text/javascrip";
            // s.src = "./btn.js";
            // $("#show-event-btn").append(s);

            // console.log(snapshot.docs[ctr].data().name);


            // stop until the 4th entry (0,1,2,3)
            if (ctr == 3) break;
        }
        document.getElementById('events_allopen').innerHTML = html_str;
    })
}
displayOpenEvents(db, eventsRef);



// Past events
async function displayPastEvents(db, eventsRef) {
    const unsub = onSnapshot(eventsRef, (snapshot) => {

        var html_str = "";

        for (let ctr = 0; ctr < snapshot.docs.length; ctr++) {

            const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

            var date = new Date(snapshot.docs[ctr].data().date.seconds * 1000);
            var dateString = date.getDate() + " " + monthNames[date.getMonth()] + " " + date.getFullYear();
            var timeString = date.getHours() + ":" + date.getMinutes();

            html_str += 

                `<tr>
                    <td class="align-middle text-center text-sm">
                    <!-- JAMES dynamic: event status -->
                    <span class="badge badge-sm bg-gradient-secondary">Done</span>
                    </td>
                    <td>
                    <div class="d-flex px-2 py-1">
                        <div class="d-flex flex-column justify-content-center">
                        <!-- JAMES dynamic: event title -->
                        <a href="event.html"><h6 class="mb-0 text-sm">` + snapshot.docs[ctr].data().name + `</h6></a>
                        </div>
                    </div>
                    </td>
                    <td class="align-middle text-center">
                    <!-- JAMES dynamic: event date and time -->
                    <span>
                        <p class="text-secondary text-xs font-weight-bold mb-0">` + dateString + `</p>
                        <p class="text-secondary text-xs font-weight-bold mb-0">` + timeString + `</p>
                    </span>  
                    </td>
                    <td class="align-middle text-center">`+
                    //JAMES dynamic: # of donations accepted
                    `<span class="text-secondary text-xs font-weight-bold"><a href="donations.html#accepted">3</a></span>
                    </td>
                    <td class="align-middle text-center">`+
                    //JAMES dynamic: # of donations received
                    `<span class="text-secondary text-xs font-weight-bold"><a href="donations.html#received">3</a></span>
                    </td>
                    <td class="align-middle text-center">`+
                    //JAMES dynamic: # of volunteers accepted
                    `<span class="text-secondary text-xs font-weight-bold"><a href="volunteers.html#accepted">3</a></span>
                    </td>
                    <td class="d-flex justify-content-center">`+
                    //JAMES function: edit event details
                    `<a href="event.html" class="text-secondary font-weight-bold text-xs-3 mx-2">
                        <h5><i class="bi bi-pencil-square"></i></h5>
                    </a>
                    <a href="javascript:;" class="text-secondary font-weight-bold text-xs mx-2">`+
                        //JAMES function: delete event
                        `<h5><i class="bi bi-trash-fill"></i></h5>
                    </a>
                    </td>
                </tr>
            `;

            // var s = document.createElement('script');
            // s.type = "text/javascrip";
            // s.src = "./btn.js";
            // $("#show-event-btn").append(s);

            // console.log(snapshot.docs[ctr].data().name);


            // stop until the 4th entry (0,1,2,3)
            if (ctr == 3) break;
        }
        document.getElementById('events_allpast').innerHTML = html_str;
    })
}
displayPastEvents(db, eventsRef);



//EVENTS
//Navbar Breadcrumb
async function displayNavBreadcrumbs(db, eventsRef) {
    const unsub = onSnapshot(eventsRef, (snapshot) => {

        var html_str = "";

        html_str +=`

                <div>
                    <ol class="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
                        <li class="breadcrumb-item text-sm" class="opacity-5 text-dark">Dashboard</li>
                        <li class="breadcrumb-item text-sm"><a class="opacity-5 text-dark" href="dash_events.html">Events</a></li>
                        <li class="breadcrumb-item text-sm text-dark active" aria-current="page">` + snapshot.docs[ctr].data().name + `</li>
                    </ol>
                    <h6 class="font-weight-bolder mb-0">` + snapshot.docs[ctr].data().name `</h6>
                </div>                
            `;
            
        document.getElementById('admin_breadcrumb').innerHTML = html_str;
    })
}
displayNavBreadcrumbs(db, eventsRef);


//DONATIONS
// Pending donors
async function displayPendingDonors(db, eventsRef) {
    const unsub = onSnapshot(eventsRef, (snapshot) => {

        var html_str = "";

        for (let ctr = 0; ctr < snapshot.docs.length; ctr++) {

            const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

            var date = new Date(snapshot.docs[ctr].data().date.seconds * 1000);
            var dateString = date.getDate() + " " + monthNames[date.getMonth()] + " " + date.getFullYear();
            var timeString = date.getHours() + ":" + date.getMinutes();

            html_str += 

                `<tr>
                    <td class="align-middle text-center text-sm">
                    <!-- JAMES event status -->
                    <span class="badge badge-sm bg-gradient-secondary">Pending</span>
                    </td>
                    <td>
                    <div class="d-flex px-2 py-1">
                        <div class="d-flex flex-column justify-content-center">
                    `+//JAMES dynamic: donor name
                    `
                        <h6 class="mb-0 text-sm">Donor name</h6>
                        </div>
                    </div>
                    </td>
                    <td class="align-middle text-center">
                    `+//JAMES dynamic: donor contact number
                    `
                    <span class="text-secondary text-xs font-weight-bold">0917 XXX XXXX</span>
                    </td>
                    <td class="align-middle text-center">
                    <span>
                        <p class="text-secondary text-xs font-weight-bold mb-0">` + dateString + `</p>
                        <p class="text-secondary text-xs font-weight-bold mb-0">` + timeString + `</p>
                    </span>
                    </td>
                    <td class="d-flex justify-content-center">
                    `+//JAMES function: view donation form details; open modal?
                    `
                    <a href="javascript:;" class="text-secondary font-weight-bold text-xs">
                        <h5><i class="bi bi-eye-fill"></i></h5>
                    </a>
                    <a href="javascript:;" class="text-secondary font-weight-bold text-xs mx-3">
                        `+//<!-- JAMES function: accept donation; send email to donor -->
                        `
                        <h5><i class="bi bi-check-circle text-success"></i></h5>
                    </a>
                    <a href="javascript:;" class="text-secondary font-weight-bold text-xs" style="font-size: larger;">
                        `+//JAMES function: reject donation; open modal (modal nasad hehe) input reason of rejection; send email
                        `
                        <h5><i class="bi bi-x-circle text-danger"></i></h5>
                    </a>
                    </td>
                </tr>
            `;

            // var s = document.createElement('script');
            // s.type = "text/javascrip";
            // s.src = "./btn.js";
            // $("#show-event-btn").append(s);

            // console.log(snapshot.docs[ctr].data().name);


            // stop until the 4th entry (0,1,2,3)
            if (ctr == 3) break;
        }
        document.getElementById('donor_pending').innerHTML = html_str;
    })
}
displayPendingDonors(db, eventsRef);


// Accepted donors
async function displayAcceptedDonors(db, eventsRef) {
    const unsub = onSnapshot(eventsRef, (snapshot) => {

        var html_str = "";

        for (let ctr = 0; ctr < snapshot.docs.length; ctr++) {

            const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

            var date = new Date(snapshot.docs[ctr].data().date.seconds * 1000);
            var dateString = date.getDate() + " " + monthNames[date.getMonth()] + " " + date.getFullYear();
            var timeString = date.getHours() + ":" + date.getMinutes();

            html_str += 

                `<tr>
                    <td class="align-middle text-center text-sm">
                    <!-- JAMES event status -->
                    <span class="badge badge-sm bg-gradient-secondary">Pending</span>
                    </td>
                    <td>
                    <div class="d-flex px-2 py-1">
                        <div class="d-flex flex-column justify-content-center">
                    `+//JAMES dynamic: donor name
                    `
                        <h6 class="mb-0 text-sm">Donor name</h6>
                        </div>
                    </div>
                    </td>
                    <td class="align-middle text-center">
                    `+//JAMES dynamic: donor contact number
                    `
                    <span class="text-secondary text-xs font-weight-bold">0917 XXX XXXX</span>
                    </td>
                    <td class="align-middle text-center">
                    <span>
                        <p class="text-secondary text-xs font-weight-bold mb-0">` + dateString + `</p>
                        <p class="text-secondary text-xs font-weight-bold mb-0">` + timeString + `</p>
                    </span>
                    </td>
                    <td class="d-flex justify-content-center">
                    `+//JAMES function: view donation form details; open modal?
                    `
                    <a href="javascript:;" class="text-secondary font-weight-bold text-xs">
                        <h5><i class="bi bi-eye-fill"></i></h5>
                    </a>
                    <a href="javascript:;" class="text-secondary font-weight-bold text-xs mx-3">
                        `+//<!-- JAMES function: accept donation; send email to donor -->
                        `
                        <h5><i class="bi bi-check-circle text-success"></i></h5>
                    </a>
                    <a href="javascript:;" class="text-secondary font-weight-bold text-xs" style="font-size: larger;">
                        `+//JAMES function: reject donation; open modal (modal nasad hehe) input reason of rejection; send email
                        `
                        <h5><i class="bi bi-x-circle text-danger"></i></h5>
                    </a>
                    </td>
                </tr>
            `;

            // var s = document.createElement('script');
            // s.type = "text/javascrip";
            // s.src = "./btn.js";
            // $("#show-event-btn").append(s);

            // console.log(snapshot.docs[ctr].data().name);


            // stop until the 4th entry (0,1,2,3)
            if (ctr == 3) break;
        }
        document.getElementById('donor_pending').innerHTML = html_str;
    })
}
displayPendingDonors(db, eventsRef);