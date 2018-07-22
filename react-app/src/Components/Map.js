import React, { Component } from 'react';
import firebase from 'firebase'
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import MakeBark from '../Components/MakeBark.js';

import { CenterControl, TestButton, BarkControl } from "./Controls.js"
import { getUserDogProfileURL } from './User.js';
import { MakeFireBark, setupBarkListener, closeBarkListener } from './bark.js';

// Using this api
// https://developers.google.com/maps/documentation/javascript/tutorial

const google = window.google;

export var rejected = false

export const getLocation = () => {
  const geolocation = navigator.geolocation;

  
  if (!rejected) {
    const location = new Promise((resolve, reject) => {
      if (!geolocation) {
        reject(new Error('Not Supported'));
        rejected = true
      }
        geolocation.getCurrentPosition((position) => {
          resolve(position);
        }, () => {
          rejected = true
          reject (
            alert("This app requires permission to share your location, https://support.google.com/chrome/answer/142065?hl=en")
          );
        });
    })
    return location
  }
  return new Promise(() => { return {"coords" : {"longitude":0, "latitude":0} } })
};

class Map extends Component {
  
  constructor(props) {
    super(props);
    
    this.userCircle = new google.maps.Marker({
      position: new google.maps.LatLng(0,0),
      icon: {
        url: "https://png.icons8.com/small/1600/filled-circle.png",
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(32, 32),
        scaledSize: new google.maps.Size(65, 65)
      },
      zIndex: 1,
      map: this.map
    })
    this.userIcon = {
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(24, 24),
      scaledSize: new google.maps.Size(48, 48)
    }
    this.userMarker = new google.maps.Marker({
      position: new google.maps.LatLng(0,0),
      icon: this.userIcon,
      map: this.map,
      zIndex: 2,
    })
    this.state ={
      dialogOpen: false,
    };

    this.userLocation = {lat: 0, lng: 0}
    this.updateLocation = this.updateLocation.bind(this);
    this.updateDogLocation = () => {
      this.userCircle.setPosition(this.userLocation)
      this.userMarker.setPosition(this.userLocation)
    }
    this.updateBarkDialog = this.updateBarkDialog.bind(this);
    this.getCurrntLocation = this.getCurrntLocation.bind(this);
    
    getUserDogProfileURL(firebase.auth().currentUser.uid).then(
      (imageURL) => {
        this.userIcon.url = imageURL
        this.userMarker.setIcon(this.userIcon)
      }
    )
  }
  
  getCurrntLocation() {
    return this.userLocation
  }

  updateBarkDialog(newState) {
    this.setState({dialogOpen: newState});
  }
  
  updateLocation(newPos) {
    if (rejected) {
      clearInterval(this.updateLocationTaskId)
      this.updateLocationTaskId = null
    }
    this.userLocation = {lat: newPos.coords.latitude, lng: newPos.coords.longitude}
    this.map.setCenter(this.userLocation)
    this.updateDogLocation()
  }
  
  componentWillUnmount() {
    var centerElem = document.getElementById("CenterControl")
    var barkElem = document.getElementById("BarkControl")
    var testControl = document.getElementById("TestControl")
    
    if (testControl != null) {
      testControl.parentNode.removeChild(testControl)
    }
    if (centerElem != null) {
      centerElem.parentNode.removeChild(centerElem)
    }
    if (barkElem != null) {
      barkElem.parentNode.removeChild(barkElem)
    }
    
    if (this.updateLocationTaskId != null) {
      clearInterval(this.updateLocationTaskId)
    }
    
    closeBarkListener()
  }
  
  componentDidMount () {
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 18,
      disableDefaultUI: true,
      maxZoom: 20,
      minZoom: 15,
    });
    
    this.userMarker.setMap(this.map)
    this.userCircle.setMap(this.map)
    
    var centerControlDiv = document.createElement('div');
    centerControlDiv.setAttribute("id", "CenterControl");
    var centerControl = new CenterControl(centerControlDiv, this.map, getLocation);
    
    var testControlDiv = document.createElement('div');
    testControlDiv.setAttribute("id", "TestButton");
    var testControl = new TestButton(testControlDiv, this.map, 
      () => {
        // Put your code here for testing features
        console.log('test_feature')
      }
    )
    
    var barkControlDiv = document.createElement('div');
    barkControlDiv.setAttribute("id", "BarkControl");
    var barkControl = new BarkControl(barkControlDiv, 
      this.map, 
      this.updateBarkDialog);

    barkControlDiv.index = 1;
    centerControlDiv.index = 1;
    testControlDiv.index = 1
    this.map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(barkControlDiv);
    this.map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(testControlDiv);
    this.map.controls[google.maps.ControlPosition.TOP_RIGHT].push(centerControlDiv);
    
    getLocation().then(this.updateLocation)
    
    var updateLocationTask = () => {
      getLocation().then((newPos) => {
        this.userLocation = {lat: newPos.coords.latitude, lng: newPos.coords.longitude};
        this.updateDogLocation();
      })
    }
    this.updateLocationTaskId = setInterval(updateLocationTask, 500)
    
    setupBarkListener(this.map, this.getCurrntLocation)
  }
  
  render() {
    return(
      
        <div className="Map" id="map">
          <MakeBark open = {this.state.dialogOpen} 
                    updateFn = {this.updateBarkDialog}
                    onYes = {() => {MakeFireBark(this.getCurrntLocation)}} 
                    onNo = {() => {}}/>
        </div>
        
        
        
    );
   }
};

export default Map;this
