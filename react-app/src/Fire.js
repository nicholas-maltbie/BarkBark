// Import FirebaseAuth and firebase.
// import React from 'react';
import firebase from 'firebase';
import firebaseui from 'firebase';

// Configure Firebase.
var config = {
    apiKey: "AIzaSyCmbPvrhZHwC4zF5NI9vVFCg4YfnwmRkqs",
    authDomain: "barkbark-9155d.firebaseapp.com",
    databaseURL: "https://barkbark-9155d.firebaseio.com",
    projectId: "barkbark-9155d",
    storageBucket: "barkbark-9155d.appspot.com",
    messagingSenderId: "529994116829"
};

firebase.initializeApp(config);

// Configure FirebaseUI.
export const uiConfig = {
  callbacks: {},
  signInFlow: 'redirect',
  // Redirect to /Home after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: '/',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ]
};

export async function getUserInfo(userId){ //Get function for user snapshot
    return firebase.database().ref('/users/' + userId).once("value")
}


export function verifyAccount(userId, name, email) {
  var ref = firebase.database().ref()
  ref.child("users/" + userId).once("value", function (snapshot) {
    if (snapshot.val() != null) {
        //console.log("User exists")
    }
    else {
        //console.log("User doesn't exist")
        ref.child("users").child(userId).set({
            username: name,
            email: email,
            dog: {
                name: "Dog",
                breed: "BOX",
                emotion: "BOX_HAP",
                fur: "BOX_HAP_BROWN",
                eye: "BOX_HAP_296921",
                color: "Blue"
            }
        })
    }
  })
  return;
}
