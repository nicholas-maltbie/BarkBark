import React, { Component } from 'react';

// Using this api
// https://developers.google.com/maps/documentation/javascript/tutorial

const google = window.google;

export const getLocation = () => {
  const geolocation = navigator.geolocation;

  const location = new Promise((resolve, reject) => {
    if (!geolocation) {
      reject(new Error('Not Supported'));
    }

  geolocation.getCurrentPosition((position) => {
    resolve(position);
  }, () => {
    reject (
      alert("This app requires permission to share your location, https://support.google.com/chrome/answer/142065?hl=en")
    );
  });
  });

  return location
};

function CenterControl(controlDiv, map) {
  // Set CSS for the control border.
  var controlUI = document.createElement('div');
  controlUI.className = "CenterControl";
  controlUI.title = 'Click to recenter the map';
  controlDiv.appendChild(controlUI);

  // Set CSS for the control interior.
  var controlText = document.createElement('div');
  controlText.innerHTML = '<img src="https://cdn4.iconfinder.com/data/icons/social-communication/142/target-512.png" width=20px height=20px/>';
  controlUI.appendChild(controlText);

  // Setup the click event listeners: simply set the map to Chicago.
  controlUI.addEventListener('click', function() {
    getLocation().then((newPos) => map.setCenter({lat: newPos.coords.latitude, 
                                                  lng: newPos.coords.longitude})
    );
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
    
    this.updateLocation = this.updateLocation.bind(this);
  }
  
  updateLocation(newPos) {
    this.map.setCenter({lat: newPos.coords.latitude, lng: newPos.coords.longitude})
    
    this.userMarker.setPosition(this.map.getCenter()) 
  }
  
  componentDidMount () {
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 16,
      disableDefaultUI: true,
      maxZoom: 18,
      minZoom: 12,
    });
    
    this.userMarker.setMap(this.map)
    
    var centerControlDiv = document.createElement('div');
    centerControlDiv.setAttribute("id", "CenterControl");
    var centerControl = new CenterControl(centerControlDiv, this.map);

    centerControlDiv.index = 1;
    this.map.controls[google.maps.ControlPosition.TOP_RIGHT].push(centerControlDiv);
    
    getLocation().then(this.updateLocation)
  }
  
  render() {
    return(
      <div className="Map" id="map"></div>
    );
   }
};

export default Map;
