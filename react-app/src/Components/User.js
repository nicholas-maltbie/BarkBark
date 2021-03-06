import React from 'react';
import firebase from 'firebase';

const defualtDownload = ""
const defaultDog = "Boxer_Full.png"
var dogDownloadUrl = null
const foundUIDs = {}

export function getUserDogProfileURL(userId, force=false) {
  if (userId in foundUIDs && !force) {
    return new Promise((resolve, reject) => {resolve(foundUIDs[userId])})
  }
  var root = firebase.storage().ref()
  var userImage = root.child("UserProfiles").child(userId).child("profile.png")
  
  var failed = false
  return new Promise((resolve, reject) => {
    userImage.getDownloadURL().then(
      (url) => {
        foundUIDs[userId] = url
        resolve(url);
      }
    ).catch(
      (err) => {
        if (dogDownloadUrl == null) {
          root.child("Dog").child(defaultDog).getDownloadURL().then(
          (url) => {
            dogDownloadUrl = url
            resolve(url);
          }).catch( 
            (err) => {
              reject(
                "Failed to connect to database"
              )
            }
          );
        }
        else {
          resolve(dogDownloadUrl)
        }
      }
    )
  })
}

export default { getUserDogProfileURL }
