// Import FirebaseAuth and firebase.
// import React from 'react';
import firebase from 'firebase';

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
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to /Home after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: '/',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ]
};

export function getUserAvatar(){
    var storageRef = firebase.storage().ref();
    var dogRef = storageRef.child('Dog');
}

export function verifyAccount(userId, name, email) {
  var ref = firebase.database().ref()
  
  var userRef = ref.child("users/" + userId);
  
  userRef.once("value").then(function (snapshot) {
    if (snapshot.val() != null) {
        //console.log("User exists")
    }
    else {
        //console.log("User doesn't exist")
        ref.child("users/" + userId).set({
            username: name,
            email: email,
            dog: {
                name: "Doggy",
                breed: "Husky",
                emotion: "Happy",
                fur: "Grey",
                color: "Blue"
            }
        })
    }
  })
  
  return;
}
