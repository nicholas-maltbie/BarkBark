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
      cool: 0,
      DroolEmojiURL: '',
      drool: 0,
      HappyEmojiURL: '',
      happy: 0,
      LoveEmojiURL: '',
      love: 0,
      NormalEmojiURL: '',
      normal: 0,
      SadEmojiURL: '',
      sad: 0,
      CanReact: true
    }
    this.savedReactions = {}
    this.last_bark_id = null
    this.UserID = null
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
    this.updateListener(this.props.barkId)

  }
  
  
  componentWillUnmount() {
    this.updateListener(null)
  }
  
  handleClickOpen = () => {
    this.props.updateFn(true)
    console.log("TEST")
  };

  handleClose = (other_fn) => {
    this.props.updateFn(false)
    //other_fn()
  };

  ToogleCanReact = () =>{
    this.setState({CanReact:false});
  }

  CoolClicked = () =>{
    //if(this.state.CanReact == true){
      //var temp = this.state.CoolEmojiNum;
      //temp = temp + 1;
      // NOTE, THIS WILL RESET THE OTHER COUNTS
      //this.setState({CoolEmojiNum:temp});
    //}
    //this.ToogleCanReact();
    firebase.database().ref('bark_reactions/' + this.props.barkId + '/' + firebase.auth().currentUser.uid).set('cool')

  }

  DroolClicked = () =>{
    firebase.database().ref('bark_reactions/' + this.props.barkId + '/' + firebase.auth().currentUser.uid).set('drool')
  }

  HappyClicked = () =>{
    firebase.database().ref('bark_reactions/' + this.props.barkId + '/' + firebase.auth().currentUser.uid).set('happy')  
  }

  LoveClicked = () =>{
    firebase.database().ref('bark_reactions/' + this.props.barkId + '/' + firebase.auth().currentUser.uid).set('love')  
  }

  NormalClicked = () =>{
    firebase.database().ref('bark_reactions/' + this.props.barkId + '/' + firebase.auth().currentUser.uid).set('normal')
  }

  SadClicked = () =>{
    firebase.database().ref('bark_reactions/' + this.props.barkId + '/' + firebase.auth().currentUser.uid).set('sad')
  }
  
  updateBarkCountsOnAdd(dataAdded) {
    // UPDATE BARK COUNTS @BLAKE)
    //console.log(dataAdded.key)
    //console.log(dataAdded.val())
    var stateCopy = this.state
    stateCopy[dataAdded.val()] += 1

    this.savedBarks[dataAdded.key] = dataAdded.val()
    this.setState(stateCopy)
  }
  
  updateBarkCountsOnChange(dataChanged) {
    // UPDATE BARK COUNTS @BLAKE
    //console.log(dataChanged.key)
    //console.log(dataChanged.val())
    var stateCopy = this.state
    stateCopy[this.savedBarks[dataChanged.key]] -= 1
    stateCopy[dataChanged.val()] += 1
    this.savedBarks[dataChanged.key] = dataChanged.val()
    this.setState(stateCopy)
  }
    
  updateListener(barkId) {
    console.log(barkId)
    if (this.last_bark_id != barkId) {
      var root = firebase.database().ref()
      if (this.last_bark_id != null) {
        root.child("bark_reactions").child(this.last_bark_id).off('child_added', this.updateBarkCountsOnAdd)
        root.child("bark_reactions").child(this.last_bark_id).off('child_changed', this.updateBarkCountsOnChange)
        // reset bark counts next
        this.savedReactions = {}
        //reset counds to zero

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

  SetUserID(){
    var ID =  firebase.auth().currentUser.uid
    this.setState({UserID: ID})
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
                :{this.state.cool}
              </div>
              <div>
                <Button><img src = {this.state.DroolEmojiURL} alt ="Drool dog" width = "75" height ="75" onClick ={this.DroolClicked}/></Button>
                :{this.state.drool}
              </div>
              <div>
                <Button><img src = {this.state.HappyEmojiURL} alt = "Happy dog" width = "75" height = "75" onClick = {this.HappyClicked}/></Button>
                :{this.state.happy}
              </div>
              <div>
                <Button><img src = {this.state.LoveEmojiURL} alt = "Love dog" width = "75" height = "75" onClick = {this.LoveClicked}/></Button>
                :{this.state.love}
              </div>
              <div>
                <Button><img src = {this.state.NormalEmojiURL} alt = "Normal dog" width = "75" height = "75" onClick ={this.NormalClicked}/></Button>
                :{this.state.normal}
              </div>
              <div>
                <Button><img src = {this.state.SadEmojiURL} alt = "Sad dog" width = "75" height = "75" onClick = {this.SadClicked}/></Button>
                :{this.state.sad}
            </div>                        
            </div>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
export default ViewBark;