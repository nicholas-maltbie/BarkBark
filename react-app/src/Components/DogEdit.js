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

class DogEdit extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {
      backgroundValue: "",
      furValue: "",
      emotionValue: "",
      breedValue: "",
      backgroundColorOptions: ['Blue', 'Green', 'Yellow', 'Orange', 'Violet'],
      furColorOptions: ['Gray', 'Black', 'Tan'],
      emotionOptions: ['Happy', 'Sad'],
      breedOptions: ['Boxer', 'Chihuahua', 'Husky', 'Labrador', 'Poodle', 'Spaniel']
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({
      backgroundValue: this.props.userBG,
      furValue: this.props.userFur,
      emotionValue: this.props.userEmotion,
      breedValue: this.props.userBreed,
    })
  };
  

  handleChange = (event, value, selector) => {
    if(selector == 'BGColor'){
      this.setState({ backgroundValue: this.state.backgroundColorOptions[value] });
    }
    else if(selector == 'Fur'){
      this.setState({ furValue: this.state.furColorOptions[value] });
    }
    else if(selector == 'Emotion'){
      this.setState({ emotionValue: this.state.emotionOptions[value] });
    }
    else if(selector == 'Breed'){
      this.setState({ breedValue: this.state.breedOptions[value] });
    }
  };

  handleSubmit() {
    console.log(this.state);
    this.props.dogEditChange(this.state.backgroundValue, this.state.breedValue, this.state.emotionValue, this.state.furValue);
  }

  render() {
    
    return (
      <div className="dogEditWindow">
        <div className="dogPreviewStyle" style={{backgroundColor: this.state.backgroundValue}}>
            <img src={this.props.default} alt="UserAvatar" className="dogPreviewAvatarImageStyle"/>
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
