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

  if (!props.isSignedIn) {
    return (
      <div>
        <img src="/static/media/logo.12a6f28b.png" className="App-logo" alt="logo"/>
        <p>Please sign-in:</p>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
        <p>By Signing in you agree to our <a href="/TermsOfUse">Terms of Use</a>.</p>
      </div>
    )
  }
  else {
    var user = firebase.auth().currentUser;
    if (user != null) {
      verifyAccount(user.uid, user.displayName, user.email)
    }
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
      }
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
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
        (user) => this.setState({isSignedIn: !!user})
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
              <Route path="/Profile"      component={ProfilePage}/>
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
