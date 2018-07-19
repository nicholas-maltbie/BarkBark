import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import MakeBark from '../Components/MakeBark.js';



// Using this api
// https://developers.google.com/maps/documentation/javascript/tutorial

const google = window.google;

export var rejected = false;

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
          reject (
            alert("This app requires permission to share your location, https://support.google.com/chrome/answer/142065?hl=en")
          );
          rejected = true
        });
    })
    return location
  }
  return new Promise(() => { return {"coords" : {"longitude":0, "latitude":0} } })
};

function CenterControl(controlDiv, map) {
  // Set CSS for the control border.
  var controlUI = document.createElement('div');
  controlUI.className = "CenterControl";
  controlUI.title = 'Click to recenter the map';
  controlDiv.appendChild(controlUI);

  // Set CSS for the control interior.
  var controlText = document.createElement('div');
  controlText.innerHTML = '<img src="https://cdn4.iconfinder.com/data/icons/social-communication/142/target-512.png" width=48px height=48px/>';
  controlUI.appendChild(controlText);

  // Setup the click event listeners: simply set the map to Chicago.
  controlUI.addEventListener('click', function() {
    getLocation().then((newPos) => map.setCenter({lat: newPos.coords.latitude, 
                                                  lng: newPos.coords.longitude})
    );
  });
      clearInterval(this.updateLocationTaskId)
}

function BarkControl(controlDiv, map) {
  // Set CSS for the control border.
  var controlUI = document.createElement('div');
  controlUI.className = "BarkControl";
  controlUI.title = 'Make a bark';
  controlDiv.appendChild(controlUI);

  // Set CSS for the control interior.
  var controlText = document.createElement('div');
  controlText.innerHTML = 'Bark!';
  controlUI.appendChild(controlText);

  // Setup the click event listeners: simply set the map to Chicago.
  controlUI.addEventListener('click', function() {
    console.log("Make bark");
    //var uitest = new MakeBark;
    //uitest.handleClickOpen();
    //MakeBark.handleClickOpen;
    //var UIspace = document.createElement('MakeBark');
    //var UIDialog = new MakeBark;
    //UIspace.appendChild(MakeBark);
    //document.appendChild(MakeBark);
    //UIDialog.appendChild(MakeBark);
  });

}

class Map extends Component {
  
  constructor(props) {
    super(props);
    
    this.userIcon = {
      url: 'https://firebasestorage.googleapis.com/v0/b/barkbark-9155d.appspot.com/o/Dog%2FBoxer_Full.png?alt=media&token=e9ac48bb-b112-4919-b082-629ad6e0fbc2',
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(16, 16),
      scaledSize: new google.maps.Size(48, 48)
    }
    this.userMarker = new google.maps.Marker({
      position: new google.maps.LatLng(0,0),
      icon: this.userIcon,
      map: this.map,
    })
    
    this.userLocation = {lat: 0, lng: 0}
    this.updateLocation = this.updateLocation.bind(this);
    this.updateDogLocation = () => {
      this.userMarker.setPosition(this.userLocation)
    }
  }
  
  updateLocation(newPos) {
    this.userLocation = {lat: newPos.coords.latitude, lng: newPos.coords.longitude}
    this.map.setCenter(this.userLocation)
    this.updateDogLocation()
  }
  
  componentWillUnmount() {
    var centerElem = document.getElementById("CenterControl")
    var barkElem = document.getElementById("BarkControl")
    
    if (centerElem != null) {
      centerElem.parentNode.removeChild(centerElem)
    }
    if (barkElem != null) {
      barkElem.parentNode.removeChild(barkElem)
    }
    
    if (this.updateLocationTaskId != null) {
      clearInterval(this.updateLocationTaskId)
    }
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
    
    var centerControlDiv = document.createElement('div');
    centerControlDiv.setAttribute("id", "CenterControl");
    var centerControl = new CenterControl(centerControlDiv, this.map);
    
    var barkControlDiv = document.createElement('div');
    barkControlDiv.setAttribute("id", "BarkControl");
    var barkControl = new BarkControl(barkControlDiv, this.map);

    barkControlDiv.index = 1;
    centerControlDiv.index = 1;
    this.map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(barkControlDiv);
    this.map.controls[google.maps.ControlPosition.TOP_RIGHT].push(centerControlDiv);
    
    getLocation().then(this.updateLocation)
    
    var updateLocationTask = () => {
      getLocation().then((newPos) => {
        this.userLocation = {lat: newPos.coords.latitude, lng: newPos.coords.longitude};
        this.updateDogLocation();
      })
    }
    this.updateLocationTaskId = setInterval(updateLocationTask, 500)
  }
  
  render() {
    return(
      
        <div className="Map" id="map"></div>
        
        
    );
   }
};

export default Map;this
