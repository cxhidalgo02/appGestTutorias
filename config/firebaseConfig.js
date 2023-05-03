import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAVPprajgJGQqxDToCTVJMIU8-xJ_0awfg",
  authDomain: "appgesttutorias-23149.firebaseapp.com",
  projectId: "appgesttutorias-23149",
  storageBucket: "appgesttutorias-23149.appspot.com",
  messagingSenderId: "315072874555",
  appId: "1:315072874555:web:51ca4036eb60e2e1fe341e",
  measurementId: "G-K0M5RD861K"
};

// initialize firebase
initializeApp(firebaseConfig);
export const database = getFirestore();