import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import firebase from 'firebase';
import { getUserInfo } from '../Fire.js';

const FIREBASE_DATA_PATH = "gs://barkbark-9155d.appspot.com/";

function updateUserAvatar(userId, avatar){ //Updates avatar in database, avatar passed in is an object
  var dbRef = firebase.database().ref();
  dbRef.child('users/' + userId).update({
      dog: {
          breed: avatar.breedValue,
          color: avatar.backgroundValue,
          emotion: avatar.emotionValue,
          fur: avatar.furValue,
          name: "Doggy",
          eye: avatar.eyeValue
      }
  });
}
function uploadUserAvatar(blob){
  //var uploadTask = firebase.storage().ref().child('users/' + this.props.userId).put(blob);
}
async function getBackgroundColors() { //Get background color object
  var bgObj = firebase.database().ref('/backgrounds').once("value")
  .then(function (snapshot) {
      if (snapshot.val() != null) {
          return snapshot.val();
      }
  });
  return await bgObj;
}
async function getBreeds() { //Get breeds tree object
  var breedsObj = firebase.database().ref('/breeds').once("value")
  .then(function (snapshot) {
      if (snapshot.val() != null) {
          return snapshot.val();
      }
  });
  return await breedsObj;
}
async function getEmotions() { //Get emotions tree object
  var emotionsObj = firebase.database().ref('/emotions').once("value")
  .then(function (snapshot) {
      if (snapshot.val() != null) {
          return snapshot.val();
      }
  });
  return await emotionsObj;
}
async function getEyes() { //Get eyes tree object
  var eyesObj = firebase.database().ref('/eyes').once("value")
  .then(function (snapshot) {
      if (snapshot.val() != null) {
          return snapshot.val();
      }
  });
  return await eyesObj;
}
async function getFurs() { //Get furs tree object
  var fursObj = firebase.database().ref('/furs').once("value")
  .then(function (snapshot) {
      if (snapshot.val() != null) {
          return snapshot.val();
      }
  });
  return await fursObj;
}

class DogEdit extends React.Component {
  constructor(props){
    super(props);
    
    this.state = { //initialLoad variable may be needed for intitial canvas update
      values: { //Values are objects properties (id, name, filename) or (id, name) for breed or (color, hex) for bg
        backgroundValue: {color: "white", hex: "#FFFFFF"},
        furValue: {id: "", name: "", file: ""},
        emotionValue: {id: "", name: "", file: ""},
        breedValue: {id: "", name: "", file: ""},
        eyeValue: {id: "", name: "", file: ""},
      },
      options: { //Options are an array of objects that hold in { id: name } format
        breedOptions: [{id: ""}],
        backgroundColorOptions: [{color: ""}],
        eyeOptions: [{id: ""}],
        furOptions: [{id: ""}],
        emotionOptions: [{id: ""}],
      },
      userBlob: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateBreed = this.updateBreed.bind(this);
    this.updateEmotion = this.updateEmotion.bind(this);
    this.updateEyes = this.updateEyes.bind(this);
    this.updateFurs = this.updateFurs.bind(this);
  }

  componentDidMount() {
    var userInfo = getUserInfo();
    var bOptions = [], bValue = {};
    var emOptions = [], emValue = {};
    var eyeOptions = [], eyeValue = {};
    var fOptions = [], furValue = {};
    var bgOptions = [], bgValue = {};
    var breeds = getBreeds(), emotions = getEmotions(), eyes = getEyes(), furs = getFurs(), bgs = getBackgroundColors();
    for(var i in bgs){
      bgOptions.push({i: bgs[i]});
      if(bgs[i] == userInfo.dog.color){
        bgValue = {color: i, hex: bgs[i]};
      }
    }
    for(var i in breeds){
      bOptions.push({i: breeds[i]['name']}); //[{id: 'boxer}, {id: 'spaniel}]
      if(breeds[i]['name'] == userInfo.dog.breed){
        bValue = {id: i, name: breeds[i]['name']};
      }
    }
    for(var i in emotions){
      if(emotions[i]['breed_id'] == bValue.id){
        emOptions.push({i: emotions[i]['name']});
      }
      if(emotions[i]['name'] == userInfo.dog.emotion){
        emValue = {id: i, name: emotions[i]['name'], file: emotions[i]['file']};
      }
    }
    for(var i in eyes){
      if(eyes[i]['emotion_id'] == emValue.id){
        eyeOptions.push({i: eyes[i]['name']});
      }
      if(eyes[i]['name'] == userInfo.dog.eye){
        eyeValue = {id: i, name: eyes[i]['name'], file: eyes[i]['file']};
      }
    }
    for(var i in furs){
      if(furs[i]['emotion_id'] == emValue.id){
        fOptions.push({i: furs[i]['name']});
      }
      if(furs[i]['name'] == userInfo.dog.fur){
        furValue = {id: i, name: furs[i]['name'], file: furs[i]['file']};
      }
    }
    this.setState({
      values: {
        backgroundValue: bgValue,
        furValue: furValue,
        emotionValue: emValue,
        breedValue: bValue,
        eyeValue: eyeValue
      },
      options: {
        breedOptions: bOptions,
        backgroundColorOptions: bgOptions,
        eyeOptions: eyeOptions,
        emotionOptions: emOptions,
        furOptions: fOptions
      }
    });
  };

  updateBreed(){ //Change resulting emotion, eyes, fur based on breed
    this.updateEmotion();
  }
  updateEmotion(){
    var eOptions = [], eValue;
    var emotions = getEmotions();
    for(var i in emotions){
      if(emotions[i]['breed_id'] == this.state.values.breedValue['id']){
        eOptions.push({i: emotions[i]['name']});
      }
    }
    this.setState({
      options: {
        emotionOptions: eOptions
      }
    });
    this.updateEyes();
    this.updateFurs();
  }
  updateEyes(){ //Updates eyes with correct emotion id 
    var eOptions = [], eValue;
    var eyes = getEyes();
    for(var i in eyes){
      if(eyes[i]['emotion_id'] == this.state.values.emotionValue['id']){
        eOptions.push({i: eyes[i]['name']});
      }
    }
    this.setState({
      options: {
        eyesOptions: eOptions
      }
    });
  }
  updateFurs(){ //Updates furs with correct emotion id 
    var fOptions = [], fValue;
    var furs = getFurs();
    for(var i in furs){
      if(furs[i]['emotion_id'] == this.state.values.furValue['id']){
        fOptions.push({i: furs[i]['name']});
      }
    }
    this.setState({
      options: {
        furOptions: fOptions
      }
    });
  }

  updateCanvas() { 
    var c=document.getElementsByClassName("dogPreviewAvatarImageStyle");
    var ctx=c.getContext("2d");
    var furImage = new Image();
    var eyesImage = new Image();
    var emotionImage = new Image();
    emotionImage.src = FIREBASE_DATA_PATH + this.state.values.emotionValue.file;
    emotionImage.onload = function() {
      ctx.drawImage(emotionImage, 0, 0, 300, 300); //image, x, y, width, height
      eyesImage.src = FIREBASE_DATA_PATH + this.state.values.eyeValue.file;
      eyesImage.onload = function() {
          ctx.drawImage(eyesImage, 0, 0, 300, 300);
          furImage.src = FIREBASE_DATA_PATH + this.state.values.furValue.file;
          furImage.onload = function() {
            ctx.drawImage(furImage, 0, 0, 300, 300);
            c.toBlob(function(blob){
              this.setState({userBlob: blob});
            });
          };
        };
      };
    };

  loadOptions(options, type) { //Return an array of tabs based on generated options
    var tabOptions;
    tabOptions = options.map((value) => {
      if(type == "bg"){
        return <Tab label={value['color']} style={{backgroundColor: value['hex'], color:'black'}}/>;
      }
      else {
        return <Tab label={value['id']} style={{backgroundColor: "white", color:'black'}}/>;
      }
    });
    return tabOptions;
  }
  

  handleChange = (event, value, selector) => { //value is returned index of tab option
    if(selector == 'BGColor'){
      this.setState({ values:{ backgroundValue: {color: Object.keys(this.state.options.furOptions[value])[0], hex: this.state.options.backgroundColorOptions[value]} } });
    }
    else if(selector == 'Fur'){
      this.setState({ values:{ furValue: {id: Object.keys(this.state.options.furOptions[value])[0], name: this.state.options.furOptions[value]['id'], file: getEyes()[Object.keys(this.state.options.furOptions[value])[0]['file']]} } });
    }
    else if(selector == 'Emotion'){
      this.setState({ values:{ emotionValue: {id: Object.keys(this.state.options.emotionOptions[value])[0], name: this.state.options.emotionOptions[value]['id'], file: getEmotions()[Object.keys(this.state.options.emotionOptions[value])[0]['file']]} } });
      this.updateEmotion();
    }
    else if(selector == 'Eyes'){
      this.setState({ values:{ eyeValue: {id: Object.keys(this.state.options.eyeOptions[value])[0], name: this.state.options.eyeOptions[value]['id'], file: getEyes()[Object.keys(this.state.options.eyeOptions[value])[0]['file']]} } });
    }
    else if(selector == 'Breed'){
      this.setState({ values:{ breedValue: {id: Object.keys(this.state.options.breedOptions[value])[0], name: this.state.options.breedOptions[value]['id']} } });
      this.updateBreed();
    }

    if(selector != 'BGColor'){
      this.updateCanvas();
    }
  };

  handleSubmit() {
    updateUserAvatar(this.props.userId, this.state.values); //Update avatar attributes with text values
    uploadUserAvatar(this.state.userBlob); //Upload full avatar image
  }

  render() {
    
    return (
      <div className="dogEditWindow">
        <div className="dogPreviewStyle" style={{backgroundColor: this.state.values.backgroundValue}}>
          <canvas className="dogPreviewAvatarImageStyle"/>
        </div>
        <div className="valueDogSelectorStyle">
          <AppBar position="static" color="default" className="valueDogSelectorBarStyle">
              <Typography> Breed </Typography>
              <Tabs
                value={this.state.breedValue}
                onChange={(event, value) => this.handleChange(event, value, 'Breed')}
                scrollable
                scrollButtons="auto"
              >
                {this.loadOptions(this.state.options.breedOptions, "breed")}
              </Tabs>
            </AppBar>
          <AppBar position="static" color="default" className="valueDogSelectorBarStyle">
            <Typography> Background Color </Typography>
            <Tabs
              value={this.state.backgroundValue}
              onChange={(event, value) => this.handleChange(event, value, 'BGColor')}
              scrollable
              scrollButtons="auto"
            >
              {this.loadOptions(this.state.options.backgroundColorOptions, "bg")}
            </Tabs>
          </AppBar>
          <AppBar position="static" color="default" className="valueDogSelectorBarStyle">
            <Typography> Fur Color </Typography>
            <Tabs
              value={this.state.furValue}
              onChange={(event, value) => this.handleChange(event, value, 'Fur')}
              scrollable
              scrollButtons="auto"
            >
              {this.loadOptions(this.state.options.furOptions, "fur")}
            </Tabs>
          </AppBar>
          <AppBar position="static" color="default" className="valueDogSelectorBarStyle">
            <Typography> Emotion </Typography>
            <Tabs
              value={this.state.eyeColorValue}
              onChange={(event, value) => this.handleChange(event, value, 'Emotion')}
              scrollable
              scrollButtons="auto"
            >
              {this.loadOptions(this.state.options.emotionOptions, "emotion")}
            </Tabs>
          </AppBar>
          <AppBar position="static" color="default" className="valueDogSelectorBarStyle">
            <Typography> Eyes </Typography>
            <Tabs
              value={this.state.eyeColorValue}
              onChange={(event, value) => this.handleChange(event, value, 'Eyes')}
              scrollable
              scrollButtons="auto"
            >
              {this.loadOptions(this.state.options.eyeOptions, "eye")}
            </Tabs>
          </AppBar>
          <Button className="dogEditSubmit" variant="contained" onClick={this.handleSubmit}> Submit </Button>
        </div>
      </div>
    );
  }
}

export default DogEdit;
