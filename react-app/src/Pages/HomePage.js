import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import FlatButton from 'material-ui/FlatButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemText from '@material-ui/core/ListItemText';
import { CardContent } from '@material-ui/core';
import Avatar from 'material-ui/Avatar'
import SocialSchool from 'material-ui/svg-icons/social/school.js';

const HomePageScreenStyle = {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
}
const NearbyBarksCardStyle = {
    width: '100%',
    height: '100%'
}
const LeftCardColumnStyle = {
    display: 'flex',
    flexDirection: 'column'
}
const RightCardColumnStyle = {
    display: 'flex',
    flexDirection: 'column'
}
const CardGroupStyle = {
    height: '100%',
    width: '90%',
    display: 'flex',
    flexDirection: 'row'
}
const HeaderCardStyle = {
}

class HomePage extends React.Component {
    render(){
        return(
            <div className="Page" style={HomePageScreenStyle}>
                <Card style={HeaderCardStyle}>
                    <CardContent>
                        <h3> Welcome </h3>
                    </CardContent>
                </Card>
            <div style={CardGroupStyle}>
                <div style={LeftCardColumnStyle}>
                    <Card style={NearbyBarksCardStyle}>
                        <CardContent>
                            <p> Nearby Barks </p>
                            <h1> 82 </h1>
                            <FlatButton> To Map </FlatButton>
                        </CardContent>
                    </Card>
                    <Card style={NearbyBarksCardStyle}>
                        <CardContent>
                        <List subheader={<h3> Popular Reactions </h3>}>
                                <ListItem>
                                    <Avatar>
                                        <SocialSchool />
                                    </Avatar>
                                    <ListItemText primary="Funny" />
                                </ListItem>
                                <ListItem>
                                    <Avatar>
                                        <SocialSchool />
                                    </Avatar>
                                    <ListItemText primary="Sad"/>
                                </ListItem>
                            </List>
                        </CardContent>
                    </Card>
                </div>
                <div style={RightCardColumnStyle}>
                    <Card style={NearbyBarksCardStyle}>
                        <CardContent>
                            <List subheader={<h3> Popular Point of Interests </h3>}>
                                <ListItem>
                                    <Avatar>
                                        <SocialSchool />
                                    </Avatar>
                                    <ListItemText primary="Hughes High School" secondary="Education" />
                                </ListItem>
                                <ListItem>
                                    <Avatar>
                                        <SocialSchool />
                                    </Avatar>
                                    <ListItemText primary="Nippert Stadium" secondary="Sports" />
                                </ListItem>
                                <ListItem>
                                    <Avatar>
                                        <SocialSchool />
                                    </Avatar>
                                    <ListItemText primary="Bibibop" secondary="Food" />
                                </ListItem>
                            </List>
                        </CardContent>
                    </Card>
                </div>
                </div>
            </div>
        )
    }
}

export default HomePage;