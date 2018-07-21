import React from 'react';
import firebase from 'firebase';

export function GetRegion(loc) {
  return Math.floor(loc.lat * 10) + "," + Math.floor(loc.lng * 10)
}

export function MakeFireBark(loc) {
  var barkRef = firebase.database().ref().child('barks').push()
  
  var id = firebase.auth().currentUser.uid
  var reg = GetRegion(loc)
  
  
  var time = firebase.database.ServerValue.TIMESTAMP
  firebase.database().ref('last_bark/' + id).set(time)
  .then( result => {
    var bark = {
      region_id: reg,
      owner: id,
      timestamp: time,
      lat: loc.lat,
      lng: loc.lng,
      point_of_interest: ""
    }
    
    barkRef.set(bark)
  }).catch( error => {
    alert("Your dog is too tired to bark right now")
  })
}

export default { MakeFireBark }

