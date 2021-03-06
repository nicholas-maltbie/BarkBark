import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import { uiConfig, verifyAccount } from './Fire.js';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import MapPage            from './Pages/MapPage.js';
import HomePage           from './Pages/HomePage.js';
import HelpPage           from './Pages/HelpPage.js';
import ProfilePage        from './Pages/ProfilePage.js';
import ContactUsPage      from './Pages/ContactUsPage.js';
import AboutPage          from './Pages/About.js';
import TermsPage          from './Pages/Terms.js';
import DogEdit            from './Components/DogEdit.js';
import NavBar             from './Components/NavBar.js';
import my404Component     from './Components/404.js';

function SignIn(props) {

  uiConfig.callbacks.signInSuccessWithAuthResult = props.callBackFunc;
  // For iOS full screen apps we use the redirect auth mode.
  if (('standalone' in window.navigator)
      && !window.navigator.standalone){
    uiConfig.signInFlow = 'redirect';
  }
  
  if (!props.isSignedIn) {
    return (
      <div>
        <img src="/static/media/logo.12a6f28b.png" className="App-logo" alt="logo"/>
        <p>Please sign-in:</p>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
        <p>Sign in with a <span style={{color:'blue'}}
            onmouseover="this.style.cursor='pointer'"
            onmouseout="this.style.cursor='default'"
            onClick={() => {
              let provider = new firebase.auth.GoogleAuthProvider();
              provider.setCustomParameters({
                prompt: 'select_account'
              });
              firebase.auth().signInWithPopup(provider)
            }}>different account</span>.</p>
        <p>Sign in as <span style={{color:'blue'}}
            onmouseover="this.style.cursor='pointer'"
            onmouseout="this.style.cursor='default'"
            onClick={() => { 
            firebase.auth().signInAnonymously().catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // ...
            });
             }}>guest</span></p>
        <p>By signing in you agree to our <a href="/TermsOfUse">Terms of Use</a>.</p>
      </div>
    )
  }
  else {
    return (
      <div>
        <img src="/static/media/logo.12a6f28b.png" className="App-logo" alt="logo"/>
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
      },
      userId: 0,
      userName: "",
      userEmail: ""
    };
    
    this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
    this.handleCADrawerToggle = this.handleCADrawerToggle.bind(this);
    this.signInCallback = this.signInCallback.bind(this);
  }
  
  signInCallback() {
    this.state.isSignedIn = true;
    return true;
  }
  
  // The component's Local state.
  // Listen to the Firebase Auth state and set the local state.
  componentDidMount() {
    var elem = document.getElementById("Loading")
    if (elem != null) {
      elem.parentNode.removeChild(elem)
    }
  
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
      (user) => {
        if (user != null) {
          verifyAccount(user.uid, user.displayName, user.email);
          this.setState({
            isSignedIn: true,
            userId: user.uid,
            userName: user.displayName,
            userEmail: user.email
          })
        }
        else {
          this.setState({
            isSignedIn: false,
            userId: "",
            userName: "",
            userEmail: ""
          })
        }
      }
    );
  }
  
  // Make sure we un-register Firebase observers when the component unmounts.
  componentWillUnmount() {
    this.unregisterAuthObserver();
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
    if (this.state.isSignedIn) {
      return (
      <Router>
        <div className="App">
          <MuiThemeProvider>
            <ClickAwayListener onClickAway={this.handleCADrawerToggle}> 
              <NavBar drawerClose={this.state.drawerClose} handleDrawerToggle={this.handleDrawerToggle} isSignedIn={this.state.isSignedIn}/>
            </ClickAwayListener>
            <Switch>
              <Route path="/SignIn" render={() => <SignIn 
                        isSignedIn={this.state.isSignedIn}
                        callBackFunc={this.signInCallback}/>}/>
              <Route exact path="/"       component={MapPage}/>
              <Route path="/Map"          component={MapPage}/>
              <Route path="/Home"         component={HomePage}/>
              <Route path="/Profile"      render={() => <ProfilePage userId={this.state.userId}/>}/>
              <Route path="/DogEdit"      component={DogEdit}/>
              <Route path="/Help"         component={HelpPage}/>
              <Route path="/AboutUs"      component={AboutPage}/>
              <Route path="/TermsOfUse"   component={TermsPage}/>
              <Route path="/ContactUs"    component={ContactUsPage}/>
              <Route component={my404Component} />
            </Switch>
          </MuiThemeProvider>
        </div>
      </Router>
      )
    }
    else {
      return (
      <Router>
        <div className="App">
          <MuiThemeProvider>
            <ClickAwayListener onClickAway={this.handleCADrawerToggle}> 
              <NavBar drawerClose={this.state.drawerClose} handleDrawerToggle={this.handleDrawerToggle} isSignedIn={this.state.isSignedIn}/>
            </ClickAwayListener>
            <Switch>
              <Route exact path="/" render={() => <SignIn 
                        isSignedIn={this.state.isSignedIn} 
                        callBackFunc={this.signInCallback}/>}/>
              <Route path="/SignIn" render={() => <SignIn 
                        isSignedIn={this.state.isSignedIn}
                        callBackFunc={this.signInCallback}/>}/>
              <Route path="/Help"         component={HelpPage}/>
              <Route path="/AboutUs"      component={AboutPage}/>
              <Route path="/TermsOfUse"   component={TermsPage}/>
              <Route path="/ContactUs"    component={ContactUsPage}/>
              <Route component={my404Component} />
            </Switch>
          </MuiThemeProvider>
        </div>
      </Router>
      )
    }
  }
}

export default App;
