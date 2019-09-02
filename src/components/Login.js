import React, {Component} from 'react';
import axios from 'axios';


class  Login extends Component {
    state={
        usernameFieldText: '',
        passwordFieldText: '',
        message: ''
    };

    typingInField = (e, type) => {
        let fieldContent;
        e.preventDefault();
       
        fieldContent = e.target.value;
        if(type == "usernameField") {
            console.log('setting usernameFieldText');
            this.setState(prevState =>({
                usernameFieldText: fieldContent
            }))
        } else if(type == "passwordField") {
            this.setState(prevState =>({
                passwordFieldText: fieldContent
            }))
        }
    }

    clickSubmit = (e) => {
        e.preventDefault();
        console.log('yo');
        axios({
            url: `http://localhost:8000/api/auth/login`,
            method: "POST",
            headers: {
                "accept": 'application/json'
            },
            data: {
               
                    "username": this.state.usernameFieldText,
                    "password": this.state.passwordFieldText
                
            }
        })
        .then(response => {
            console.log('sup bitches');
            console.log(response);
        })
        .catch(err => {
            console.log(err);
            this.setState(prevState => ({
                message: "There was an error of some kind."
            }))
        })
    }

    render () {
        return (
            <React.Fragment>
                <form>
                    <input id="loginUsernameField" type="text" placeholder="Enter your username" onChange={(e)=> this.typingInField(e, 'usernameField')} />
                    <input id="loginPasswordField" type="password" placeholder="Enter your password" onChange={(e)=> this.typingInField(e, 'passwordField')}/>
                    <button id="loginSubmitButton" type="submit" onClick={(e)=> this.clickSubmit(e)}>LOGIN</button>
                </form>
            </React.Fragment>
        )
    }
   
}

export default Login;