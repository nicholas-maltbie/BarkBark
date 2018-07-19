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

function getUser(userId){ //Get snapshot of user in database
    var dbRef = firebase.database().ref('/users/' + userId).once("value")
    .then(function (snapshot) {
        if (snapshot.val() != null) {
            return snapshot.val();
        }
    });
    return dbRef;
}

export async function getUserInfo(userId){ //Get function for user snapshot
    var userInfo = await getUser(userId);
    return userInfo;
}

export function updateUserAvatar(userId, avatar){ //Updates avatar in database, avatar passed in is an object
    var dbRef = firebase.database().ref();
    dbRef.child('users/' + userId).update({
        dog: {
            breed: "Husky",
            color: bgColor,
            emotion: "Happy",
            fur: "Grey",
            name: "Doggy",
            eye: "Grey"
        }
    });
}

var breeds = ["Boxer", "Chihuahua", "Husky", "Labrador", "Poodle", "Spaniel"];
var backgroundColors = ["Blue", "Green", "Yellow", "Orange", "Violet"];
var dataTree = {
    "Boxer": {
        "eyes": {
            'black': "storageName"
        },
        "fur": {
            'white': "storageName"
        },
        "emotion": {
            'happy': "storageName",
            'sad': "storageName"
        },
    },
    "Chihuahua": {
        "eyes": {
            'black': "storageName"
        },
        "fur": {
            'white': "storageName"
        },
        "emotion": {
            'happy': "storageName",
            'sad': "storageName"
        },
    },
    "Husky": {
        "eyes": {
            'black': "storageName"
        },
        "fur": {
            'white': "storageName"
        },
        "emotion": {
            'happy': "storageName",
            'sad': "storageName"
        },
    },
    "Labrador": {
        "eyes": {
            'black': "storageName"
        },
        "fur": {
            'white': "storageName"
        },
        "emotion": {
            'happy': "storageName",
            'sad': "storageName"
        },
    },
    "Poodle": {
        "eyes": {
            'black': "storageName"
        },
        "fur": {
            'white': "storageName"
        },
        "emotion": {
            'happy': "storageName",
            'sad': "storageName"
        },
    },
    "Spaniel": {
        "eyes": {
            'black': "storageName"
        },
        "fur": {
            'out': {
                'white': "storageName"
            },
            'in': {
                'white': "storageName"
            }
        },
        "emotion": {
            'happy': "storageName",
            'sad': "storageName"
        },
    },
}

export function getBreeds() {
    return breeds;
}
export function getBackgroundColors() {
    return backgroundColors;
}
export function getDogOptions(breed){
    return dataTree[breed];
}
export async function getDogPart(breed, part, value){
    var storageName = dataTree[breed][part][value];
    var storage = firebase.storage().ref().child('Dog');
    var dogPart = await storage.child(storageName).getDownloadURL();
    return dogPart;
}

export function verifyAccount(userId, name, email) {
  var ref = firebase.database().ref()
  ref.child("users/" + userId).once("value", function (snapshot) {
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
