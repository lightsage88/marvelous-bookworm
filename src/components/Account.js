import React from 'react';
import {connect} from 'react-redux';
import { Form, Button, FormGroup, Label, Input, FormFeedback, FormText, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';
import {API_BASE_URL} from '../config';





export class Account extends React.Component {

    state = {
        errorMessage: '',
        validate: {}
    }

    

    onChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        }, () => {
            if(this.state.newPasswordInput1 !== undefined || '' && this.state.newPasswordInput2 !== undefined || '') {
            this.validatePassword(this.state)
            }
        })
    }

    validatePassword = (state) => {
        let {validate} = this.state;

       
         
           if(state.newPasswordInput1 == state.newPasswordInput2){
               validate.passwordState = 'has-success';
               validate.buttonActive = true;
            } else {
                validate.passwordState = 'has-danger';
                validate.buttonActive = false;
            }

        
        this.setState({validate});

    }

    displayError = () => {

    }

    commenceAccountUpdate = (oldPW, newPW) => {
        //does a call to the backend which takes the pW here
        //and then tests it in the backend against the pW hash for the user in the DB.
        

        //If it is successful, then the new password will become the one for the account.
        
        axios({
            url: `${API_BASE_URL}/api/users/changePassword`,
            method: "POST",
            headers: {
                accept: "application/json"
            },
            data: {
                oldPW,
                newPW,
                username: this.props.username
            }
        })
        .then(response => {
            if(response.data.code == 422 && response.data.reason == "ValidationError") {
                this.showError('ValidationError')
            }
        })
        .catch(err=>{
          
            console.error(err);
        })
    }

    showError = (string) => {
        if(string === "ValidationError") {
            this.setState({
                errorMessage: "Your passwords must not have blank spaces trailing at either the start or end!"
            });
            setTimeout(()=>{
                this.setState({
                    errorMessage: ''
                })
                //maybe do an animated transition out?
            }, 3500);
        }
    }
   
    


    render() { 
      
    return (
        <div>
            {this.props.renderRedirect()}

            <h2 id="accountH2">Account</h2>
            {
                this.state.errorMessage === '' ? null : <h1>{this.state.errorMessage}</h1>
            }
            <Form id="accountForm">
                <FormGroup className="accountFormGroup">
                    <Label for="firstNameInput">FIRST NAME</Label>
                    <Input id="firstNameInput" placeholder={this.props.firstName}/>
                    <FormText>You may change your first name, if you wish.</FormText>
                </FormGroup>

                <FormGroup className="accountFormGroup">
                    <Label for="lastNameInput">LAST NAME</Label>
                    <Input id="lastNameInput" placeholder={this.props.lastName}/>
                    <FormText>You can also change your last name, be an agent of mystery...or an agent of S.H.I.E.L.D. Why not?</FormText>
                </FormGroup>

                <FormGroup className="accountFormGroup">
                    <Label for="usernameInput">USERNAME</Label>
                    <Input id="usernameInput" placeholder={this.props.username}/>
                    <FormText>Assuming no one else has taken the new username you'd want, you can change that too.</FormText>
                </FormGroup>

                <FormGroup className="accountFormGroup">
                    <Label for="oldPasswordInput">CURRENT PASSWORD</Label>
                    <Input  onChange={(e)=>{this.onChange(e)}}id="oldPasswordInput" type="password"/>
                    <FormText>We can't just have you running up in here changing folks' accounts willy nilly. Jeez!!</FormText>
                </FormGroup>

                <FormGroup className="accountFormGroup">
                    <Label for="newPasswordInput1">NEW PASSWORD</Label>
                    <Input  onChange={(e)=>{this.onChange(e)}}id="newPasswordInput1" type="password"/>
                </FormGroup>

                <FormGroup className="accountFormGroup">
                    <Label for="newPasswordInput2">REPEAT THAT ONE MORE TIME</Label>
                    <Input valid={ this.state.validate.passwordState === 'has-success' } invalid={ this.state.validate.passwordState === 'has-danger' } onChange={(e)=>{this.onChange(e)}} id="newPasswordInput2" type="password"/>
                    <FormFeedback invalid>
                        Slow your roll, these passwords do not match!
                    </FormFeedback>
                    <FormFeedback valid>
                        They both match! Go on ahead with your bad self.
                    </FormFeedback>
                </FormGroup>
                {
                    this.state.validate.buttonActive == true && this.state.newPasswordInput1 !== '' ? 
                    <Button id="updateAccountButton" onClick={()=>{this.commenceAccountUpdate(this.state.oldPasswordInput, this.state.newPasswordInput2)}}>Update Account</Button> 
                    : 
                    <Button disabled>Can't Touch This, nah na-na-na...</Button>
                }

                {/* <Button onClick={()=>{this.commenceAccountUpdate()}}>Update Account</Button> */}


            </Form>


            

        </div>
    )
    }
}

const mapStateToProps = (state) => ({
    username: state.user.username,
    firstName: state.user.firstName,
    lastName: state.user.lastName
})

export default connect(mapStateToProps)(Account);