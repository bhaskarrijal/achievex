import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    // apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    // authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    // projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    // storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    // messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    // appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    apiKey: 'AIzaSyDKbvYVr1sf2imqoSqkwo_eVUdFHBxIKPc',
    authDomain: 'achievex-18c0a.firebaseapp.com',
    projectId: 'achievex-18c0a',
    storageBucket: 'achievex-18c0a.appspot.com',
    messagingSenderId: '170405838982',
    appId: '1:170405838982:web:fc83553c70938bd4551107',
};

// Initialize Firebase
let firebase_app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const db = getFirestore(firebase_app);

export default firebase_app;