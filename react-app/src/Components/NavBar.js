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
    backgroundColor: 'rgb(0,0,0)',
    width:'100%',
    height:'10vh'
};

const navButtonColor = 'white'

const TitleColor = { 
	color : '#CACACA'
};

const TitleColor2 = { 
	color : '#00b3ff'
};

const NavBarHeaderStyle = {
    width:'90%',
    textAlign: 'center',
    fontSize:'30px',
    fontFamily: 'Futura, "Trebuchet MS", Arial, sans-serif',
	fontWeight: '525'
};
const NavBarButtonStyle = {
    width:'5%',
    fill:'white'
};

class NavBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
    this.isSignedIn = false;

    this.handleLink = this.handleLink.bind(this);
    this.signOut = this.signOut.bind(this);
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.goToPage = this.goToPage.bind(this);
  }

  handleToggle = () => this.setState({open: !this.state.open});
  
  goToPage(page) {
    this.props.history.push(page)
  }
  
  handleLink(e) {
    e.preventDefault();
    if(e.target.innerText == "Login"){
      this.goToPage('/');
    }
    else{
      this.goToPage('/' + e.target.innerText.replace(new RegExp(" ", "g"), ""));
    }
  }
  
  signOut(e) {
    firebase.auth().signOut()
    e.preventDefault();
    this.props.history.push('/');
  }
  
  toggleDrawer(otherFn) {
    return (e) => {
      this.props.handleDrawerToggle()
      otherFn(e)
    }
  }

  render() {
    if (this.props.isSignedIn) {
      return (
      <div style={NavBarStyle}>
        <FlatButton 
          onClick={this.props.handleDrawerToggle} 
          style={NavBarButtonStyle} 
          icon= {<Menu color={navButtonColor}/>}/>
        <div className="Header" 
          style={NavBarHeaderStyle}>
          <span style = {TitleColor}> Bark </span>
		  <span style = {TitleColor2}>Bark </span>
        </div>
        <FlatButton 
          onClick={() => {this.goToPage('Profile')}} 
          style={NavBarButtonStyle} 
          icon={ <Person color={navButtonColor}/>}/>
		  <div backgroundColor = "#000">
        <Drawer open={!this.props.drawerClose}>
          <MenuItem onClick={this.toggleDrawer(this.signOut)}>Sign Out</MenuItem>
          <MenuItem onClick={this.toggleDrawer(this.handleLink)}>Map</MenuItem>
          <MenuItem onClick={this.toggleDrawer(this.handleLink)}>Profile</MenuItem>
          <MenuItem onClick={this.toggleDrawer(this.handleLink)}>Help</MenuItem>
          <MenuItem onClick={this.toggleDrawer(this.handleLink)}>About Us</MenuItem>
          <MenuItem onClick={this.toggleDrawer(this.handleLink)}>Terms Of Use</MenuItem>
          <MenuItem onClick={this.toggleDrawer(this.handleLink)}>Contact Us</MenuItem>
        </Drawer>
		</div>
      </div>
      )
    }
    else {
      return (
      <div style={NavBarStyle}>
        <FlatButton 
          onClick={this.props.handleDrawerToggle} 
          style={NavBarButtonStyle} 
          icon={<Menu color={navButtonColor}/>}/>
        <div className="Header" 
          style={NavBarHeaderStyle}>
          <span style = {TitleColor}> Bark </span>
		  <span style = {TitleColor2}>Bark </span>
        </div>
        <FlatButton 
          style={NavBarButtonStyle}/>
        <Drawer open={!this.props.drawerClose}>
          <MenuItem onClick={this.toggleDrawer(this.handleLink)}>Sign In</MenuItem>
          <MenuItem onClick={this.toggleDrawer(this.handleLink)}>Help</MenuItem>
          <MenuItem onClick={this.toggleDrawer(this.handleLink)}>Contact Us</MenuItem>
          <MenuItem onClick={this.toggleDrawer(this.handleLink)}>Terms Of Use</MenuItem>
          <MenuItem onClick={this.toggleDrawer(this.handleLink)}>About Us</MenuItem>
        </Drawer>
      </div>
      )
    }
  }
}

export default withRouter(NavBar);
