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
      }
      //this.handleClickOpen=this.handleClickOpen.bind(this);
      //this.handleClose=this.handleClose.bind(this);
    }
    
      handleClickOpen = () => {
        this.setState({ open: true });
      };
    
      handleClose = () => {
        this.setState({ open: false });
      };
    
    
      render() {
        return (
          <div>
            <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">{"Bark!?"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                 Are you sure you want to bark at this location?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                  No
                </Button>
                <Button onClick={this.handleClose} color="primary" autoFocus>
                  Yes
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        );
      }
    }



//class MakeBark extends React.Component{
  //  constructor(props){
    //    super(props);
      //  this.state ={

       // }
        //this.toggleDialog = this.toggleDialog.bind(this);
    //}
    //toggleDialog(){
      //  this.setState({
        //    dialogToggle: !this.state.dialogToggle
        //});
    //}

    //render(){
      //  return (
        //  <div className = "MarkBarkWindow">
          //  <Dialog onClose={this.toggleDialog} open={this.state.dialogToggle}>
            //    <Button className="YesButton" variant="contained" onClick={console.log("Clicked yes")}> Yes </Button>
              //  <Button className="NoButton" variant="contained" onClick={console.log("Clicked no")}> No </Button>
            //</Dialog>
          //</div>
        //);

        
   // }
//}
export default MakeBark;this