import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import firebase from 'firebase';

class ViewBark extends React.Component{
  constructor(props){
      super(props);
  this.state = {
      open: false,
      updateFn: props.updateFn,
      CoolEmojiURL: '',
      CoolEmojiNum: 0,
      DroolEmojiURL: '',
      DroolEmojiNum: 0,
      HappyEmojiURL: '',
      HappyEmojiNum: 0,
      LoveEmojiURL: '',
      LoveEmojiNum: 0,
      NormalEmojiURL: '',
      NormalEmojiNum: 0,
      SadEmojiURL: '',
      SadEmojiNum: 0,
      CanReact: true
    }
    this.last_bark_id = null
    //this.handleClickOpen=this.handleClickOpen.bind(this);
    //this.handleClose=this.handleClose.bind(this);
    this.getImageUrl = this.getImageUrl.bind(this);
    this.getEmojis = this.getEmojis.bind(this);
    this.updateListener = this.updateListener.bind(this)
    this.updateBarkCountsOnAdd = this.updateBarkCountsOnAdd.bind(this)
    this.updateBarkCountsOnChange = this.updateBarkCountsOnChange.bind(this)
    //this.renderPicture = this.renderPicture(this);
    //this.getIconURL = this.getIconURL.bind(this);
    //this.getIconImages=this.getIconImages.bind(this);
  }
 
  async componentDidMount(){
    this.renderPicture();
  }
  
  
  componentWillUnmount() {
    this.updateListener(null)
  }
  
  handleClickOpen = () => {
    this.props.updateFn(true)
  };

  handleClose = (other_fn) => {
    this.props.updateFn(false)
    //other_fn()
  };

  ToogleCanReact = () =>{
    this.setState({CanReact:false});
  }

  CoolClicked = () =>{
    if(this.state.CanReact == true){
      var temp = this.state.CoolEmojiNum;
      temp = temp + 1;
      // NOTE, THIS WILL RESET THE OTHER COUNTS
      this.setState({CoolEmojiNum:temp});
    }
    this.ToogleCanReact();

  }

  DroolClicked = () =>{
    if(this.state.CanReact == true){
      var temp = this.state.DroolEmojiNum;
      temp = temp + 1;
      // NOTE, THIS WILL RESET THE OTHER COUNTS
      this.setState({DroolEmojiNum:temp});
    }
    this.ToogleCanReact();
    
  }

  HappyClicked = () =>{
    if(this.state.CanReact == true){
      var temp = this.state.HappyEmojiNum;
      temp = temp + 1;
      // NOTE, THIS WILL RESET THE OTHER COUNTS
      this.setState({HappyEmojiNum:temp});
    }
    this.ToogleCanReact();
    
  }

  LoveClicked = () =>{
    if(this.state.CanReact == true){
      var temp = this.state.LoveEmojiNum;
      temp = temp + 1;
      // NOTE, THIS WILL RESET THE OTHER COUNTS
      this.setState({LoveEmojiNum:temp});
    }
    this.ToogleCanReact();
    
  }

  NormalClicked = () =>{
    if(this.state.CanReact == true){
      var temp = this.state.NormalEmojiNum;
      temp = temp + 1;
      // NOTE, THIS WILL RESET THE OTHER COUNTS
      this.setState({NormalEmojiNum:temp});
    }
    this.ToogleCanReact();
    
  }

  SadClicked = () =>{
    if(this.state.CanReact == true){
      var temp = this.state.SadEmojiNum;
      temp = temp + 1;
      this.setState({SadEmojiNum:temp});
    }
    this.ToogleCanReact();
    
  }
  
  updateBarkCountsOnAdd(dataAdded) {
    // UPDATE BARK COUNTS @BLAKE
  }
  
  updateBarkCountsOnChange(dataChanged) {
    // UPDATE BARK COUNTS @BLAKE
    
  }
    
  updateListener(barkId) {
    if (this.last_bark_id != barkId) {
      var root = firebase.database().ref()
      if (this.last_bark_id != null) {
        root.child("bark_reactions").child(this.last_bark_id).off('child_added', this.updateBarkCountsOnAdd)
        root.child("bark_reactions").child(this.last_bark_id).off('child_changed', this.updateBarkCountsOnChange)
        // reset bark counts next
      }
      if (barkId != null) {
        root.child("bark_reactions").child(barkId).on('child_added', this.updateBarkCountsOnAdd)
        root.child("bark_reactions").child(barkId).on('child_changed', this.updateBarkCountsOnChange)
      }
      this.last_bark_id = barkId
    }
  }

  getImageUrl(location){
    
    var storageRef = firebase.storage().ref();
    var starsRef = storageRef.child(location);
    return starsRef.getDownloadURL().then((url)=> {
    return url;
    
    });
    
    }
    
    getEmojis() { 
    //Get background color object     
    var emObj =
    firebase.database().ref('/emojis').once("value")
    .then(function (snapshot) {
    if (snapshot.val() != null) {
    return snapshot.val(); 
    }
    
    });
    
    return emObj;
    
    }
    
    async renderPicture(){
    var emojis = await this.getEmojis();

    var source = await this.getImageUrl(emojis['cool']);
    this.setState({CoolEmojiURL: source});

    var source = await this.getImageUrl(emojis['drool']);
    this.setState({DroolEmojiURL: source});

    var source = await this.getImageUrl(emojis['happy']);
    this.setState({HappyEmojiURL: source});

    var source = await this.getImageUrl(emojis['love']);
    this.setState({LoveEmojiURL: source});

    var source = await this.getImageUrl(emojis['normal']);
    this.setState({NormalEmojiURL: source});

    var source = await this.getImageUrl(emojis['sad']);
    this.setState({SadEmojiURL: source});
  }
      
  render() {
    this.updateListener(this.props.barkId)
    return (
      <div>
        <Dialog
          open={this.props.open}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          >
          
        
          <DialogActions>
            <Button onClick={() => {this.handleClose(this.props.onNo)}} color="primary">
              Close<br/>Bark
            </Button>
            <div>
            <div>  
              <Button><img src = {this.state.CoolEmojiURL} alt ="Cool dog" width = "75" height ="75" onClick={this.CoolClicked}/></Button>
              :{this.state.CoolEmojiNum}
            </div>
              <div>
                <Button><img src = {this.state.DroolEmojiURL} alt ="Drool dog" width = "75" height ="75" onClick ={this.DroolClicked}/></Button>
                :{this.state.DroolEmojiNum}
              </div>
                <div>
                  <Button><img src = {this.state.HappyEmojiURL} alt = "Happy dog" width = "75" height = "75" onClick = {this.HappyClicked}/></Button>
                  :{this.state.HappyEmojiNum}
                </div>
                  <div>
                    <Button><img src = {this.state.LoveEmojiURL} alt = "Love dog" width = "75" height = "75" onClick = {this.LoveClicked}/></Button>
                    :{this.state.LoveEmojiNum}
                  </div>
                    <div>
                      <Button><img src = {this.state.NormalEmojiURL} alt = "Normal dog" width = "75" height = "75" onClick ={this.NormalClicked}/></Button>
                      :{this.state.NormalEmojiNum}
                    </div>
                      <div>
                        <Button><img src = {this.state.SadEmojiURL} alt = "Sad dog" width = "75" height = "75" onClick = {this.SadClicked}/></Button>
                        :{this.state.SadEmojiNum}
                      </div>                        
            </div>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
export default ViewBark;