import React from 'react';
import {shallow, mount} from 'enzyme';

// import {Collection} from './Collection';
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
                description: "Sony messes things up"
            }
        ]
    }
]

let dispatch = jest.fn();

describe('<Collection/>', ()=>{
    // it('Renders w/o crashing', ()=> {
    //     mount(<Collection characters={characters} dispatch={dispatch}/>);
    // });
    it('adds', ()=>{
        expect(1).toEqual(1);
    })

    // it('passes in the reduxstate/props accurately', ()=>{
    //     const wrapper = shallow(<Collection characters={characters} dispatch={dispatch}/>);
    //     console.log(wrapper);
    //     wrapper.update();
    //     expect(wrapper.find('#0-cardHeader').text()).toEqual('something');
    // })

    // it('fires method to initiate deletion of character when you press the X button', () => {
    //     const wrapper = mount(<Collection characters={characters} dispatch={dispatch}/>);
    //     const mockedEvent = {preventDefault: jest.fn()}
    //     const onClickSpy = jest.spyOn(wrapper.instance(), "deleteCharacterFromCollection");
    //     wrapper.find('.characterButton').simulate('click', mockedEvent);
    //     expect(onClickSpy).toHaveBeenCalled();
    // })  
});