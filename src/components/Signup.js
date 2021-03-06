import React from 'react';
import { Form, Button, FormGroup, Label, Input, FormFeedback, FormText, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {API_BASE_URL} from '../config';
import axios from 'axios';
import {connect} from 'react-redux';
import {attemptLogIn} from '../actions/index.js';

export class Signup extends React.Component  {
    state ={
        validate: {},
        message: ''
    };
    
    
    onChange = (e, type) => {

        this.setState({
            [e.target.id]: e.target.value
        }, () => {
            if(this.state.PasswordInput !== undefined || '' && this.state.PasswordConfirm !== undefined || '') {
            this.validatePassword(this.state)
            }
        });
        if(type==="usernameCheck"){
            let value = e.target.value;
            if(value !== '') {
            axios({
                url: `${API_BASE_URL}/api/users/usernameCheck`,
                method: "POST",
                headers: {
                    accept: 'application/json'
                },
                data: {
                    usernameCandidate: value
                }
            })
            .then(response => {
                if(response.data.code == 422) {
                    this.setState({
                        validate: {
                            usernameState: 'unavailable'
                        }
                    })

             
                } else {
                    this.setState({
                        validate: {
                            usernameState: 'available'
                        }
                    })
                }
            })
            .catch(err => {
                console.error(err);
            })

        } else {
            this.setState({
                validate: {
                    usernameState: ''
                }
            })
        }



            //do an action that checks the DB for any Users with the given username.
            //if one matches, send a response back and we can filter in a kind of validation message
        }
    }

    validatePassword = (state) => {
        let {validate} = this.state;

        if(state.PasswordInput.length < 10) {
            validate.passwordState = 'has-danger';
            validate.buttonActive = false;
        } else if(state.PasswordConfirm && state.PasswordConfirm.length < 10 ){
            validate.passwordState = 'has-danger';
            validate.buttonActive = false;
        
        } else if(state.PasswordInput == state.PasswordConfirm) {
            validate.passwordState = 'has-success';
            validate.buttonActive = true;
        } else  {
            validate.passwordState = 'has-danger';
            validate.buttonActive = false;
        }

        this.setState({validate});
    }

    createAccount = () => {
        let problem;
        let currentState = this.state;
        const requiredFields = ['firstNameInput', 'lastNameInput', 'usernameInput', 'PasswordInput', 'PasswordConfirm'];

        const missingField = requiredFields.find(field => !(field in currentState) || (field in currentState) == undefined);

        Object.entries(requiredFields in currentState).forEach(array => {
            if(array[1] == '') {
                problem = true;
            }
        })


        if(missingField || problem == true) {
            return;
        } else {
            axios({
                url: `${API_BASE_URL}/api/users/signup`,
                method: 'POST',
                headers: {
                    accept: 'application/json'
                },
                data: {
                    username: currentState.usernameInput,
                    password: currentState.PasswordConfirm,
                    firstName: currentState.firstNameInput,
                    lastName: currentState.lastNameInput
                }
            })
            .then(response => {
                if(response.status == 201) {
                    this.props.dispatch(attemptLogIn(currentState.usernameInput, currentState.PasswordConfirm));
                    window.path = '/search';
                }
            })
            .then(()=>{
                if(localStorage.getItem('authToken')) {
                    window.location.pathname = '/search'
                }   
            })
            .catch(err =>{
                console.error(err);
            });
        }


    }

    
    render() {
        


        //TODO: Add validation for length of passsword and no trailing spaces, etc.
        //TODO: In validatoin scheme also make sure that the user doesn't type something and then backspace
        //disable the button until optimal considitons are met.
       


    return (
        <div id="signupDiv">
            <h1 id="signupH1">Sign Up</h1>
          <Form id="signupForm">
            <FormGroup>
                <Label for="firstNameInput">FIRST NAME</Label>
                <Input onChange={(e)=>{this.onChange(e)}} id="firstNameInput" placeholder="Peter"/>
            </FormGroup>

            <FormGroup>
                <Label for="lastNameInput">LAST NAME</Label>
                <Input onChange={(e)=>{this.onChange(e)}} id="lastNameInput" placeholder="Parker"/>
            </FormGroup>

            <FormGroup>
                <Label for="usernameInput">USERNAME</Label>
                <Input valid={this.state.validate.usernameState === 'available'} invalid={this.state.validate.usernameState === 'unavailable'} onChange={(e)=>{this.onChange(e, 'usernameCheck')}} id="usernameInput" placeholder="totallyNotSpiderMan2019"/>
                <FormFeedback invalid>Someone else already has this username.</FormFeedback>
                <FormFeedback valid>Cool name, it suits you!</FormFeedback>
            </FormGroup>

            <FormGroup>
                <Label for="PasswordInput">PASSWORD</Label>
                <Input valid={this.state.validate.passwordState === 'has-success'} invalid={this.state.validate.passwordState === 'has-danger'} onChange={(e)=>{this.onChange(e)}}id="PasswordInput" type="password"/>
                <FormFeedback invalid>Your password must be at least 10 characters long!</FormFeedback>
                
            </FormGroup>

            <FormGroup>
                <Label for="PasswordConfirm">PASSWORD AGAIN</Label>
                <Input valid={this.state.validate.passwordState === 'has-success'} invalid={this.state.validate.passwordState === 'has-danger'} onChange={(e)=>{this.onChange(e)}} id="PasswordConfirm" type="password"/>
                <FormFeedback invalid>Your passwords must match!</FormFeedback>

            </FormGroup>
            {
                this.state.PasswordConfirm == undefined || '' || 
                this.state.PasswordInput == undefined || '' ||
                this.state.firstNameInput == undefined || '' ||
                this.state.lastNameInput == undefined || '' ||
                this.state.usernameInput == undefined || '' ||
                this.state.validate.passwordState === 'has-danger' ||
                this.state.validate.usernameState === 'unavailable'
                ?
                <Button id="createAccountButton" disabled color="danger">FILL FORM!</Button> 
                :
                <Button id="createAccountButton" color="info" onClick={()=>{this.createAccount()}}>Create Account</Button> 


            }


          </Form>
        </div>
    )
    }
}

export default connect()(Signup);