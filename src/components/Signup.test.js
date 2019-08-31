import React from 'react';
import {shallow, mount} from 'enzyme';

import Signup from './Signup';

describe('<Signup/>', ()=>{
    it('Renders w/o crashing', ()=> {
        shallow(<Signup/>);
    });

    
});