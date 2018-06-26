import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import Menu from 'material-ui/svg-icons/navigation/menu.js';

const NavBarStyle = {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'rgb(51, 204, 204)'
};

export default class NavBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle = () => this.setState({open: !this.state.open});

  render() {
    return (
      <div style={NavBarStyle}>
        <FlatButton onClick={this.handleToggle}>
          <Menu viewBox="0 0 19 19"/>
        </FlatButton>
        <Drawer open={this.state.open}>
          <MenuItem>Menu Item</MenuItem>
          <MenuItem>Menu Item 2</MenuItem>
          <FlatButton
          label="Close"
          onClick={this.handleToggle}
          />
        </Drawer>
      </div>
    );
  }
}