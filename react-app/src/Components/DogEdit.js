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
import testPicture from '../Static/715(1).jpg';

class DogEdit extends React.Component {
  state = {
    backgroundValue: 0,
    furColorValue: 0,
    eyeColorValue: 0,
    breedValue: 0,
    backgroundColorOptions: ['Blue', 'Green', 'Yellow', 'Orange', 'Violet']
  };

  handleChange = (event, value, selector) => {
    if(selector == 'BGColor'){
      this.setState({ backgroundValue: value });
    }
    else if(selector == 'FurColor'){
      this.setState({ furColorValue: value });
    }
    else if(selector == 'EyeColor'){
      this.setState({ eyeColorValue: value });
    }
    else if(selector == 'Breed'){
      this.setState({ breedValue: value });
    }
  };

  render() {
    
    return (
      <div className="dogEditWindow">
        <div className="dogPreviewStyle" style={{backgroundColor: this.state.backgroundColorOptions[this.state.backgroundValue]}}>
          <Card>
              <div className="dogPreviewBGStyle"/>
              <div className="dogPreviewAvatarStyle">
              </div>
          </Card>
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
              value={this.state.furColorValue}
              onChange={(event, value) => this.handleChange(event, value, 'FurColor')}
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
            <Typography> Eye Color </Typography>
            <Tabs
              value={this.state.eyeColorValue}
              onChange={(event, value) => this.handleChange(event, value, 'EyeColor')}
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
            <Typography> Breed </Typography>
            <Tabs
              value={this.state.breedValue}
              onChange={(event, value) => this.handleChange(event, value, 'Breed')}
              scrollable
              scrollButtons="auto"
            >
              <Tab label="Poodle"/>
              <Tab label="Labrador" />
              <Tab label="Pitbull" />
              <Tab label="German Shepard" />
              <Tab label="Husky" />
            </Tabs>
          </AppBar>
        </div>
      </div>
    );
  }
}

DogEdit.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default DogEdit;