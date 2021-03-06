import React from 'react';
import firebase from 'firebase';
import ViewBark from '../Components/ViewBark.js'
import { getUserDogProfileURL } from './User.js'

export function GetRegion(loc) {
  return Math.floor(loc.lat * 10) + "," + Math.floor(loc.lng * 10)
}

const google = window.google;
const marker_index = 10

export function MakeFireBark(locFn) {
  var loc = locFn()
  
  var id = firebase.auth().currentUser.uid
  var reg = GetRegion(loc)
  var barkRef = firebase.database().ref().child('barks').child(reg).push()
  
  firebase.database().ref('last_bark/' + id).set(firebase.database.ServerValue.TIMESTAMP)
  .then( result => {
    var bark = {
      region_id: reg,
      owner: id,
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      lat: loc.lat,
      lng: loc.lng,
      point_of_interest: ""
    }
    
    barkRef.set(bark)
  }).catch( error => {
    alert("Your dog is too tired to bark right now")
  })
}

var query_region = GetRegion({'lat': 0, 'lng': 0})
var readDelay = 0
var update_task_id = null
var getLocationFn = null
var map = null
var updateViewDialog = null
  
var root = firebase.database().ref()

var drawn_barks = {}
var bark_data = {}

var updateRegion = function() {
  var new_region = GetRegion(getLocationFn())
  if (new_region != query_region) {
    query_region = new_region
    closeListener()
    setupListener(new_region)
  }
  var cutoff = new Date().getTime() - readDelay + 1000
  Object.keys(drawn_barks).forEach((key) => {
    if(bark_data[key].timestamp < cutoff) {
      removeMarker(key)
    }
  })
  
}

var removeMarker = function(key) {
  drawn_barks[key].setMap(null)
  delete drawn_barks[key]
  delete bark_data[key]
}

var addMarker = function(barkData, key) {
  if (key in drawn_barks) {
    
  }
  else {
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(barkData.lat,barkData.lng),
      map: map,
      zIndex: marker_index
    })
    drawn_barks[key] = marker
    bark_data[key] = barkData
    getUserDogProfileURL(barkData.owner).then((url) => {
      marker.setIcon({
        url: url,
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(16, 16),
        scaledSize: new google.maps.Size(48, 48)
      })
    })
    marker.addListener('click',function(){
      updateViewDialog(true, key);
    });
    }

  }


var setupListener = function(new_region) {
  root.child('barks').child(new_region)
    .orderByChild("timestamp")
    .startAt(new Date().getTime() - readDelay + 1000)
    .on('child_added',  update_fn)
}

var update_fn = function(bark) {
  addMarker(bark.val(), bark.key)
}

var closeListener = function(new_region) {
  if (new_region != null) {
    root.child('barks').child(new_region).off('child_added', update_fn)
  }
}

export function closeBarkListener() {
  closeListener(query_region)
  clearInterval(update_task_id)
  query_region = null
  Object.keys(drawn_barks).forEach((key) => {
    removeMarker(key)
  })
  drawn_barks = {}
}

export function setupBarkListener(mapThingy, locationThingy,viewDialogFn) {
  updateViewDialog = viewDialogFn
  map = mapThingy
  getLocationFn = locationThingy
  root.child('read_time').once('value').then(
    (shapshot) => {
      readDelay = shapshot.val()
      var new_region = GetRegion(getLocationFn())
      setupListener(new_region)
    }
  )
  update_task_id = setInterval(updateRegion, 1000)
}



export default { MakeFireBark, setupBarkListener, closeBarkListener }

