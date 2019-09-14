import React from 'react';
import {shallow, mount} from 'enzyme';
import ModalGear from './ModalGear';

let event = jest.fn();

describe('<ModalGear/>', ()=>{
    it('renders without crashing', ()=>{
        shallow(<ModalGear event={event}/>)
    })
})