import React from 'react';
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCFzHgoDSr46JmMugJ-ZZAJ-bf-ytmtMB8",
    authDomain: "adobe-904f5.firebaseapp.com",
    projectId: "adobe-904f5",
    storageBucket: "adobe-904f5.appspot.com",
    messagingSenderId: "884549359691",
    appId: "1:884549359691:web:36e612ab98c88f9e32d5ce",
    measurementId: "G-0XNY9QK8KN"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const db = firebase.firestore();
db.settings({
    timestampsInSnapshots: true,
});

export default firebase;