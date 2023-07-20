// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDgtPvodZLv_tojCpi6f1As0LNS_FH50Tw",
    authDomain: "worshify-52a66.firebaseapp.com",
    projectId: "worshify-52a66",
    storageBucket: "worshify-52a66.appspot.com",
    messagingSenderId: "562597244093",
    appId: "1:562597244093:web:8b9f49089ed9e99048dbd4",
    measurementId: "G-XM8Z5YDF00",
    databaseURL: "https://worshify-52a66-default-rtdb.asia-southeast1.firebasedatabase.app/"
};



// Initialize Firebase
let app;
app = initializeApp(firebaseConfig);
// const analytics = getAnalytics();




const db = getDatabase(app);
const firedb = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);




export { db };
export { auth };
export { firedb };
export { storage };

