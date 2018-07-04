import React from 'react';
import TextField from '@material-ui/core/TextField';
import FlatButton from 'material-ui/FlatButton';


const ContactUsStyle = {
    height:'100%',
    width:'50%',
    display:'flex',
    flexDirection:'column',
    alignItems:'center'
}

class ContactUsPage extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            name: "",
            email: "",
            message: ""
        }
    }

    handleChange(event, label){
        this.setState({[label]: event.target.value});
    }
    render(){
        return(
            <div className="Page">
                <div style={ContactUsStyle}>
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
                    <TextField required multiline rows="5"
                        id="MessageContactForm"
                        label="Message"
                        className="ContactFormInput"
                        value={this.state.message}
                        onChange={(e) => this.handleChange(e, 'message')}
                        margin="normal"
                    />
                    <FlatButton/>
                </div>
            </div>
        )
    }
}

export default ContactUsPage;