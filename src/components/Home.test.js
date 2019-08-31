import React from 'react';
import {shallow, mount} from 'enzyme';

import Home from './Home';

describe('<Home/>', ()=>{
    it('Renders w/o crashing', ()=> {
        shallow(<Home/>);
    });

    it('Fires the onChange function when text is entered in the input', ()=>{
        const wrapper = mount(<Home/>);
        const onChangeSpy = jest.spyOn(wrapper.instance(), "onChange");

        wrapper.find('input[type="text"]').simulate('change', {target: {value: 'Spider-Man'}});
        wrapper.update();
        expect(onChangeSpy).toHaveBeenCalled();
        expect(wrapper.state().value).toEqual('Spider-Man');
        expect(wrapper.state().suggestions).toEqual([]);
    })

    
});