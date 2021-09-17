import React from 'react';
import firebase, { db } from '../firebase-config';
require("firebase/firestore");

export default function Services(provider) {
    firebase.auth().signInWithPopup(provider)
    .then((res) => {
        var user = res.user;
        var userId = user.uid;

        firebase.firestore().collection("users")
        .doc(firebase.auth().currentUser.uid)
        .set({
            username: user.displayName,
            email: user.email,
        }).then(() => {
            console.log("writen to database");
            return user;
        }).catch(() => {
            console.log("not written :)");
        });
        
    }).catch((error) => {
        console.error(error);
    })
}