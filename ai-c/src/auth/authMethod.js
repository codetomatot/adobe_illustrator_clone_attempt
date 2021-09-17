import React from 'react';
import firebase from '../firebase-config';

export const githubLogin = new firebase.auth.GithubAuthProvider();
export const googleLogin = new firebase.auth.GoogleAuthProvider();
