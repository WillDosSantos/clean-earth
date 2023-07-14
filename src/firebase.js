import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {

  apiKey: "AIzaSyDiRvFB4BQUVrlQmRjugJ33XROHY50HTP0",

  authDomain: "clean-earth-d8d94.firebaseapp.com",

  projectId: "clean-earth-d8d94",

  storageBucket: "clean-earth-d8d94.appspot.com",

  messagingSenderId: "576125194258",

  appId: "1:576125194258:web:371c9a4199f5ae824108cb",

  measurementId: "G-SJ3KGKJ244"


};



const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

