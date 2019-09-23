import React from 'react';
import { Form, Button, FormGroup, Label, Input, FormFeedback, FormText, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {API_BASE_URL} from '../config';
import axios from 'axios';

class Signup extends React.Component  {
    state ={
        validate: {}
    };
    
    
    onChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        }, () => {
            if(this.state.PasswordInput !== undefined || '' && this.state.PasswordConfirm !== undefined || '') {
            this.validatePassword(this.state)
            }
        });
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

        Object.entries(currentState).forEach(array => {
            if(array[1] == '') {
                problem = true;
            }
        })


        if(missingField || problem == true) {
            console.log('thats fucked up');
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
                console.log(response);
                if(response.status == 201) {
                    console.log('are you reeeddi for wurrrshiiiip?');
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
            <h1>This is the signup page</h1>
          <Form>
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
                <Input onChange={(e)=>{this.onChange(e)}} id="usernameInput" placeholder="totallyNotSpiderMan2019"/>
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

            <Button id="createAccountButton" onClick={()=>{this.createAccount()}}>Create Account</Button> 

          </Form>
        </div>
    )
    }
}

export default Signup;