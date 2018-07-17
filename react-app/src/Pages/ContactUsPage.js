import React from 'react';
import TextField from '@material-ui/core/TextField';
import FlatButton from 'material-ui/FlatButton';



class ContactUsPage extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            name: "",
            email: "",
            message: "",
        }
    }

    handleChange(event, label){
        this.setState({[label]: event.target.value});
    }
    render(){
        return(
			<form action = "mailto:meghnagupta.678@gmail.com" method = "post" enctype = "text/plain">
				<div className="Page" id = "ContactPageScreenStyle">  
				<p>
				<img src="/static/media/logo.12a6f28b.png" className="Contact-logo" alt="logo"/>	
				<img src="/static/media/logo.12a6f28b.png" className="Contact-logo" alt="logo"/>
				</p>
				<div className = "Contact-Title" >
				<h2> Contact Us </h2>
				</div>
                    <TextField required
                        id="NameContactForm"
                        label="Name"
                        className="ContactFormInput"
                        value={this.state.name}
                        onChange={(e) => this.handleChange(e, 'name')}
                        margin="normal"
                    />
					
                    <TextField required
                        id="EmailContactForm"
                        label="Email"
                        className="ContactFormInput"
                        value={this.state.email}
                        onChange={(e) => this.handleChange(e, 'email')}
                        margin="normal"
                    />
                    <TextField required 
                        id="MessageContactForm"
                        label=" Your Message"
                        className="ContactFormInput"
                        value={this.state.message}
                        onChange={(e) => this.handleChange(e, 'message')}
                        margin= "normal"
                    />
					<div class = "Contact-Button">
						<input type="submit" value = "Send Message" />
					</div>
				</div>
			</form>  
        )
    }
}

export default ContactUsPage;