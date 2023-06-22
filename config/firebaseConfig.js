import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCuKMt6O789IT-Cj7vXydQXf82mPvND-DY",
  authDomain: "appgestiontutorias-7a10e.firebaseapp.com",
  projectId: "appgestiontutorias-7a10e",
  storageBucket: "appgestiontutorias-7a10e.appspot.com",
  messagingSenderId: "660615688124",
  appId: "1:660615688124:web:3a45bb33687e867133c5b9",
  measurementId: "G-WX371Q81Z4"
};

// initialize firebase
initializeApp(firebaseConfig);
export const database = getFirestore();