import React from 'react';
import {shallow, mount} from 'enzyme';

import {Collection} from './Collection';
import { exportAllDeclaration } from '@babel/types';

let characters = [
    {
        name: "Spider-Man",
        image: {
            data: "jsdfsdf"
        },

        events: [
            {
                title: "Infinity War",
                thumbnail: {
                    path: "xxx",
                    extension: "jpg"
                },
                description: "Sony fucks things up"
            }
        ]
    }
]

let dispatch = jest.fn();

describe('<Collection/>', ()=>{
    it('Renders w/o crashing', ()=> {
        shallow(<Collection characters={characters} dispatch={dispatch}/>);
    });

    // it('passes in the reduxstate/props accurately', ()=>{
    //     const wrapper = shallow(<Collection characters={characters} dispatch={dispatch}/>);
    //     console.log(wrapper);
    //     wrapper.update();
    //     expect(wrapper.find('#0-cardHeader').text()).toEqual('shit');
    // })

    it('fires method to initiate deletion of character when you press the X button', () => {
        const wrapper = shallow(<Collection characters={characters} dispatch={dispatch}/>);
        const mockedEvent = {preventDefault: jest.fn()}
        const onClickSpy = jest.spyOn(wrapper.instance(), "deleteCharacterFromCollection");
        wrapper.find('.characterButton').simulate('click', mockedEvent);
        expect(onClickSpy).toHaveBeenCalled();
    })  
});