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

class Map extends Component {
  
  constructor(props) {
    super(props);
    
    this.updateLocation = this.updateLocation.bind(this);
  }
  
  updateLocation(newPos) {
    console.log(newPos)
    this.map.setCenter({lat: newPos.coords.latitude, lng: newPos.coords.longitude})
  }
  
  componentDidMount () {
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 14
    });
    
    getLocation().then(this.updateLocation)
  }
  
  render() {
    return(
      <div className="Map" id="map"></div>
    );
   }
};

export default Map;
