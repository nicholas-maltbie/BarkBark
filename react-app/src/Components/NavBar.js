import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import firebase from 'firebase';
import Menu from 'material-ui/svg-icons/navigation/menu.js';
import Person from 'material-ui/svg-icons/social/person.js';
import { Router, Route, Link, Redirect, withRouter } from "react-router-dom";

const NavBarStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems:'center',
    backgroundColor: 'rgb(51, 204, 204)',
    width:'100%',
    height:'10%'
};
const NavBarHeaderStyle = {
    width:'90%',
    textAlign: 'center',
    fontSize:'24px'
};
const NavBarButtonStyle = {
    width:'5%'
};

class NavBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: false};

    this.handleLink = this.handleLink.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  handleToggle = () => this.setState({open: !this.state.open});
  handleLink(e) {
    e.preventDefault();
    if(e.target.innerText == "Login"){
      this.props.history.push('/');
    }
    else{
      this.props.history.push('/' + e.target.innerText.replace(" ", ""));
    }
  }
  
  signOut(e) {
    firebase.auth().signOut()
    e.preventDefault();
    this.props.history.push('/');
  }

  render() {
    return (
      <div style={NavBarStyle}>
        <FlatButton onClick={this.props.handleDrawerToggle} style={NavBarButtonStyle} icon={<Menu/>}/>
        <div className="Header" style={NavBarHeaderStyle}>
          Bark Bark
        </div>
        <FlatButton onClick={this.props.handleDrawerToggle} style={NavBarButtonStyle} icon={<Person/>}/>
        <Drawer open={!this.props.drawerClose}>
          <MenuItem onClick={this.handleLink}>Home</MenuItem>
          <MenuItem onClick={this.handleLink}>Map</MenuItem>
          <MenuItem onClick={this.handleLink}>Profile</MenuItem>
          <MenuItem onClick={this.handleLink}>Help</MenuItem>
          <MenuItem onClick={this.handleLink}>Contact Us</MenuItem>
          <MenuItem onClick={this.signOut}>Sign Out</MenuItem>
        </Drawer>
      </div>
    );
  }
}

export default withRouter(NavBar);
