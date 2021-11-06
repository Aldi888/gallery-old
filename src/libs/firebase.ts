import { initializeApp } from 'firebase/app' ;
import { getStorage } from 'firebase/storage' ;

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASEURL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MENSSAGINGSENDERID,
    appId: process.env.REACT_APP_FIREBASE_APPID,
    measurementId: Process.env.REACT_APP_FIREBASE_MEASUREMENTID
  };
  
  
  const firebaseapp = initializeApp(firebaseConfig);
  
  export const storage = getStorage(firebaseapp);