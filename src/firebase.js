import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';










  const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDYVzol2aju6TygbUfr_Dd4a1D2kfItjtE",
  authDomain: "grandkidsgalor-store.firebaseapp.com",
  projectId: "grandkidsgalor-store",
  storageBucket: "grandkidsgalor-store.appspot.com",
  messagingSenderId: "949947241014",
  appId: "1:949947241014:web:145fe81faf239de6a7fe97",
  measurementId: "G-ZTVP3DY32Z" 
    
    
    
  });

  const db = firebaseApp.firestore();

  const auth = firebase.auth();


  export {db, auth};