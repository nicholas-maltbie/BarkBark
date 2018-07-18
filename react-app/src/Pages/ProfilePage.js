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
import Dialog from '@material-ui/core/Dialog';
import ContentCreate from 'material-ui/svg-icons/content/create.js';
import DogEdit from '../Components/DogEdit.js';
import { getUserAvatar, updateUserAvatar } from '../Fire.js';

class ProfilePage extends React.Component {
    constructor(props){
        super(props);
        
        this.state = {
            expanded: null,
            dialogToggle: false,
            userAvatarUrl: "",
            userBG: "",
            userBreed: "",
            userEmotion: "",
            userFur: ""
        }
        this.toggleDialog = this.toggleDialog.bind(this);
        this.avatarChange = this.avatarChange.bind(this);
    }

    componentDidMount() {
        this.displayUserInfo(this.props.userId);
    }

    handleExpansion(event, panel){
        this.setState({
            expanded: (this.state.expanded == panel) ? null : panel
        });
    }
    toggleDialog(){
        this.setState({
            dialogToggle: !this.state.dialogToggle
        });
    }
    async displayUserInfo(userId){
        var userInfo = await getUserAvatar(userId);
        this.setState({ 
            userName: userInfo.data.username,
            userAvatarUrl: userInfo.default, 
            userBG: userInfo.data.dog.color,
            userBreed: userInfo.data.dog.breed,
            userEmotion: userInfo.data.dog.emotion,
            userFur: userInfo.data.dog.fur,
        });
    }

    avatarChange(bg, breed, emotion, fur) {
        this.setState({ 
            userBG: bg,
            userBreed: breed,
            userEmotion: emotion,
            userFur: fur,
        });
        updateUserAvatar(this.props.userId, bg, breed, emotion, fur);
    }
    render(){
        return(
            <div className="Page" id="ProfilePageScreenStyle">
                <Card className="ProfileHeaderStyle">
                    <CardContent className="ProfileHeaderAvatarStyle" style={{backgroundColor: this.state.userBG}}>
                        <Button  className="ProfileEditAvatarButton" variant="fab" mini color="primary" aria-label="Edit" onClick={this.toggleDialog}>
                            <ContentCreate/>
                        </Button>
                        <img src={this.state.userAvatarUrl} alt="UserAvatar" className="ProfileHeaderAvatarImage"/>
                    </CardContent>
                    <CardContent>
                        <Typography variant="headline" component="h2">
                            {this.state.userName}
                        </Typography>
                    </CardContent>
                </Card>
                <Dialog onClose={this.toggleDialog} open={this.state.dialogToggle}>
                    <DialogTitle>Edit Dog Avatar</DialogTitle>
                    <DogEdit default={this.state.userAvatarUrl} userBG={this.state.userBG} 
                        userBreed={this.state.userBreed} userEmotion={this.state.userEmotion} 
                        userFur={this.state.userFur} dogEditChange={this.avatarChange}
                    />
                </Dialog>
                <ExpansionPanel expanded={this.state.expanded == "UserPanel"} onChange={(e) => this.handleExpansion(e, "UserPanel")}
                className="ProfileExpansionTab">
                    <ExpansionPanelSummary>
                        <Typography> User Settings </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <List fontFamily = "sans-serif"> 
                            <ListItem>
                                <ListItemText primary="Display Name" />
                                <ListItemSecondaryAction>
                                <Switch
                                    
                                />
                                </ListItemSecondaryAction> 
                            </ListItem>
                        </List> 
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel expanded={this.state.expanded === "AdvancedPanel"} onChange={(e) => this.handleExpansion(e, "AdvancedPanel")}
                className="ProfileExpansionTab">
                    <ExpansionPanelSummary>
                        <Typography> Advanced Settings </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <List> 
                            <ListItem>
                                <ListItemText primary="Display Name" />
                                <ListItemSecondaryAction>
                                <Switch
                                    
                                />
                                </ListItemSecondaryAction> 
                            </ListItem>
                        </List> 
                    </ExpansionPanelDetails>
                </ExpansionPanel>         
            </div>
        )
    }
}

export default ProfilePage;