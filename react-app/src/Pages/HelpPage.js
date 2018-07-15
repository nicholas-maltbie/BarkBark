import React from 'react';

const HelpPageScreenStyle ={
    height: '90%',
    width: '10%'
}

class HelpPage extends React.Component {
    render(){
        return(
            <div className="Page" style={HelpPageScreenStyle}>
                <h3> This page will give detailed instructions on how to naviagte through the application Bark Bark. </h3>
				<p> The first step is logging into the account, to ensure that your previous activities are stored on the application you need to sign in. To sign in you can use one of the 
				various options available on our home page- Google email, Facebook, and other means. Your information will only be used to store your account, to read more about this you can 
				read our terms and conditions page. </p> 
				<p> Once logged in you will land on the home page or our Bark Map where you can see the nearby barks and activities. You can also create barks and react to various
				barks. To make the most of our application you will be prompted to create a dog avatar that will be a part of this journey with you and you will always have a virtual 
				dog keeping you company </p> 
				
				<h3> Map Page </h3> 
				<p> This is the landing page and the user can use this page to view barks nearby, create new barks or react to existing barks. The bark button is on the bottom right of the screen
					the user can use this button to create a new bark. The newly created bark can now be viewed by other Bark Bark users and they can react to them with different emojis. </p>
					
				<p> A bar shows up on the left of the screen with popular nearby barks to inform you about the latest events near you and popular emojis to react to those events. Any of these
					can be used by a single selection. </p>
				
				<h3> Profile Page </h3>
				<p> The profile page stores all the information about the user and their history on Bark Bark. </p>

				<p> The profile will contain the user's dog avatar, the Username, option to edit user settings, edit the dog avatar and store a log of the five most recent barks. </p>
				
				<p> To edit the dog avatar, select the edit button on top of the dog avatar image. This will open up the dog edit page. The user will have an option to select attributes 
					like the breed, background color, fur color and eye color along with various sets of emotions. After selecting all the various options, the user can save the dog avatar. 
					The new dog will replace the old dog avatar and the changes will be visible on the Profile Page. </p> 
					
				
            </div>
        )
    }
}

export default HelpPage;