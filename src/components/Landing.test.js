import React from 'react';
import {shallow, mount} from 'enzyme';

import {Landing} from './Landing';

describe('<Landing/>', ()=>{
    it('Renders w/o crashing', ()=> {
        shallow(<Landing/>);
    });

    
});