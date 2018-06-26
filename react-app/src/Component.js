import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import Menu from 'material-ui/svg-icons/navigation/menu.js';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';


const NavBarStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems:'center',
    backgroundColor: 'rgb(51, 204, 204)',
    width:'100%'
};
const NavBarHeaderStyle = {
    width:'80%',
    textAlign: 'center',
    fontSize:'24px'
};
const NavBarMenuStyle = {
    width:'10%'
}

export default class NavBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle = () => this.setState({open: !this.state.open});

  render() {
    return (
      <div style={NavBarStyle}>
        <FlatButton onClick={this.handleToggle} style={NavBarMenuStyle}>
          <Menu viewBox="0 0 20 20" style={{marginTop:'2px'}}/>
        </FlatButton>
        <div className="Header" style={NavBarHeaderStyle}>
          Bark Bark
        </div>
        <Chip>
          <Avatar icon={<Menu/>} />
          FontIcon Avatar Chip
        </Chip>
        <Drawer open={this.state.open}>
          <MenuItem>Menu Item</MenuItem>
          <MenuItem>Menu Item 2</MenuItem>
          <FlatButton label="Close" onClick={this.handleToggle}/>
        </Drawer>
      </div>
    );
  }
}