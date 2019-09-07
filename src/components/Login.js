import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

import {attemptLogIn, attemptLoginSuccess} from '../actions/index.js';


export class Login extends Component {
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
        let usernameChars, passwordChars;
        usernameChars = this.state.usernameFieldText;
        passwordChars = this.state.passwordFieldText;

        e.preventDefault();
        console.log('yo');
        this.props.dispatch(attemptLogIn(usernameChars, passwordChars));
        
    }

    render () {
        console.log(this.props);
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

const mapStateToProps = state => ({
    user:state.user.username || null,
    loggedIn: state.user.loggedIn || null,
    authToken: state.user.authToken
});

export default connect(mapStateToProps)(Login);