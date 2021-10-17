import React from 'react';
import firebase from 'firebase';

const firebaseConfig = {
    "YOUR-FIREBASE-PROJECT-INFO-HERE"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const db = firebase.firestore();
db.settings({
    timestampsInSnapshots: true,
});

export default firebase;
