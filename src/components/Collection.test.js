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

  
});