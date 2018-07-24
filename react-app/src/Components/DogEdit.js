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
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import firebase from 'firebase';
import { getUserInfo } from '../Fire.js';
import mappic from '../mapbg.png';

const FIREBASE_DATA_PATH = "gs://barkbark-9155d.appspot.com/";

function updateUserAvatar(userId, avatar){ //Updates avatar in database, avatar passed in is an object
  var dbRef = firebase.database().ref();
  dbRef.child('users/' + userId).update({
      dog: {
          breed: avatar.breedValue.id,
          color: avatar.backgroundValue.color,
          emotion: avatar.emotionValue.id,
          eye: avatar.eyeValue.id,
          fur: avatar.furValue.id,
          name: "Doggy"
      }
  });
}
function uploadUserAvatar(userId, blob){ //Upload user avatar in storage
  console.log(blob)
  var uploadTask = firebase.storage().ref().child('/UserProfiles/' + userId + '/profile.png').put(blob);
}

function getImageUrl(location){
  var storageRef = firebase.storage().ref()
  var starsRef = storageRef.child(location)
  return starsRef.getDownloadURL()
}
function getBackgroundColors() { //Get background color object
  var bgObj = firebase.database().ref('/backgrounds').once("value")
  .then(function (snapshot) {
      var colors = snapshot.val()
      var color_values = {}
      if (colors != null) {
          Object.keys(colors).forEach((color) => { 
            color_values[color] = colors[color].color;
          });
      }
      return color_values;
  });
  return bgObj;
}
function getBreeds() { //Get breeds tree object
  return firebase.database().ref('/breeds').once("value")
}
function getEmotions() { //Get emotions tree object
  return firebase.database().ref('/emotions').once("value")
}
function getEyes() { //Get eyes tree object
  return firebase.database().ref('/eyes').once("value")
}
function getFurs() { //Get furs tree object
  return firebase.database().ref('/furs').once("value")
}

class DogEdit extends React.Component {
  constructor(props){
    super(props);
    
    this.state = { //initialLoad variable may be needed for intitial canvas update
      values: { //Values are objects properties (id, name, filename) or (id, name) for breed or (color, hex) for bg
        backgroundValue: {color: "white", hex: "#FFFFFF", index: 0},
        furValue: {id: "", name: "", file: "", index: 0},
        emotionValue: {id: "", name: "", file: "", index: 0},
        breedValue: {id: "", name: "", index: 0},
        eyeValue: {id: "", name: "", file: "", index: 0},
      },
      options: { //Options are an array of objects that hold in { id: name } format
        breedOptions: [{id: ""}],
        backgroundColorOptions: [{color: ""}],
        eyeOptions: [{id: ""}],
        furOptions: [{id: ""}],
        emotionOptions: [{id: ""}],
      }
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateBreed = this.updateBreed.bind(this);
    this.updateEmotion = this.updateEmotion.bind(this);
    this.updateEyesAndFur = this.updateEyesAndFur.bind(this);
    this.updateCanvas = this.updateCanvas.bind(this);
  }

  async componentDidMount() {
    var uInfo = getUserInfo(this.props.userId)
    var bInfo = getBreeds()
    var emInfo = getEmotions()
    var eyInfo = getEyes()
    var fInfo = getFurs()
    var bgInfo = getBackgroundColors()
    uInfo.then( userInfo => { this.userInfo = userInfo.val() });
    bInfo.then( breeds => {this.breeds = breeds.val()})
    emInfo.then( emotions => {this.emotions = emotions.val()})
    eyInfo.then( eyes => {this.eyes = eyes.val()})
    fInfo.then( furs => {this.furs = furs.val()})
    bgInfo.then( bgs => {this.bgs = bgs} );
    Promise.all([uInfo, bInfo, emInfo, eyInfo, fInfo, bgInfo]).then( (vals) => {
      var count = 0;
      var bOptions = [], bValue = {};
      var emOptions = [], emValue = {};
      var eyeOptions = [], eyeValue = {};
      var fOptions = [], furValue = {};
      var bgOptions = [], bgValue = {};
      
      for(var i in this.bgs){
        bgOptions.push({[i]: this.bgs[i]});
        if(i == this.userInfo.dog.color){
          bgValue = {color: i, hex: this.bgs[i], index: count};
        }
        count++;
      }
      count = 0;
      for(var i in this.breeds){
        bOptions.push({[i]: this.breeds[i]['name']}); //[{id: 'boxer}, {id: 'spaniel}]
        if(i == this.userInfo.dog.breed){
          bValue = {id: i, name: this.breeds[i]['name'], index: count};
        }
        count++;
      }
      count = 0;
      for(var i in this.emotions){
        if(this.emotions[i]['breed_id'] == bValue.id){
          emOptions.push({[i]: this.emotions[i]['name']});
        }
        if(i == this.userInfo.dog.emotion && this.emotions[i]['breed_id'] == bValue['id']){
          emValue = {id: i, name: this.emotions[i]['name'], file: this.emotions[i]['file'], index: count};
        }
        count++;
      }
      count = 0;
      for(var i in this.eyes){
        if(this.eyes[i]['emotion_id'] == emValue.id){
          eyeOptions.push({[i]: this.eyes[i]['name']});
        }
        if(i == this.userInfo.dog.eye){
          eyeValue = {id: i, name: this.eyes[i]['name'], file: this.eyes[i]['file'], index: count};
        }
        count++;
      }
      count = 0;
      for(var i in this.furs){
        if(this.furs[i]['emotion_id'] == emValue.id){
          fOptions.push({[i]: this.furs[i]['name']});
        }
        if(i == this.userInfo.dog.fur){
          furValue = {id: i, name: this.furs[i]['name'], file: this.furs[i]['file'], index: count};
        }
        count++;
      }
      count = 0;
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
      this.updateCanvas();
    })
  };

  updateBreed(){ //Change resulting emotion, eyes, fur based on breed
    this.updateEmotion(true);
  }
  updateEmotion(newBreed){
    var stateCopy = this.state;
    if(newBreed == true){
      var eOptions = [], eValue;
      var emotions = this.emotions;
      for(var i in emotions){
        if(emotions[i]['breed_id'] == this.state.values.breedValue['id']){
          eOptions.push({[i]: emotions[i]['name']});
        }
      }
      var stateCopy = this.state;
      stateCopy.options.emotionOptions = eOptions;
      stateCopy.values.emotionValue = {id: Object.keys(this.state.options.emotionOptions[0])[0], name: Object.values(this.state.options.emotionOptions[0])[0], file: this.emotions[Object.keys(this.state.options.emotionOptions[0])[0]]['file'], index: 0};
    }
    this.setState(stateCopy, () => { this.updateEyesAndFur(); });
  }
  updateEyesAndFur(){ //Updates eyes with correct emotion id 
    var stateCopy = this.state;
    var eOptions = [], eValue;
    var eyes = this.eyes;
    for(var i in eyes){
      if(eyes[i]['emotion_id'] == this.state.values.emotionValue['id']){
        eOptions.push({[i]: eyes[i]['name']});
      }
    } 
    var fOptions = [], fValue;
    var furs = this.furs;
    for(var i in furs){
      if(furs[i]['emotion_id'] == this.state.values.emotionValue['id']){
        fOptions.push({[i]: furs[i]['name']});
      }
    }
    stateCopy.options.furOptions = fOptions;
    stateCopy.values.furValue = {id: Object.keys(this.state.options.furOptions[0])[0], name: Object.values(this.state.options.furOptions[0])[0], file: this.furs[Object.keys(this.state.options.furOptions[0])[0]]['file'], index: 0};
    stateCopy.options.eyeOptions = eOptions;
    stateCopy.values.eyeValue = {id: Object.keys(this.state.options.eyeOptions[0])[0], name: Object.values(this.state.options.eyeOptions[0])[0], file: this.eyes[Object.keys(this.state.options.eyeOptions[0])[0]]['file'], index: 0};
    this.setState(stateCopy, () => this.updateCanvas());
  }

  async updateCanvas() { 
    var c=document.getElementById("dogEditCanvas");
    var ctx=c.getContext("2d");
    ctx.fillStyle = this.state.values.backgroundValue.hex;
    ctx.fillRect(0, 0, c.width, c.height);
    var furImage = new Image();
    var eyesImage = new Image();
    var emotionImage = new Image();
    console.log(this.state);
    console.log(this.state.values.emotionValue['file'])
    console.log(this.state.values.eyeValue['file'])
    console.log(this.state.values.furValue['file'])
    var emotionProm = getImageUrl(this.state.values.emotionValue['file'])
    var eyeProm = getImageUrl(this.state.values.eyeValue['file'])
    var furProm = getImageUrl(this.state.values.furValue['file'])
    emotionImage.onload = () => {
      console.log("emotion is loaded");
      ctx.drawImage(emotionImage, 0, 0, c.width, c.height); //image, x, y, width, height
    };
    eyesImage.onload = () => {
      console.log("eye is loaded");
      ctx.drawImage(eyesImage, 0, 0, c.width, c.height);
    };
    furImage.onload = () => {
      console.log("fur is loaded");
      ctx.drawImage(furImage, 0, 0, c.width, c.height);
    };
    emotionImage.crossOrigin = "anonymous";
    eyesImage.crossOrigin = "anonymous";
    furImage.crossOrigin = "anonymous";
    furProm.then( url => { furImage.src = url; console.log(url) })
    eyeProm.then( url => {eyesImage.src = url; console.log(url) })
    emotionProm.then( url => { emotionImage.src = url; console.log(url) })
    Promise.all([eyeProm, emotionProm, furProm]).then( (values) => {
    }).catch((error) => console.log(error));
  };

  loadOptions(options, type) { //Return tabs for background and breed
    var tabOptions;
    tabOptions = options.map((value, index) => {
      if(type == "bg"){
        return <Tab key={index} label={Object.keys(value)} style={{backgroundColor: Object.values(value), color:'white'}}/>;
      }
      else if(type == "fur" || type == "eyes"){
        return <Tab key={index} label={value[Object.keys(value)[0]]} style={{backgroundColor: value[Object.keys(value)[0]], color:'white'}}/>;
      }
      else {
        return <Tab key={index} label={value[Object.keys(value)[0]]} style={{backgroundColor: "white", color:'black'}}/>;
      }
    });
    return tabOptions;
  }
  
  handleChange = (event, value, selector) => { //value is returned index of tab option
    var stateCopy = this.state;
    if(selector == 'bgcolor'){
      stateCopy.values.backgroundValue = {color: Object.keys(this.state.options.backgroundColorOptions[value])[0], hex: Object.values(this.state.options.backgroundColorOptions[value])[0], index: value};
      this.setState(stateCopy, () => this.updateCanvas());
    }
    else if(selector == 'fur'){
      stateCopy.values.furValue = {id: Object.keys(this.state.options.furOptions[value])[0], name: Object.values(this.state.options.furOptions[value])[0], file: this.furs[Object.keys(this.state.options.furOptions[value])[0]]['file'], index: value};
      this.setState(stateCopy, () => this.updateCanvas());
    }
    else if(selector == 'emotion'){
      stateCopy.values.emotionValue = {id: Object.keys(this.state.options.emotionOptions[value])[0], name: Object.values(this.state.options.emotionOptions[value])[0], file: this.emotions[Object.keys(this.state.options.emotionOptions[value])[0]]['file'], index: value};
      this.setState(stateCopy, () => { this.updateEmotion(false)});
    }
    else if(selector == 'eyes'){
      stateCopy.values.eyeValue = {id: Object.keys(this.state.options.eyeOptions[value])[0], name: Object.values(this.state.options.eyeOptions[value])[0], file: this.eyes[Object.keys(this.state.options.eyeOptions[value])[0]]['file'], index: value}; 
      this.setState(stateCopy, () => this.updateCanvas());
    }
    else if(selector == 'breed'){
      stateCopy.values.breedValue = {id: Object.keys(this.state.options.breedOptions[value])[0], name: Object.values(this.state.options.breedOptions[value])[0], index: value}; 
      this.setState(stateCopy, () => { this.updateBreed()});
    }
  };

  handleSubmit() {
    updateUserAvatar(this.props.userId, this.state.values); //Update avatar attributes with text values
          
    document.getElementById("dogEditCanvas").toBlob((blob) => {
      this.userBlob = blob;
      var image = new Image()
      image.src = blob
      uploadUserAvatar(this.props.userId, this.userBlob); //Upload full avatar image
    });
  }

  render() {
    return (
      <div className="dogEditWindow">
        <div className="dogPreview" style={{backgroundColor: this.state.values.backgroundValue.hex}}>
          <canvas className="dogPreviewAvatarImageStyle" id="dogEditCanvas"/>
        </div>
        <div className="dogOptionsSelect">
          <Typography align="center" className="dogOptionSelectTitle"> Breed </Typography>
          <Tabs
            value={this.state.values.breedValue['index']}
            onChange={(event, value) => this.handleChange(event, value, 'breed')}
            scrollable
            scrollButtons="auto"
            className="dogOptionSelectTab"
          >
            {this.loadOptions(this.state.options.breedOptions, "breed")}
          </Tabs>
          <Typography align="center" className="dogOptionSelectTitle"> Background Color </Typography>
          <Tabs
            value={this.state.values.backgroundValue['index']}
            onChange={(event, value) => this.handleChange(event, value, 'bgcolor')}
            scrollable
            scrollButtons="auto"
            className="dogOptionSelectTab"
          >
            {this.loadOptions(this.state.options.backgroundColorOptions, "bg")}
          </Tabs>
          <Typography align="center" className="dogOptionSelectTitle"> Emotion </Typography>
          <Tabs
            value={this.state.values.emotionValue['index']}
            onChange={(event, value) => this.handleChange(event, value, 'emotion')}
            scrollable
            scrollButtons="auto"
            className="dogOptionSelectTab"
          >
            {this.loadOptions(this.state.options.emotionOptions, "emotion")}
          </Tabs>
          <Typography align="center" className="dogOptionSelectTitle"> Fur </Typography>
          <Tabs
            value={this.state.values.furValue['index']}
            onChange={(event, value) => this.handleChange(event, value, 'fur')}
            scrollable
            scrollButtons="auto"
            className="dogOptionSelectTab"
          >
            {this.loadOptions(this.state.options.furOptions, "fur")}
          </Tabs>
          <Typography align="center" className="dogOptionSelectTitle"> Eyes </Typography>
          <Tabs
            value={this.state.values.eyeValue['index']}
            onChange={(event, value) => this.handleChange(event, value, 'eyes')}
            scrollable
            scrollButtons="auto"
            className="dogOptionSelectTab"
          >
            {this.loadOptions(this.state.options.eyeOptions, "eyes")}
          </Tabs>
        </div>
      </div>
    );
  }
}

export default DogEdit;
