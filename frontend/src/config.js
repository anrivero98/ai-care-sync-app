// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCt5wdQ8ZsM2iH1kzu8zHabRhrhf7rmEgo",
    authDomain: "ai-sync-care.firebaseapp.com",
    projectId: "ai-sync-care",
    storageBucket: "ai-sync-care.appspot.com",
    messagingSenderId: "188030949271",
    appId: "1:188030949271:web:29598dc18784778946d6d2",
    measurementId: "G-Y7CKBYVMF9"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);
  const analytics = getAnalytics(firebaseApp);
  const firestore = getFirestore(firebaseApp);
  const auth = getAuth(firebaseApp);


  export {
    firestore, firebaseApp, analytics, auth // Export the 'auth' object
  };