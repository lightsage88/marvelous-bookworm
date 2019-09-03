import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

import {attemptLogIn, attemptLoginSuccess} from '../actions/index.js';


class Login extends Component {
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
       this.props.dispatch(attemptLogIn());
        // axios({
        //     url: `http://localhost:8000/api/auth/login`,
        //     method: "POST",
        //     headers: {
        //         "accept": 'application/json'
        //     },
        //     data: {
               
        //             "username": this.state.usernameFieldText,
        //             "password": this.state.passwordFieldText
                
        //     }
        // })
        // .then(response => {
        //     console.log('sup bitches');
        //     console.log(response);
        //     //Do something to update ReduxState
        // })
        // .catch(err => {
        //     console.log(err);
        //     this.setState(prevState => ({
        //         message: "There was an error of some kind."
        //     }))
        // })
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
    user:state.username
});

export default connect(mapStateToProps)(Login);