import React from 'react';
import {shallow, mount} from 'enzyme';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {Account} from './Account';
import {API_BASE_URL} from '../config';


describe('<Account/>', ()=>{
    it('Renders w/o crashing', ()=> {
        shallow(<Account/>);
    });

    // it('will tell the user if their passwords do not match', () => {
    //     const wrapper = shallow(<Account/>);
    //     const onChangeSpy = jest.spyOn(wrapper.instance(), 'onChange');
    //     wrapper.find('#newPasswordInput2').simulate('change', {target: {value: 'Passworsdfsdfdpassword'}});
    //     wrapper.find('#newPasswordInput1').simulate('change', {target: {value: 'NotOkayDogTryAgain'}});
    //     wrapper.update();
    //     expect(onChangeSpy).toHaveBeenCalled();
    //     // expect(wrapper.find('is-valid'));
    //     expect(wrapper.state().validate.emailState).toEqual('has-danger');
    // })

    it('will validate successfully if the passwords match', () => {
        const wrapper = shallow(<Account/>);
        const onChangeSpy = jest.spyOn(wrapper.instance(), 'onChange');
        const onValidatePassword = jest.spyOn(wrapper.instance(), 'validatePassword');
        wrapper.find('#newPasswordInput2').simulate('change', {target: {value: 'Passwordpassword'}});
        wrapper.find('#newPasswordInput1').simulate('change', {target: {value: 'Passwordpassword'}});
        wrapper.update();
        expect(onChangeSpy).toHaveBeenCalled(); 
        // expect(onValidatePassword).toHaveBeenCalled();
        expect(wrapper.find('is-valid'));
        // expect(wrapper.state().validate.passwordState).toEqual('has-success');
    });

    it('will fire the commenceAccountUpdate method to talk with our backend about updating the password, when the button is pressed', ()=> {
        const wrapper = shallow(<Account/>);
        const onChangeSpy = jest.spyOn(wrapper.instance(), 'onChange');
        const commenceAccountUpdateSpy = jest.spyOn(wrapper.instance(), 'commenceAccountUpdate');
        const onValidatePassword = jest.spyOn(wrapper.instance(), 'validatePassword');
        wrapper.find('#newPasswordInput2').simulate('change', {target: {value: 'Passwordpassword'}});
        wrapper.find('#newPasswordInput1').simulate('change', {target: {value: 'Passwordpassword'}});
        wrapper.update();
        expect(onChangeSpy).toHaveBeenCalled(); 
        // expect(onValidatePassword).toHaveBeenCalled();
        expect(wrapper.find('is-valid'));
        // expect(wrapper.state().validate.passwordState).toEqual('has-success');
        // wrapper.find('#updateAccountButton').simulate('click');
        // expect(commenceAccountUpdateSpy).toHaveBeenCalled();
    });

    // it('will display a message about a non-usable password if the new ones have trailing spaces', ()=>{
    //     var mock = new MockAdapter(axios); 
    //     const data = {
    //         code: 422,
    //         reason: "ValidationError"
    //     }
    //     mock.onPost(`${API_BASE_URL}/api/users/changePassword`, { 
    //         data: {newPW: "password  "}
    //     }).reply(200, data);
    //     const wrapper = shallow(<Account />);
    //     const onChangeSpy = jest.spyOn(wrapper.instance(), 'onChange');
    //     const commenceAccountUpdateSpy = jest.spyOn(wrapper.instance(), 'commenceAccountUpdate');
    //     const showErrorSpy = jest.spyOn(wrapper.instance(), 'showError');
    //     const onValidatePassword = jest.spyOn(wrapper.instance(), 'validatePassword');
    //     wrapper.find('#newPasswordInput2').simulate('change', {target: {value: 'Passwordpassword '}});
    //     wrapper.find('#newPasswordInput1').simulate('change', {target: {value: 'Passwordpassword '}});
    //     wrapper.update();
    //     expect(onChangeSpy).toHaveBeenCalled(); 
    //     expect(onValidatePassword).toHaveBeenCalled();
    //     expect(wrapper.find('is-valid'));
    //     expect(wrapper.state().validate.passwordState).toEqual('has-success');
    //     wrapper.find('#updateAccountButton').simulate('click');
    //     expect(commenceAccountUpdateSpy).toHaveBeenCalled();
    //     wrapper.update();
    //     expect(showErrorSpy).toHaveBeenCalledWith("ValidationError");
    // })

});