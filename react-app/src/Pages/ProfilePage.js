import React from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { CardContent } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Switch from '@material-ui/core/Switch';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';
import ContentCreate from 'material-ui/svg-icons/content/create.js';
import DogEdit from '../Components/DogEdit.js';
import { getUserInfo } from '../Fire.js';
import { getUserDogProfileURL } from '../Components/User.js'
import firebase from 'firebase';

class ProfilePage extends React.Component {
    constructor(props){
        super(props);
        
        this.state = {
            expanded: null,
            dialogToggle: false,
            user: {
                userName: "",
                userAvatar: "", 
                userBG: "" 
            }
        }
        this.toggleDialog = this.toggleDialog.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.dogEditChild = React.createRef();
        this.getHexColor = this.getHexColor.bind(this);
    }

    getHexColor(){
        var bgObj = firebase.database().ref('/backgrounds').once("value")
        .then(function (snapshot) {
            return snapshot.val();
        });
        return bgObj;
    }

    componentDidMount() {
        this.displayUserInfo(this.props.userId);
        getUserDogProfileURL(firebase.auth().currentUser.uid, true).then( url => {
            this.setState({ 
                user: {
                    userName: this.state.user.userName,
                    userAvatar: url, 
                    userBG: this.state.user.userBG
                }
            });
        })
    }
    toggleDialog(){
      getUserDogProfileURL(firebase.auth().currentUser.uid, true).then( url => {
        this.setState({ 
            user: {
                userName: this.state.user.userName,
                userAvatar: url, 
                userBG: this.state.user.userBG
            }
        });
      })
        this.setState({
            dialogToggle: !this.state.dialogToggle
        }, () => 
        {
            if(!this.state.dialogToggle){
                this.displayUserInfo(this.props.userId);
            }
        });
    }
    displayUserInfo(userId){
        var userInfo = getUserInfo(userId);
        var bgProm = this.getHexColor();
        var hexValue;
        userInfo.then((user) => {
            bgProm.then((value) => {
                hexValue = value[user.val().dog.color]['color']; 
                this.setState({ 
                    user: {
                        userName: user.val().username,
                        userAvatar: this.state.user.userAvatar, 
                        userBG: hexValue
                    }
                });
            });
        });
    }
    handleSubmit() {
        this.dogEditChild.current.handleSubmit();
        getUserDogProfileURL(firebase.auth().currentUser.uid, true).then( url => {
                this.setState({ 
                    user: {
                        userName: this.state.user.userName,
                        userAvatar: url, 
                        userBG: this.state.user.userBG
                    }
                });
            })
    }

    render(){
        return(
            <div className="Page" id="ProfilePageScreenStyle">
                <Card className="ProfileHeaderStyle">
                    <CardContent className="ProfileHeaderAvatarStyle" style={{backgroundColor: this.state.user.userBG}}>
                        <Button  className="ProfileEditAvatarButton" variant="fab" mini color="primary" aria-label="Edit" onClick={this.toggleDialog}>
                            <ContentCreate/>
                        </Button>
                        <img src={this.state.user.userAvatar} alt="UserAvatar" className="ProfileHeaderAvatarImage"/>
                    </CardContent>
                    <CardContent>
                        <Typography variant="headline" component="h2">
                            {this.state.user.userName}
                        </Typography>
                    </CardContent>
                </Card>
                <Dialog onClose={this.toggleDialog} open={this.state.dialogToggle} className="dogEditDialog">
                    <DialogTitle>Edit Dog Avatar</DialogTitle>
                    <DialogContent>
                        <DogEdit userId={this.props.userId} ref={this.dogEditChild}/>
                    </DialogContent>
                    <DialogActions style={{textAlign:'center'}}>
                        <Button variant="contained" id="dogEditSubmit" className="dogEditButton" onClick={() =>{this.handleSubmit(); this.toggleDialog()} }> 
                            Submit
                        </Button>
                        <Button variant="contained" id="dogEditCancel" className="dogEditButton" onClick={this.toggleDialog}> 
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog> 
            </div>
        )
    }
}

export default ProfilePage;
