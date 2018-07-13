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
				
            </div>
        )
    }
}

export default HelpPage;