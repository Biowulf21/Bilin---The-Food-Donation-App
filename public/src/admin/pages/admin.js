import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  connectAuthEmulator,
} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";
import {
  getFirestore,
  collection,
  addDoc,
  Timestamp,
  onSnapshot,
  setDoc,
  getDoc,
  doc,
  getDocs,
  connectFirestoreEmulator,
} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAtgFAs4hvlpMQStzVnD3tRJ9N8jLB98b0",
  authDomain: "bilin---the-food-donatio-a24c6.firebaseapp.com",
  projectId: "bilin---the-food-donatio-a24c6",
  storageBucket: "bilin---the-food-donatio-a24c6.appspot.com",
  messagingSenderId: "105362764313",
  appId: "1:105362764313:web:71739e5e422c213546f088",
  measurementId: "G-YLCFCJDLG1",
};
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
// const storage = getStorage(firebaseApp);
const eventsRef = collection(db, "Events");
connectFirestoreEmulator(db, "localhost", 8080);
connectAuthEmulator(auth, "http://localhost:9099");

const createEvent = async (user) => {
  //TODO: check if the user logged in is an organization account and if it's not, throw an error
  onAuthStateChanged(auth, async (user) => {
    try {
      if (!user) {
        console.log("You are not Logged in");
        throw new Error("You are not logged in");
      } else {
        // add current admin user's ID to event
        const userID = auth.currentUser.uid;
        const eventInfo = {
          orgID: userID,
          name: "San Ignacio Care for the Poor Supplemental Feeding",
          desc: `The initiative directly responds to Thrust 2 of the Renewed Province Plan of Philippine Jesuit Society.

                The chosen beneficiary community for this activity
                is the informal and vulnerable settlers
                in Ramonal Village in Brgy Nazareth, specifically the children.  
                
                Siegred Paigalan
                09177103545`,
          volunteerNumber: 0,
          date: Timestamp.fromDate(new Date("June 2022")),
          // time:  '09:00:00',
          lat: 41.40338,
          long: 2.17403,
          address1: "Ramonal Village, Nazareth,",
          address2: "Cagayan de Oro, 9000 Misamis Oriental",
          duration: 3,
          beneficiaries: 200,
          volunteerGoal: 10,
          imageURL:
            "https://firebasestorage.googleapis.com/v0/b/bilin---the-food-donatio-a24c6.appspot.com/o/20220327_103614%20-%20Siegred%20Jade%20Roldan%20Lastimoso.jpg?alt=media&token=df3152dd-b6f0-42a8-9786-f8b042917278",
        };
        // create an event document
        const docRef = await addDoc(eventsRef, {
          ...eventInfo,
        });

        console.log(docRef.id);
        // create a reference to document above on the user/Events/ collection
        const eventByUser = await setDoc(
          doc(db, "Users", userID, "Events", docRef.id),
          {
            ...eventInfo,
          }
        );

        console.log(docRef.id);

        // add a volunteers subcollection for under Users/user/Events/event/volunteers
        const eventVolunteers = await addDoc(
          collection(db, "Users", userID, "Events", docRef.id, "Volunteers"),
          {}
        );

        const eventDonations = await addDoc(
          collection(db, "Users", userID, "Events", docRef.id, "Donations"),
          {}
        );
      }
    } catch (err) {
      alert(err.message);
      console.log("in create event");
    }
  });
};

const createEventBtn = document.getElementById("event_add-btn");
createEventBtn.addEventListener("click", createEvent);

// Login
async function loginWithEmailPassword(email, password) {
  try {
    onAuthStateChanged(auth, async (user) => {
      try {
        if (!user) {
          const userCredentials = await signInWithEmailAndPassword(
            auth,
            email,
            password
          );
          console.log("User Logged in");
        } else {
          throw new Error("Already Logged in");
        }
      } catch (err) {
        alert(err.message);
        console.log("in login");
      }
    });

    // console.log(userCredentials.user);
  } catch (err) {
    alert(err.message);
  }
}

async function getAllEvents() {
  const uid = auth.currentUser.uid;
  const query = query(collection(db, "Users", uid));
  const querySnapshot = await getDocs(query);
  querySnapshot.forEach((doc) => {
    console.log(doc.id);
  });
}

async function getAllDonations(eventID) {
  const uid = auth.currentUser.uid;
  const query = query(collection(db, "Users", uid, eventID));
  const querySnapshot = await getDocs(query);
  querySnapshot.forEach((doc) => {
    console.log(doc.id);
  });
}

// loginWithEmailPassword('notail2111@gmail.com', 'testpass')
// createEvent();

//BREADCRUMBS
//event.html
async function displayEventBreadcrumbs(db, eventsRef) {
  $(document).ready(function () {
    const unsub = onSnapshot(eventsRef, (snapshot) => {
      //JAMES di pa ni ga display hehe

      var html_str = "";

      for (let ctr = 0; ctr < snapshot.docs.length; ctr++) {
        console.log(snapshot.docs[ctr].data());

        html_str +=
          `
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
                        <li class="breadcrumb-item text-sm"><a class="opacity-5 text-dark" href="javascript:;">Dashboard</a></li>
                        <li class="breadcrumb-item text-sm"><a class="opacity-5 text-dark" href="dash_events.html">Events</a></li>
                        ` +
          //JAMES dynamic: event title
          `
                        <li class="breadcrumb-item text-sm text-dark active" aria-current="page">` +
          snapshot.docs[ctr].data().name +
          `</li>
                    </ol>
                    ` +
          //JAMES dynamic: event title
          `
                    <h6 class="font-weight-bolder mb-0">` +
          snapshot.docs[ctr].data().name +
          `</h6>
                </nav>
    
                `;

        if (ctr == 3) break;
      }
      document.getElementById("breadcrumb_event").innerHTML = html_str;
    });
  });
}
displayEventBreadcrumbs(db, eventsRef);

//donations.html
async function displayDonorBreadcrumbs(db, eventsRef) {
  const unsub = onSnapshot(eventsRef, (snapshot) => {
    //JAMES di pa ni ga display hehe

    var html_str = "";

    for (let ctr = 0; ctr < snapshot.docs.length; ctr++) {
      html_str +=
        `
            <nav aria-label="breadcrumb">
            <ol class="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
              <li class="breadcrumb-item text-sm"><a class="opacity-5 text-dark" href="javascript:;">Dashboard</a></li>
              <li class="breadcrumb-item text-sm"><a class="opacity-5 text-dark" href="dash_events.html">Events</a></li>
              <li class="breadcrumb-item text-sm text-dark active" aria-current="page">` + //JAMES event title
        +`</li>
            </ol>
            <h6 class="font-weight-bolder mb-0">` + //JAMES event title
        +` <i class="bi bi-chevron-right"></i> Donations</h6>
          </nav>

            `;

      if (ctr == 3) break;
    }
    document.getElementById("breadcrumb_donor").innerHTML = html_str;
  });
}
displayDonorBreadcrumbs(db, eventsRef);

//volunteer.html
async function displayVolunteerBreadcrumbs(db, eventsRef) {
  const unsub = onSnapshot(eventsRef, (snapshot) => {
    //JAMES di pa ni ga display hehe

    var html_str = "";

    for (let ctr = 0; ctr < snapshot.docs.length; ctr++) {
      html_str +=
        `
            <nav aria-label="breadcrumb">
            <ol class="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
              <li class="breadcrumb-item text-sm"><a class="opacity-5 text-dark" href="javascript:;">Dashboard</a></li>
              <li class="breadcrumb-item text-sm"><a class="opacity-5 text-dark" href="dash_events.html">Events</a></li>
              <li class="breadcrumb-item text-sm text-dark active" aria-current="page">` + //JAMES event title
        +`</li>
            </ol>
            <h6 class="font-weight-bolder mb-0">` + //JAMES event title
        +` <i class="bi bi-chevron-right"></i> Volunteers</h6>
          </nav>

            `;

      if (ctr == 3) break;
    }
    document.getElementById("breadcrumb_volunteer").innerHTML = html_str;
  });
}
displayVolunteerBreadcrumbs(db, eventsRef);

//DASHBOARD EVENTS
// Open events
async function displayOpenEvents(db, eventsRef) {
  //getting the number of events per user
  let events = [];
  var items;
  //   const uid = auth.currentUser.uid;
  onAuthStateChanged(auth, async (user) => {
    if (user) {
    } else {
      console.log("Not logged in.");
    }
    const unsub = onSnapshot(
      collection(
        db,
        "Users",
        auth.currentUser.uid,
        "Events",
        // document id for event has to be hardcoded for now
        "aLdTosvIQKmHgG1LCwNk",
        "Donations"
      ),
      (snapshot) => {
        snapshot.docs.forEach((doc) => {
          events.push({ ...doc.data(), id: doc.id });
          if (events.length == snapshot.docs.length) {
            console.log(events.length);
            const unsub = onSnapshot(eventsRef, (snapshot) => {
              var html_str = "";

              for (let ctr = 0; ctr < snapshot.docs.length; ctr++) {
                const monthNames = [
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sep",
                  "Oct",
                  "Nov",
                  "Dec",
                ];

                var date = new Date(
                  snapshot.docs[ctr].data().date.seconds * 1000
                );
                var dateString =
                  date.getDate() +
                  " " +
                  monthNames[date.getMonth()] +
                  " " +
                  date.getFullYear();
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
                                  <a href="event.html"><h6 class="mb-0 text-sm">` +
                  snapshot.docs[ctr].data().name +
                  `</h6></a>
                                  <input id="event-id" type="hidden">
                                  </div>
                                  </div>
                                  </td>
                                  <td class="align-middle text-center">
                                  <!-- JAMES dynamic: event date and time -->
                                  <span>
                                  <p class="text-secondary text-xs font-weight-bold mb-0">` +
                  dateString +
                  `</p>
                                  <p class="text-secondary text-xs font-weight-bold mb-0">` +
                  timeString +
                  `</p>
                  </span>  
                  </td>
                  <td class="align-middle text-center">
                              <!-- JAMES dynamic: # of donations accepted -->
                              <span class="text-secondary text-xs font-weight-bold"><a href="donations.html#accepted">` +
                  events.length +
                  `</a></span>
                              </td>
                              <td class="align-middle text-center">
                              <!-- JAMES dynamic: # of donations received -->
                              <span class="text-secondary text-xs font-weight-bold"><a href="donations.html#received">` +
                  events.length +
                  `</a></span>
                              </td>
                              <td class="align-middle text-center">
                              <!-- JAMES dynamic: # of volunteers accepted -->
                              <span class="text-secondary text-xs font-weight-bold"><a href="volunteers.html#accepted">` +
                  events.length +
                  `</a></span>
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
              document.getElementById("events_allopen").innerHTML = html_str;
            });
          }
        });

        // return events
      }
    );
  });
}
displayOpenEvents(db, eventsRef);

// Past events
async function displayPastEvents(db, eventsRef) {
  const unsub = onSnapshot(eventsRef, (snapshot) => {
    var html_str = "";

    for (let ctr = 0; ctr < snapshot.docs.length; ctr++) {
      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      var date = new Date(snapshot.docs[ctr].data().date.seconds * 1000);
      var dateString =
        date.getDate() +
        " " +
        monthNames[date.getMonth()] +
        " " +
        date.getFullYear();
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
                        <a href="event.html"><h6 class="mb-0 text-sm">` +
        snapshot.docs[ctr].data().name +
        `</h6></a>
                        </div>
                    </div>
                    </td>
                    <td class="align-middle text-center">
                    <!-- JAMES dynamic: event date and time -->
                    <span>
                        <p class="text-secondary text-xs font-weight-bold mb-0">` +
        dateString +
        `</p>
                        <p class="text-secondary text-xs font-weight-bold mb-0">` +
        timeString +
        `</p>
                    </span>  
                    </td>
                    <td class="align-middle text-center">` +
        //JAMES dynamic: # of donations accepted
        `<span class="text-secondary text-xs font-weight-bold"><a href="donations.html#accepted">3</a></span>
                    </td>
                    <td class="align-middle text-center">` +
        //JAMES dynamic: # of donations received
        `<span class="text-secondary text-xs font-weight-bold"><a href="donations.html#received">3</a></span>
                    </td>
                    <td class="align-middle text-center">` +
        //JAMES dynamic: # of volunteers accepted
        `<span class="text-secondary text-xs font-weight-bold"><a href="volunteers.html#accepted">3</a></span>
                    </td>
                    <td class="d-flex justify-content-center">` +
        //JAMES function: edit event details
        `<a href="event.html" class="text-secondary font-weight-bold text-xs-3 mx-2">
                        <h5><i class="bi bi-pencil-square"></i></h5>
                    </a>
                    <a href="javascript:;" class="text-secondary font-weight-bold text-xs mx-2">` +
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
    document.getElementById("events_allpast").innerHTML = html_str;
  });
}
displayPastEvents(db, eventsRef);

//EVENTS
//Donor info
async function displayDonorInfo(db, eventsRef) {
  const unsub = onSnapshot(eventsRef, (snapshot) => {
    //JAMES di pa ni ga display hehe

    var html_str = "";

    for (let ctr = 0; ctr < snapshot.docs.length; ctr++) {
      html_str +=
        `
                <div class="numbers text-center">
                    <p class="text-sm mb-0 text-capitalize font-weight-bold">Pending</p>
                    <h5 class="font-weight-bolder mb-0">
                    ` +
        //James dynamic: # of pending donations
        +`
                    </h5>
                </div>
                <div class="numbers text-center">
                    <p class="text-sm mb-0 text-capitalize font-weight-bold">Accepted</p>
                    <h5 class="font-weight-bolder mb-0">
                    ` +
        //James dynamic: # of accepted donations
        +`
                    </h5>
                </div>
                <div class="numbers text-center">
                    <p class="text-sm mb-0 text-capitalize font-weight-bold">Received</p>
                    <h5 class="font-weight-bolder mb-0">
                    ` +
        //James dynamic: # of received donations
        +`
                    </h5>
                </div>

            `;

      if (ctr == 3) break;
    }
    document.getElementById("event_donorinfo").innerHTML = html_str;
  });
}
displayDonorInfo(db, eventsRef);

//Volunteer info
async function displayVolunteerInfo(db, eventsRef) {
  const unsub = onSnapshot(eventsRef, (snapshot) => {
    //JAMES di pa ni ga display hehe

    var html_str = "";

    for (let ctr = 0; ctr < snapshot.docs.length; ctr++) {
      html_str +=
        `
                <div class="numbers text-center">
                    <p class="text-sm mb-0 text-capitalize font-weight-bold">Pending</p>
                    <h5 class="font-weight-bolder mb-0">
                    ` +
        //James dynamic: # of pending donors
        +`
                    </h5>
                </div>
                <div class="numbers text-center">
                    <p class="text-sm mb-0 text-capitalize font-weight-bold">Accepted</p>
                    <h5 class="font-weight-bolder mb-0">
                    ` +
        //James dynamic: # of accepted donors
        +`
                    </h5>
                </div>
                <div class="numbers text-center">
                    <p class="text-sm mb-0 text-capitalize font-weight-bold">Received</p>
                    <h5 class="font-weight-bolder mb-0">
                    ` +
        //James dynamic: # of rejected donors
        +`
                    </h5>
                </div>

            `;

      if (ctr == 3) break;
    }
    document.getElementById("event_volunteerinfo").innerHTML = html_str;
  });
}
displayVolunteerInfo(db, eventsRef);

//DONATIONS
// Pending donors
async function displayPendingDonors(db, eventsRef) {
  const unsub = onSnapshot(eventsRef, (snapshot) => {
    var html_str = "";

    for (let ctr = 0; ctr < snapshot.docs.length; ctr++) {
      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      var date = new Date(snapshot.docs[ctr].data().date.seconds * 1000);
      var dateString =
        date.getDate() +
        " " +
        monthNames[date.getMonth()] +
        " " +
        date.getFullYear();
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
                    ` +
        //JAMES dynamic: donor name
        `
                        <h6 class="mb-0 text-sm">Donor name</h6>
                        </div>
                    </div>
                    </td>
                    <td class="align-middle text-center">
                    ` +
        //JAMES dynamic: donor contact number
        `
                    <span class="text-secondary text-xs font-weight-bold">0917 XXX XXXX</span>
                    </td>
                    <td class="align-middle text-center">
                    <span>
                        <p class="text-secondary text-xs font-weight-bold mb-0">` +
        dateString +
        `</p>
                        <p class="text-secondary text-xs font-weight-bold mb-0">` +
        timeString +
        `</p>
                    </span>
                    </td>
                    <td class="d-flex justify-content-center">
                    ` +
        //JAMES function: view donation form details; open modal?
        `
                    <a href="javascript:;" class="text-secondary font-weight-bold text-xs">
                        <h5><i class="bi bi-eye-fill"></i></h5>
                    </a>
                    <a href="javascript:;" class="text-secondary font-weight-bold text-xs mx-3">
                        ` +
        //JAMES function: accept donation; send email to donor
        `
                        <h5><i class="bi bi-check-circle text-success"></i></h5>
                    </a>
                    <a href="javascript:;" class="text-secondary font-weight-bold text-xs" style="font-size: larger;">
                        ` + //JAMES function: reject donation; open modal (modal nasad hehe) input reason of rejection; send email
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
    document.getElementById("donor_pending").innerHTML = html_str;
  });
}
displayPendingDonors(db, eventsRef);

// Accepted donors
async function displayAcceptedDonors(db, eventsRef) {
  const unsub = onSnapshot(eventsRef, (snapshot) => {
    var html_str = "";

    for (let ctr = 0; ctr < snapshot.docs.length; ctr++) {
      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      var date = new Date(snapshot.docs[ctr].data().date.seconds * 1000);
      var dateString =
        date.getDate() +
        " " +
        monthNames[date.getMonth()] +
        " " +
        date.getFullYear();
      var timeString = date.getHours() + ":" + date.getMinutes();

      html_str +=
        `<tr>
                    <td class="align-middle text-center text-sm">
                    <span class="badge badge-sm bg-gradient-success">` + //JAMES donor status
        +`</span>
                    </td>
                    <td>
                    <div class="d-flex px-2 py-1">
                        <div class="d-flex flex-column justify-content-center">
                        <h6 class="mb-0 text-sm">` + //JAMES donor name
        +`</h6>
                        </div>
                    </div>
                    </td>
                    <td class="align-middle text-center">
                    <span class="text-secondary text-xs font-weight-bold">` + //JAMES donor contact number
        +`</span>
                    </td>
                    <td class="align-middle text-center">
                    <span>
                        <p class="text-secondary text-xs font-weight-bold mb-0">` +
        dateString +
        `</p>
                        <p class="text-secondary text-xs font-weight-bold mb-0">` +
        timeString +
        `</p>
                    </span>
                    </td>
                    <td class="d-flex justify-content-center align-items-center">
                        <a href="javascript:;" class="text-secondary font-weight-bold text-xs text-info mx-3">
                        Mark as Received ` + //JAMES function: mark donation as received; transfer data from Accepted to Received
        `
                    </a>
                    <a href="javascript:;" class="text-secondary font-weight-bold text-xs">
                        <h5><i class="bi bi-eye-fill"></i></h5> ` + //JAMES function: view donor donation form
        `
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
    document.getElementById("donor_accepted").innerHTML = html_str;
  });
}
displayAcceptedDonors(db, eventsRef);

// Received donors
async function displayReceivedDonors(db, eventsRef) {
  const unsub = onSnapshot(eventsRef, (snapshot) => {
    var html_str = "";

    for (let ctr = 0; ctr < snapshot.docs.length; ctr++) {
      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      var date = new Date(snapshot.docs[ctr].data().date.seconds * 1000);
      var dateString =
        date.getDate() +
        " " +
        monthNames[date.getMonth()] +
        " " +
        date.getFullYear();
      var timeString = date.getHours() + ":" + date.getMinutes();

      html_str +=
        `<tr>
                    <td class="align-middle text-center text-sm">
                    <span class="badge badge-sm bg-gradient-info">` + //JAMES donor status
        +`</span>
                    </td>
                    <td>
                    <div class="d-flex px-2 py-1">
                        <div class="d-flex flex-column justify-content-center">
                        <h6 class="mb-0 text-sm">` + //JAMES donor name
        +`</h6>
                        </div>
                    </div>
                    </td>
                    <td class="align-middle text-center">
                    <span class="text-secondary text-xs font-weight-bold">` + //JAMES donor contact number
        +`</span>
                    </td>
                    <td class="align-middle text-center">
                    <span class="text-secondary text-xs font-weight-bold">` +
        dateString +
        `</span>
                    </td>
                    <td class="text-center align-middle">
                    <a href="javascript:;" class="text-secondary font-weight-bold text-xs">
                        <h5><i class="bi bi-eye-fill"></i></h5>` + //JAMES function: view donor donation form -->
        `
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
    document.getElementById("donor_received").innerHTML = html_str;
  });
}
displayReceivedDonors(db, eventsRef);

//Rejected donors
async function displayRejectedDonors(db, eventsRef) {
  const unsub = onSnapshot(eventsRef, (snapshot) => {
    var html_str = "";

    for (let ctr = 0; ctr < snapshot.docs.length; ctr++) {
      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      var date = new Date(snapshot.docs[ctr].data().date.seconds * 1000);
      var dateString =
        date.getDate() +
        " " +
        monthNames[date.getMonth()] +
        " " +
        date.getFullYear();
      var timeString = date.getHours() + ":" + date.getMinutes();

      html_str +=
        `<tr>
                    <td class="align-middle text-center text-sm">
                    <!-- JAMES event status -->
                    <span class="badge badge-sm bg-gradient-danger">Rejected</span>
                    </td>
                    <td>
                    <div class="d-flex px-2 py-1">
                        <div class="d-flex flex-column justify-content-center">
                        <h6 class="mb-0 text-sm">` + //JAMES donor name
        +`</h6>
                        </div>
                    </div>
                    </td>
                    <td class="align-middle text-center">
                    <!-- JAMES dynamic: contact number -->
                    <span class="text-secondary text-xs font-weight-bold">` + //JAMES donor contact number
        +`</span>
                    </td>
                    <td class="align-middle text-center">
                    <span>
                        <!-- JAMES dynamic: 'deliver by' date and time -->
                        <p class="text-secondary text-xs font-weight-bold mb-0">` +
        dateString +
        `</p>
                        <p class="text-secondary text-xs font-weight-bold mb-0">` +
        timeString +
        `</p>
                    </span>
                    </td>
                    <td class="d-flex justify-content-center">
                    
                    <a href="javascript:;" class="text-secondary font-weight-bold text-xs-3 mx-3">
                        <h5><i class="bi bi-eye-fill"></i></h5>` + //<!-- JAMES function: view donor donation form -->
        `
                    </a>
                    <a href="javascript:;" class="text-secondary font-weight-bold text-xs">
                        <h5><i class="bi bi-trash-fill"></i></h5>` + //<!-- JAMES function: delete rejected donation -->
        `
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
    document.getElementById("donor_rejected").innerHTML = html_str;
  });
}
displayRejectedDonors(db, eventsRef);

//VOLUNTEERS
//pending volunteers
async function displayPendingVolunteer(db, eventsRef) {
  const unsub = onSnapshot(eventsRef, (snapshot) => {
    var html_str = "";

    for (let ctr = 0; ctr < snapshot.docs.length; ctr++) {
      html_str +=
        `<tr>
                    <td class="align-middle text-center text-sm">
                        <span class="badge badge-sm bg-gradient-secondary">` + //JAMES volunteer status
        +`</span>
                    </td>
                    <td>
                        <div class="d-flex px-2 py-1">
                            <div class="d-flex flex-column justify-content-center">
                                <h6 class="mb-0 text-sm">` + //JAMES volunteer name
        +`</h6>
                            </div>
                        </div>
                    </td>
                    <td class="align-middle text-center">
                        <span class="text-secondary text-xs font-weight-bold">` + //JAMES contact number
        +`</span>
                    </td>
                    <td class="align-middle text-center">
                        <span class="text-secondary text-xs font-weight-bold">` + //JAMES volunteer occupation
        +`</span>
                    </td>
                    <td class="d-flex justify-content-center">
                        <a href="javascript:;" class="text-secondary font-weight-bold text-xs">
                            <h5><i class="bi bi-eye-fill"></i></h5>` + //JAMES function: view volunteer form
        `
                        </a>
                        <a href="javascript:;" class="text-secondary font-weight-bold text-xs mx-3">
                            <h5><i class="bi bi-check-circle text-success"></i></h5>` + //JAMES function: accept volunteer; send email since wala pa ta messaging feature
        `
                        </a>
                        <a href="javascript:;" class="text-secondary font-weight-bold text-xs" style="font-size: larger;">
                            <h5><i class="bi bi-x-circle text-danger"></i></h5>` + //JAMES function: reject volunteer; open modal, input reason why rejected, send email
        `
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
    document.getElementById("volunteer_pending").innerHTML = html_str;
  });
}
displayPendingVolunteer(db, eventsRef);

//accepted volunteers
async function displayAcceptedVolunteer(db, eventsRef) {
  const unsub = onSnapshot(eventsRef, (snapshot) => {
    var html_str = "";

    for (let ctr = 0; ctr < snapshot.docs.length; ctr++) {
      html_str +=
        `<tr>
                    <td class="align-middle text-center text-sm">
                        <span class="badge badge-sm bg-gradient-success">` + //JAMES volunteer status
        +`</span>
                    </td>
                    <td>
                        <div class="d-flex px-2 py-1">
                            <div class="d-flex flex-column justify-content-center">
                            <h6 class="mb-0 text-sm">` + //JAMES volunteer name
        +`</h6>
                            </div>
                        </div>
                        </td>
                        <td class="align-middle text-center">
                            <span class="text-secondary text-xs font-weight-bold">` + //JAMES volunteer contact number
        +`</span>
                        </td>
                        <td class="align-middle text-center">
                            <span class="text-secondary text-xs font-weight-bold">` + //JAMES volunteer occupation +
        `</span>
                        </td>
                        <td class="text-center align-middle">
                            <a href="javascript:;" class="text-secondary font-weight-bold text-xs">
                            <h5><i class="bi bi-eye-fill"></i></h5>` + //JAMES function: view volunteer form -->
        `
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
    document.getElementById("volunteer_accepted").innerHTML = html_str;
  });
}
displayAcceptedVolunteer(db, eventsRef);

//Rejected volunteer
async function displayRejectedVolunteer(db, eventsRef) {
  const unsub = onSnapshot(eventsRef, (snapshot) => {
    var html_str = "";

    for (let ctr = 0; ctr < snapshot.docs.length; ctr++) {
      html_str +=
        `<tr>
                    <td class="align-middle text-center text-sm">
                        <span class="badge badge-sm bg-gradient-danger">` + //JAMES volunteer status
        +`</span>
                    </td>
                    <td>
                        <div class="d-flex px-2 py-1">
                            <div class="d-flex flex-column justify-content-center">
                            <h6 class="mb-0 text-sm">` + //JAMES volunteer name
        +`</h6>
                            </div>
                        </div>
                    </td>
                    <td class="align-middle text-center">
                        JAMES dynamic: volunteer contact number
                        <span class="text-secondary text-xs font-weight-bold">` + //JAMES volunteer contact number
        +`</span>
                    </td>
                    <td class="align-middle text-center">
                        JAMES dynamic: volunteer occupation
                        <span class="text-secondary text-xs font-weight-bold">` + //JAMES volunteer occupation
        +`</span>
                    </td>
                    <td class="d-flex justify-content-center">
                        <a href="javascript:;" class="text-secondary font-weight-bold text-xs-3 mx-3">
                            <h5><i class="bi bi-eye-fill"></i></h5>` + //JAMES function: view volunteer form
        `
                        </a>
                        <a href="javascript:;" class="text-secondary font-weight-bold text-xs">
                            <h5><i class="bi bi-trash-fill"></i></h5>` + //JAMES function: delete rejected volunteer
        `
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
    document.getElementById("volunteer_rejected").innerHTML = html_str;
  });
}
displayRejectedVolunteer(db, eventsRef);
