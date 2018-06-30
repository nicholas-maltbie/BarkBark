import React, { Component } from 'react';
import NavBar from './Component.js'
import logo from './logo.svg';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './App.css';
import uiConfig from './Fire.js';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from "react-router-dom";
import MapPage from './MapPage.js';




function SignIn(props) {
  if (!props.isSignedIn) {
    return (
      <div className="Screen">
        <p>Please sign-in:</p>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
      </div>
    )
  }
  else {
    return (
      <div className="Screen">
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
  // The component's Local state.
  state = {
    isSignedIn: false // Local signed-in state.
  };
  
  // Listen to the Firebase Auth state and set the local state.
  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
        (user) => this.setState({isSignedIn: !!user})
    );
  }
  
  // Make sure we un-register Firebase observers when the component unmounts.
  componentWillUnmount() {
    this.unregisterAuthObserver();
  }
  
  render() {
    return (
      <Router>
        <div>
          <MuiThemeProvider>
            <NavBar/>
          </MuiThemeProvider>

          <Route exact path="/" component={SignIn}/>
          <Route path="/Map" component={MapPage}/>
        </div>
      </Router>
    );
  }
}

export default App;
