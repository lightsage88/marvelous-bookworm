import React from 'react';
import {connect} from 'react-redux';
import { Form, Button, FormGroup, Label, Input, FormFeedback, FormText } from 'reactstrap';




export class Account extends React.Component {

    state = {
        
        validate: {},
        ...this.formDefaults
    }

    formDefaults = {
        email: { value: '', isValid: true, message: '' },
        password: { value:'', isValid: true, message: '' },
        confirmPassword: { value: '', isValid: true, message: '' }
      }

    onChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        }, () =>{
            this.validatePassword(this.state)
        })
    }

    validatePassword = (state) => {
        console.log(state);
        let {validate} = this.state;

       
         
           if(state.newPasswordInput1 == state.newPasswordInput2){
               console.log('lopo');
               validate.emailState = 'has-success';
            } else {
                validate.emailState = 'has-danger';
            }

        
        this.setState({validate});

    }

    


    render() { 
        
    return (
        <div>
            <h1>Account Page</h1>
            <Form>
                <FormGroup>
                    <Label for="firstNameInput">FIRST NAME</Label>
                    <Input id="firstNameInput" placeholder={this.props.firstName}/>
                    <FormText>You may change your first name, if you wish.</FormText>
                </FormGroup>

                <FormGroup>
                    <Label for="lastNameInput">LAST NAME</Label>
                    <Input id="lastNameInput" placeholder={this.props.lastName}/>
                    <FormText>You can also change your last name, be an agent of mystery. Why not?</FormText>
                </FormGroup>

                <FormGroup>
                    <Label for="usernameInput">USERNAME</Label>
                    <Input id="usernameInput" placeholder={this.props.username}/>
                    <FormText>Assuming no one else has taken the new username you'd want, you can change that too.</FormText>
                </FormGroup>

                <FormGroup>
                    <Label for="newPasswordInput1">NEW PASSWORD</Label>
                    <Input  onChange={(e)=>{this.onChange(e)}}id="newPasswordInput1" type="password"/>
                </FormGroup>

                <FormGroup>
                    <Label for="newPasswordInput2">REPEAT THAT ONE MORE TIME</Label>
                    <Input valid={ this.state.validate.emailState === 'has-success' } invalid={ this.state.validate.emailState === 'has-danger' } onChange={(e)=>{this.onChange(e)}} id="newPasswordInput2" type="password"/>
                    <FormFeedback invalid>
                        Slow your roll, these passwords do not match!
                    </FormFeedback>
                    <FormFeedback valid>
                        They both match! Go on ahead with your bad self.
                    </FormFeedback>
                </FormGroup>

                <Button>Update Account</Button>


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