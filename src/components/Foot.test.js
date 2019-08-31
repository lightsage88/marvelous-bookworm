import React from 'react';
import {shallow, mount} from 'enzyme';

import Foot from './Foot';

describe('<Foot/>', ()=>{
    it('Renders w/o crashing', ()=> {
        shallow(<Foot/>);
    });

    
});