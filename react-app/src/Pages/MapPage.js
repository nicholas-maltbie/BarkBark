import React from 'react';
import GoogleMapReact from 'google-map-react';


class MapPage extends React.Component {
    render(){
        return(
            <div className="Page">
                <GoogleMapReact defaultCenter={this.props.userCenter}/>
            </div>
        )
    }
}

export default MapPage;