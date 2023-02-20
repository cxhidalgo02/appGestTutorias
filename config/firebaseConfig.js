import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAO4Dlrpl7PeALj2dqukC1x5dw7NHzoTxw",
  authDomain: "appgesttutorias.firebaseapp.com",
  databaseURL: "https://appgesttutorias-default-rtdb.firebaseio.com",
  projectId: "appgesttutorias",
  storageBucket: "appgesttutorias.appspot.com",
  messagingSenderId: "1017706378786",
  appId: "1:1017706378786:web:b335cd06b9229bf4277c7b",
  measurementId: "G-1R53FFB5ZF"
};

// initialize firebase
initializeApp(firebaseConfig);
export const database = getFirestore();