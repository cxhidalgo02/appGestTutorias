import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyB2xt4xhFWRMaZcK46hN4VwsbJE-kMM1Zg",
  authDomain: "databasefirebase-9a17e.firebaseapp.com",
  projectId: "databasefirebase-9a17e",
  storageBucket: "databasefirebase-9a17e.appspot.com",
  messagingSenderId: "24528262519",
  appId: "1:24528262519:web:7fa5719ab8efa2785cbd72"
};

// initialize firebase
initializeApp(firebaseConfig);
export const database = getFirestore();