// Import the functions you need from the SDKs you need

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCKQ3dWMsNOH2lxSOBPNvqypx6k9RpqDpU",
  authDomain: "adminpanel-b75bd.firebaseapp.com",
  projectId: "adminpanel-b75bd",
  storageBucket: "adminpanel-b75bd.appspot.com",
  messagingSenderId: "353308868237",
  appId: "1:353308868237:web:5afdc57c695673134dacc4",
  measurementId: "G-MMJNQLXY11"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
// const db = getFirestore(app); // If using Firestore
// const storage = getStorage(app); // If using Storage

// Export the services you need
