import React, {Component} from 'react';
import {connect} from 'react-redux';
import Loader from './Loader';
import { Form, Button, FormGroup, Label, Input, FormFeedback, FormText, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import axios from 'axios';

import {attemptLogIn, attemptLoginSuccess} from '../actions/index.js';


export class Login extends Component {
    state={
        usernameFieldText: '',
        passwordFieldText: '',
        message: '',
        loading: false
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
        this.setState({
            loading: true,
            loadingMessage: 'Logging you in...'
        });
        setTimeout(()=>{
            if(localStorage.getItem('authToken')) {
            console.log('bota entri');
            this.setState({
                loading: false,
                loadingMessage: ''
            });
            window.location.pathname = '/search'
        }  else {
            this.setState({
                loadingMessage: "There was an error with your login!"
            });
            setTimeout(()=>{
               this.setState({
                loading: false,
                loadingMessage: ''
               }) 
            }, 1250);
        } 
    
    }, 3000);
        
    }

    render () {
        return (
            
            <div id="loginDiv">
            {
        this.state.loading == true ? 
        <Loader loading={this.state.loading} loadingMessage={this.state.loadingMessage}/>
        : 
        ''
      }
            <h2 id="loginH2">LOGIN</h2>

            <Form id="loginForm">
            <FormGroup>
                <Label for="loginUsernameField">USERNAME</Label>
                <Input onChange={(e)=> this.typingInField(e, 'usernameField')} id="loginUsernameField" placeholder="Enter your username"/>
            </FormGroup>

            <FormGroup>
                <Label for="loginPasswordField">PASSWORD</Label>
                <Input type="password" onChange={(e)=> this.typingInField(e, 'passwordField')} id="loginPasswordField" placeholder="Enter your password"/>
            </FormGroup> 
            {
                this.state.usernameFieldText == '' || this.state.passwordFieldText == '' ? 
                <Button id="loginSubmitButton" color="danger" disabled>FILL FORM</Button>
                :
                <Button id="loginSubmitButton" color="info" onClick={(e)=> this.clickSubmit(e)}>LOGIN</Button> 

            }


               
            </Form>
            <section id="loginSampleSection">
                    <h2>Sample Login</h2>
                    <strong>USERNAME:</strong>
                    <p>test</p>
                    <strong>PASSWORD:</strong>
                    <p>passwordpassword</p>
                </section>
            </div>
               
        )
    }
   
}

const mapStateToProps = state => ({
    user:state.user.username || null,
    loggedIn: state.user.loggedIn || null,
    authToken: state.user.authToken
});

export default connect(mapStateToProps)(Login);