import React from 'react';
import {shallow, mount} from 'enzyme';

import About from './About';

describe('<About/>', ()=>{
    it('Renders w/o crashing', ()=> {
        shallow(<About/>);
    });

    
});