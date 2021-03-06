import { initializeApp  } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";
import { getFirestore, collection, addDoc, Timestamp, serverTimestamp, setDoc, doc, getDocs , getDoc} from 'https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js';
import { getStorage, ref, connectStorageEmulator, uploadBytes} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-storage.js";
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
const storage = getStorage();

   

$('#event-modal').on('shown.bs.modal', function(){
    const donateBtn = document.getElementById('donate_submit');
    const volunteerBTn = document.getElementById('volunteer_submit')
    const eventID = document.getElementById('donation-hidden');

    // const foo  = await getDoc(
    //     doc(db, 'Events', eventID.value));

    //     const orgUID = foo.data().orgID;

    // $('org-profile-link').attr('href', _href, +'hehe')
    $('#donation-hidden').val($('#hidden-input').val())
    $('#volunteer-hidden').val($('#hidden-input').val())



    volunteerBTn.addEventListener('click', async ()=> {
        try{

            onAuthStateChanged(auth, (user)=> {
                if (!auth){
                    throw new Error('You cannot volunteer if you are not logged in');
                }

            })

            const title =  document.getElementById('volunteer_title');
            const job = document.getElementById('volunteer_occupation');
            const dob = document.getElementById('volunteer_bday');
            const mail = document.getElementById('volunteer_email');
            const addr = document.getElementById('volunteer_home');
            const whyVolunteer = document.getElementById('volunteer_reason');
            const volunteerHidden = document.getElementById('volunteer-hidden');
            // const waiver = document.getElementById('volunteer_upload');

            // if (waiver.value !== null){

            //     const storageRef =  ref(storage, 'waivers/'+waiver.value);
            //     const waiveRef = uploadBytes(storageRef, waiver.value).then((snapshot) => {
            //         console.log('uploaded file');
            //     })

            


            const data = {
                volTitle: title.value,
                occupation: job.value,
                bday: dob.value,
                email: mail.value,
                address: addr.value,
                reason: whyVolunteer.value,
                // waiver: waiveRef
            }

            console.log(storageRef.value);
            console.log(volunteerHidden.value);
        
            //get Organizations id from Events collection
            const orgRef = await getDoc(
                doc(db, 'Events', volunteerHidden.value))
            const orgID = orgRef.data().orgID;
            console.log(orgID);
                
            //add donor's ID to specific event's volunteers
            const docRef = await setDoc(
                doc(db, "Users", orgID, 'Events', volunteerHidden.value, 'Volunteers', auth.currentUser.uid),{
                    ...data
                }
                )
        
                console.log('Volunteer successful!');
                alert('Volunteer successful!');
        // }
    }catch (error ){
            alert(error.message)
        }

    })
    
    donateBtn.addEventListener('click', async ()=>  {
        try{

        onAuthStateChanged(auth, (user)=> {

            try{
                if (auth){
                    throw new Error('You cannot donate if you are not logged in.');
                }

            } catch (error){
                alert(error.message)
            }
            
           
        })
               
       const date = document.getElementById('donate_deliver-date')
       const time = document.getElementById('donate_deliver-time');
       const description = document.getElementById('donate_description');
       const serve = document.getElementById('donate_serve');
       // const packagedYes = document.getElementById('option1');
       // const packagedNo = document.getElementById('option2');
       const expiryDate = document.getElementById('donate_expiry');
       const freshness = document.getElementById('donate_freshness');
       const nearExpiry = $('#donate_reason1').is(':checked');
       const rejected = $('#donate_reason2').is(':checked');
       const promotion = $('#donate_reason3').is(':checked');
       const excess = $('#donate_reason4').is(':checked');
       const labelerror = $('#donate_reason5').is(':checked');
       const damaged = $('#donate_reason6').is(':checked');
       const donateHidden = document.getElementById('donation-hidden');

    //    console.log(date.value);

      const  data = {
        pickupDate: date.value,
        pickupTime: time.value,
        donationDesc:description.value,
        peopleServe: serve.value,
        expiry: expiryDate.value,
        freshnessLvl: freshness.value,
        isnearExpiry: nearExpiry,
        isrjected: rejected,
        ispromotion: promotion,
        isexcess: excess,
        iserror: labelerror,
        isdamaged: damaged,
        isApprovedbByOrg: false
    }

    console.log(data);
    console.log(donateHidden.value);

    //get Organizations id from Events collection
    const orgRef = await getDoc(
        doc(db, 'Events', donateHidden.value)
    )
    const orgID = orgRef.data().orgID;
    console.log(orgID);
        
    //add donor's ID to specific event's donations
    const docRef = await setDoc(
        doc(db, "Users", orgID, 'Events', donateHidden.value, 'Donations', auth.currentUser.uid),{
            ...data
        }
        )

        console.log('donation added');
        alert('Donation sucessful!');

} catch (error){
    alert(error.message)
}

    });

    

    })

    $('#donation-modal').on('shown.bs.modal', function (){
        const docID = document.getElementById("donation-hidden");
        $('#donation-hidden').val(docID.value)
        console.log(docID.value);
    })

            
   
