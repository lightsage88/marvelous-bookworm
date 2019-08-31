import React from 'react';
import {shallow, mount} from 'enzyme';

import Account from './Account';

describe('<Account/>', ()=>{
    it('Renders w/o crashing', ()=> {
        shallow(<Account/>);
    });

    
});