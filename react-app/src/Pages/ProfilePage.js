import React from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { CardContent } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import SocialPeople from 'material-ui/svg-icons/social/people.js';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Switch from '@material-ui/core/Switch';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';



const ProfilePageScreenStyle ={
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: '5%'
}
const ProfileHeaderStyle = {
    width: '80%',
    height: '100%'
}
const ProfileExpansionTab = {
    width: '80%',
    height: '20%'
}
const ProfileAvatar = {
    width: '200px',
    height: '200px'
}

class ProfilePage extends React.Component {
    constructor(props){
        super(props);
        
        this.state = {
            expanded: null
        }
    }

    handleExpansion(event, panel){
        this.setState({
            expanded: (this.state.expanded == panel) ? null : panel
        });
    }
    render(){
        return(
            <div className="Page" style={ProfilePageScreenStyle}>
                <Card style={ProfileHeaderStyle}>
                    <CardContent>
                        <SocialPeople/>
                    </CardContent>
                    <CardContent>
                        <Typography variant="headline" component="h2">
                            Ken Baker
                        </Typography>
                    </CardContent>
                </Card>
                <ExpansionPanel expanded={this.state.expanded == "UserPanel"} onChange={(e) => this.handleExpansion(e, "UserPanel")}
                style={ProfileExpansionTab}>
                    <ExpansionPanelSummary>
                        <Typography> User Settings </Typography>
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
                <ExpansionPanel expanded={this.state.expanded === "AdvancedPanel"} onChange={(e) => this.handleExpansion(e, "AdvancedPanel")}
                style={ProfileExpansionTab}>
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
                <ExpansionPanel expanded={this.state.expanded === "EditDogPanel"} onChange={(e) => this.handleExpansion(e, "EditDogPanel")}
                style={ProfileExpansionTab}>
                    <ExpansionPanelSummary>
                        <Typography> Edit Dog Avatar </Typography>
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