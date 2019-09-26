import React from 'react';
import {shallow, mount} from 'enzyme';
import {Provider} from 'react-redux';
import store from '../configureStore';

import {Login} from './Login';

const dispatchMock = jest.fn();


describe('<Login/>', ()=>{
    it('Renders w/o crashing', ()=> {
        shallow(<Login dispatch={dispatchMock}/>);
    });

    it('fires the typingInField method when someone types in either the password or username field', ()=> {
        const wrapper = mount(<Login dispatch={dispatchMock}/>);
        const typingInFieldSpy = jest.spyOn(wrapper.instance(), "typingInField");
        wrapper.find('input[type="text"]').simulate('change', {target: {value: 'administrator'}});
        wrapper.update();
        expect(typingInFieldSpy).toHaveBeenCalled();
        expect(wrapper.state().usernameFieldText).toEqual('administrator');
        wrapper.find('input[type="password"]').simulate('change', {target: {value: "password1234"}});
        wrapper.update();
        // expect(typingInFieldSpy).not.toHaveBeenCalled();
        expect(wrapper.state().passwordFieldText).toEqual("password1234");
    });

    it('fires the clickSubmit method when someone presses the submit button', ()=>{
        const wrapper = mount(<Login dispatch={dispatchMock}/>);
        const onClickSpy = jest.spyOn(wrapper.instance(), "clickSubmit");
        wrapper.find('button#loginSubmitButton').simulate('click');
        expect(onClickSpy).not.toHaveBeenCalled();
    });

    
});