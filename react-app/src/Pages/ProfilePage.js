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

class ProfilePage extends React.Component {
    constructor(props){
        super(props);
        
        this.state = {
            expanded: null,
            dialogToggle: false
        }
        this.toggleDialog = this.toggleDialog.bind(this);
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
    render(){
        return(
            <div className="Page" id="ProfilePageScreenStyle">
                <Card className="ProfileHeaderStyle">
                    <CardContent className="ProfileHeaderAvatarStyle">
                        <Button variant="fab" color="secondary" aria-label="edit" onClick={this.toggleDialog}>
                            <ContentCreate/>
                        </Button>
                    </CardContent>
                    <CardContent>
                        <Typography variant="headline" component="h2">
                            Ken Baker
                        </Typography>
                    </CardContent>
                </Card>
                <Dialog onClose={this.toggleDialog} open={this.state.dialogToggle}>
                    <DialogTitle>Edit Dog Avatar</DialogTitle>
                    <DogEdit/>
                </Dialog>
                <ExpansionPanel expanded={this.state.expanded == "UserPanel"} onChange={(e) => this.handleExpansion(e, "UserPanel")}
                className="ProfileExpansionTab">
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