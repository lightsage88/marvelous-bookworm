import React from 'react';
import {shallow, mount} from 'enzyme';

import Login from './Login';

describe('<Login/>', ()=>{
    it('Renders w/o crashing', ()=> {
        shallow(<Login/>);
    });

    it('fires the typingInField method when someone types in either the password or username field', ()=> {
        const wrapper = mount(<Login/>);
        const typingInFieldSpy = jest.spyOn(wrapper.instance(), "typingInField");
        wrapper.find('input[type="text"]').simulate('change', {target: {value: 'administrator'}});
        wrapper.update();
        expect(typingInFieldSpy).toHaveBeenCalled();
        expect(wrapper.state().usernameFieldText).toEqual('administrator');
        wrapper.find('input[type="password"]').simulate('change', {target: {value: "password1234"}});
        wrapper.update();
        expect(typingInFieldSpy).toHaveBeenCalled();
        expect(wrapper.state().passwordFieldText).toEqual("password1234");
    });

    it('fires the clickSubmit method when someone presses the submit button', ()=>{
        const wrapper = mount(<Login/>);
        const onClickSpy = jest.spyOn(wrapper.instance(), "clickSubmit");
        wrapper.find('button[type="submit"]').simulate('click');
        wrapper.update();
        expect(onClickSpy).toHaveBeenCalled();
    });

    
});