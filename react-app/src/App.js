import React, { Component } from 'react';
import NavBar from './Component.js'
import logo from './logo.svg';
import './App.css';
import uiConfig from './Fire.js';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from "react-router-dom";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MapPage from './Pages/MapPage.js';
import HomePage from './Pages/HomePage.js';
import HelpPage from './Pages/HelpPage.js';
import ProfilePage from './Pages/ProfilePage.js';
import ContactUsPage from './Pages/ContactUsPage.js';

function SignIn(props) {
  if (!props.isSignedIn) {
    return (
      <div className="Page">
        <p>Please sign-in:</p>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
      </div>
    )
  }
  else {
    return (
      <div className="Page">
        <p>Welcome {firebase.auth().currentUser.displayName}! You are now signed-in!</p>
        <p onClick={() => firebase.auth().signOut()}
          color="#4db8ff">
          Sign-out
        </p>
      </div>
    )
  }
}

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      isSignedIn: false, // Local signed-in state.
      drawerClose: true,
      userCenter: {
        lat: 0,
        long: 0
      }
    };
    
    this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
    this.handleCADrawerToggle = this.handleCADrawerToggle.bind(this);
    this.getUserLocation = this.getUserLocation.bind(this);
  }
  // The component's Local state.
  
  // Listen to the Firebase Auth state and set the local state.
  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
        (user) => this.setState({isSignedIn: !!user})
    );
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(this.getUserLocation);
    }
  }
  
  // Make sure we un-register Firebase observers when the component unmounts.
  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  getUserLocation(position) {
    this.setState({userCenter: {lat: position.coords.latitude, long: position.coords.longitude}})
  }

  handleDrawerToggle() { //Button Toggle
    this.setState({drawerClose: !this.state.drawerClose});
  }
  handleCADrawerToggle() { //Click Away Toggle
    if(!this.state.drawerClose){
      this.setState({drawerClose: true});
    }
  }
  
  render() {
    if(!this.state.isSignedIn){
      return(
        <SignIn isSignedIn={this.state.isSignedIn}/>
      )
    }
    return (
      <Router>
        <div className="App">
          <MuiThemeProvider>
            <ClickAwayListener onClickAway={this.handleCADrawerToggle}> 
              <NavBar drawerClose={this.state.drawerClose} handleDrawerToggle={this.handleDrawerToggle}/>
            </ClickAwayListener>
            <Route path="/Map" render={() => <MapPage userCenter={this.state.userCenter}/>}/>
            <Route path="/Home" component={HomePage}/>
            <Route path="/Help" component={HelpPage}/>
            <Route path="/Profile" component={ProfilePage}/>
            <Route path="/ContactUs" component={ContactUsPage}/>
          </MuiThemeProvider>
        </div>
      </Router>
    );
  }
}

export default App;
