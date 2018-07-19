import React, { Component } from 'react';
import Map from '../Components/Map.js';
import MakeBark from '../Components/MakeBark.js';

class MapPage extends Component {
  render () {
    return (
      <div>
        <Map className="Map"/>
        <MakeBark/>
      </div>
    )
  }
}

export default MapPage;
