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
import { getDogOptions, getBreeds, getBackgroundColors, getUserInfo, getDogPart } from '../Fire.js';

class DogEdit extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {
      values: {
        backgroundValue: "",
        furValue: "",
        emotionValue: "",
        breedValue: "",
        eyeValue: "",
      },
      options: {
        breedOptions: {},
        backgroundColorOptions: {},
        eyeOptions: {},
        furOptions: {},
        emotionOptions: {},
      },
      initialLoad: true
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    var breedOptions = getBreeds();
    var backgroundOptions = getBackgroundColors();
    var userInfo = getUserInfo();
    var dogOptions = getDogOptions(userInfo.dog.breed);
    this.setState({
      values: {
        backgroundValue: userInfo.dog.color,
        furValue: userInfo.dog.fur,
        emotionValue: userInfo.dog.emotion,
        breedValue: userInfo.dog.breed,
        eyeValue: userInfo.dog.eyes,
      },
      options: {
        breedOptions: breedOptions,
        backgroundColorOptions: backgroundOptions,
        eyeOptions: dogOptions.eyes,
        furOptions: dogOptions.fur,
        emotionOptions: dogOptions.emotion,
      }
    });
    updateCanvas();
    loadOptions();
  };

  componentWillUnmount(){
    this.setState({initialLoad: false});
  }

  handleChangeBreed(){
    var dogOptions = getDogOptions(this.state.values.breedValue);
    this.setState({
      options: {
        eyeOptions: dogOptions.eyes,
        furOptions: dogOptions.fur,
        emotionOptions: dogOptions.emotion
      }
    });
  }

  updateCanvas() { 
    if(this.state.initialLoad){
      var fur = getDogPart(this.state.breedValue, "fur", this.state.values.furValue);
      var eyes = (this.state.breedValue, "eyes", this.state.values.eyeValue);
      var emotion = getDogPart(this.state.breedValue, "emotion", this.state.values.emotionValue);
      var breed = getDogPart(this.state.breedValue, "fur", this.state.values.furValue);
      this.setState({initialLoad: false});
    }
    var c=document.getElementsByClassName("dogPreviewAvatarImageStyle");
    var ctx=c.getContext("2d");
    var imageObj1 = new Image();
    var imageObj2 = new Image();
    imageObj1.src = "1.png"
    imageObj1.onload = function() {
      ctx.drawImage(imageObj1, 0, 0, 328, 526);
      imageObj2.src = "2.png";
      imageObj2.onload = function() {
          ctx.drawImage(imageObj2, 15, 85, 300, 300);
          var img = c.toDataURL("image/png");
          document.write('<img src="' + img + '" width="328" height="526"/>');
      }
    };
  }

  loadOptions(options) {
    options.forEach()

  }
  

  handleChange = (event, value, selector) => {
    if(selector == 'BGColor'){
      this.setState({ backgroundValue: this.state.options.backgroundOptions[Object.keys(this.state.options.backgroundOptions)[value]] });
    }
    else if(selector == 'Fur'){
      this.setState({ furValue: this.state.options.furOptions[Object.keys(this.state.options.furOptions)[value]] });
    }
    else if(selector == 'Emotion'){
      this.setState({ emotionValue: this.state.options.emotionOptions[Object.keys(this.state.options.emotionOptions)[value]] });
    }
    else if(selector == 'Breed'){
      this.setState({ breedValue: this.state.options.breedOptions[Object.keys(this.state.options.breedOptions)[value]] });
      this.handleChangeBreed();
    }
    this.updateCanvas
  };

  handleSubmit() {
    updateUserAvatar(this.props.userId, this.state.values);
  }

  render() {
    
    return (
      <div className="dogEditWindow">
        <div className="dogPreviewStyle" style={{backgroundColor: this.state.backgroundValue}}>
          <canvas className="dogPreviewAvatarImageStyle"/>
        </div>
        <div className="valueDogSelectorStyle">
          <AppBar position="static" color="default" className="valueDogSelectorBarStyle">
            <Typography> Background Color </Typography>
            <Tabs
              value={this.state.backgroundValue}
              onChange={(event, value) => this.handleChange(event, value, 'BGColor')}
              scrollable
              scrollButtons="auto"
            >
              <Tab label="Blue" style={{backgroundColor:'blue', color:'white'}}/>
              <Tab label="Green" style={{backgroundColor:'Green', color:'white'}}/>
              <Tab label="Yellow" style={{backgroundColor:'Yellow', color:'white'}}/>
              <Tab label="Orange" style={{backgroundColor:'Orange', color:'white'}}/>
              <Tab label="Violet" style={{backgroundColor:'Violet', color:'white'}}/>
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
              <Tab label="Gray" style={{backgroundColor:'Gray', color:'white'}}/>
              <Tab label="Black" style={{backgroundColor:'Black', color:'white'}}/>
              <Tab label="Tan" style={{backgroundColor:'Tan', color:'white'}}/>
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
              <Tab label="Happy" style={{backgroundColor:'Orange', color:'white'}}/>
              <Tab label="Sad" style={{backgroundColor:'Gray', color:'white'}}/>
            </Tabs>
          </AppBar>
          <AppBar position="static" color="default" className="valueDogSelectorBarStyle">
            <Typography> Breed </Typography>
            <Tabs
              value={this.state.breedValue}
              onChange={(event, value) => this.handleChange(event, value, 'Breed')}
              scrollable
              scrollButtons="auto"
            >
              <Tab label="Boxer"/>
              <Tab label="Chihuahua" />
              <Tab label="Husky" />
              <Tab label="Labrador" />
              <Tab label="Poodle" />
              <Tab label="Spaniel" />
            </Tabs>
          </AppBar>
          <Button className="dogEditSubmit" variant="contained" onClick={this.handleSubmit}> Submit </Button>
        </div>
      </div>
    );
  }
}

export default DogEdit;
