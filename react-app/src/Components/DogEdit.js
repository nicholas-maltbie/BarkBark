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
import { getDogOptions, getBreeds, getBackgroundColors, getUserInfo, getDogPart, updateUserAvatar, uploadUserAvatar } from '../Fire.js';

class DogEdit extends React.Component {
  constructor(props){
    super(props);
    
    this.state = { //initialLoad variable may be needed for intitial canvas update
      values: {
        backgroundValue: "",
        furValue: "",
        emotionValue: "",
        breedValue: "",
        eyeValue: "",
      },
      options: {
        breedOptions: [],
        backgroundColorOptions: [],
        eyeOptions: {},
        furOptions: {},
        emotionOptions: {},
      }
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
      },
      userBlob: ""
    });
    updateCanvas();
  };

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
    var c=document.getElementsByClassName("dogPreviewAvatarImageStyle");
    var ctx=c.getContext("2d");
    var furImage = new Image();
    var eyesImage = new Image();
    var emotionImage = new Image();
    var breedImage = new Image();
    furImage.src = getDogPart(this.state.breedValue, "fur", this.state.values.furValue);;
    furImage.onload = function() {
      ctx.drawImage(furImage, 0, 0, 300, 300); //image, x, y, width, height
      eyesImage.src = getDogPart(this.state.breedValue, "eyes", this.state.values.eyeValue);;
      eyesImage.onload = function() {
          ctx.drawImage(eyesImage, 0, 0, 300, 300);
          emotionImage.src = getDogPart(this.state.breedValue, "emotion", this.state.values.emotionValue);;
          emotionImage.onload = function() {
            ctx.drawImage(emotionImage, 0, 0, 300, 300);
            breedImage.src = getDogPart(this.state.breedValue, "fur", this.state.values.furValue);
            breedImage.onload = function() {
              ctx.drawImage(breedImage, 0, 0, 300, 300);
              c.toBlob(function(blob){
                this.setState({userBlob: blob});
              });
            };
          };
        };
      };
    };
  }

  loadOptions(options) { //Return an array of tabs based on generated options
    var tabOptions;
    if(Array.isArray(options)) {
      tabOptions = options.map((value) => {
        if(value == "white" || value == "White"){
          return <Tab label={value} style={{backgroundColor: value, color:'black'}}/>;
        }
        return <Tab label={value} style={{backgroundColor: value, color:'white'}}/>;
      })
    }
    else {
      tabOptions = Object.keys(options).map((value) => {
        if(options[value] == "white" || options[value] == "White"){
          return <Tab label={options[value]} style={{backgroundColor: options[value], color:'black'}}/>;
        }
        return <Tab label={options[value]} style={{backgroundColor: options[value], color:'white'}}/>;
      });  
    }
    return tabOptions;
  }
  

  handleChange = (event, value, selector) => { //value is returned index of tab option
    if(selector == 'BGColor'){
      this.setState({ backgroundValue: this.state.options.backgroundColorOptions[value] });
    }
    else if(selector == 'Fur'){
      this.setState({ furValue: this.state.options.furOptions[Object.keys(this.state.options.furOptions)[value]] });
    }
    else if(selector == 'Emotion'){
      this.setState({ emotionValue: this.state.options.emotionOptions[Object.keys(this.state.options.emotionOptions)[value]] });
    }
    else if(selector == 'Eyes'){
      this.setState({ emotionValue: this.state.options.eyeOptions[Object.keys(this.state.options.eyeOptions)[value]] });
    }
    else if(selector == 'Breed'){
      this.setState({ breedValue: this.state.options.breedOptions[value] });
      this.handleChangeBreed();
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
                {this.loadOptions(this.state.options.breedOptions)}
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
              {this.loadOptions(this.state.options.backgroundColorOptions)}
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
              {this.loadOptions(this.state.options.furOptions)}
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
              {this.loadOptions(this.state.options.emotionOptions)}
            </Tabs>
          </AppBar>
          <AppBar position="static" color="default" className="valueDogSelectorBarStyle">
            <Typography> Emotion </Typography>
            <Tabs
              value={this.state.eyeColorValue}
              onChange={(event, value) => this.handleChange(event, value, 'Eyes')}
              scrollable
              scrollButtons="auto"
            >
              {this.loadOptions(this.state.options.eyeOptions)}
            </Tabs>
          </AppBar>
          <Button className="dogEditSubmit" variant="contained" onClick={this.handleSubmit}> Submit </Button>
        </div>
      </div>
    );
  }
}

export default DogEdit;
