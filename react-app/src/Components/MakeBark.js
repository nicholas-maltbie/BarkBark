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
//import Button from '@material-ui/core/Button';
//import { Dialog } from '../../node_modules/@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class MakeBark extends React.Component{
  constructor(props){
      super(props);
  this.state = {
      open: false,
      updateFn: props.updateFn,
    }
    this.handleClickOpen=this.handleClickOpen.bind(this);
    this.handleClose=this.handleClose.bind(this);
  }
  
    handleClickOpen = () => {
      this.props.updateFn(true)
    };
  
    handleClose = (other_fn) => {
      this.props.updateFn(false)
      other_fn()
    };
  
  
    render() {
      return (
        <div>
          <Dialog
            open={this.props.open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
          <DialogTitle id="alert-dialog-title">{"Bark?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
             Are you sure you want to bark at this location?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => {this.handleClose(this.props.onNo)}} color="primary">
              No
            </Button>
            <Button onClick={() => {this.handleClose(this.props.onYes)}} color="primary" autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
export default MakeBark;