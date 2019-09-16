import React from 'react';
import {shallow, mount} from 'enzyme';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {API_BASE_URL} from '../config';


import {Search} from './Search';
import { doesNotReject } from 'assert';

describe('<Search/>', ()=>{
    it('Renders w/o crashing', ()=> {
        shallow(<Search/>);
    });

    it('Fires the onChange function when text is entered in the input, which sets new state values based on the inputs value', ()=>{
        const wrapper = mount(<Search/>);
        const onChangeSpy = jest.spyOn(wrapper.instance(), "onChange");
        wrapper.find('input[type="text"]').simulate('change', {target: {value: 'Spider-Man'}});
        wrapper.update();
        expect(onChangeSpy).toHaveBeenCalled();
        expect(wrapper.state().value).toEqual('Spider-Man');
        expect(wrapper.state().suggestions).toEqual([]);
    });

    it('does the above, and then also fires "handleTypingChange"', ()=>{
        const wrapper = mount(<Search/>);
        const handleTypingChangeSpy = jest.spyOn(wrapper.instance(), "handleTypingChange");
        wrapper.find('input[type="text"]').simulate('change', {target: {value: 'Spider-Man'}});
        wrapper.update();
        expect(handleTypingChangeSpy).toHaveBeenCalled();
    });

    it('makes a POST request to our API so that the Marvel API can be hit', ()=> {
        const wrapper = mount(<Search />);
        const doCharacterSearchSpy = jest.spyOn(wrapper.instance(), "doCharacterSearch");
        const putSelectionsInStateSuggestions = jest.mock();
        const oSpy = jest.spyOn(wrapper.instance(), "putSelectionsInStateSuggestions");
        wrapper.find('input[type="text"]').simulate('change', {target: {value: 'Spider-Man'}});
        wrapper.update();
       
 

        const data = [{id: 1009610, name: "Spider-Man", description: "Bitten by a radioactive spider, high school studen…pidey has vowed to use his powers to help people.", modified: "2019-02-06T18:06:19-0500", thumbnail: {extension: "jpg", path:"lala.com"}}, 
        {id: 1011054, name: "Spider-Man (1602)", description: "", modified: "2014-03-05T13:47:38-0500", thumbnail: {extension: "jpg", path:"lala.com"}},
        {id: 1014873, name: "Spider-Man (2099)", description: "", modified: "2013-08-15T14:16:16-0400", thumbnail: {extension: "jpg", path:"lala.com"}},
        {id: 1016452, name: "Spider-Man (Ai Apaec)", description: "", modified: "2012-08-06T16:22:54-0400", thumbnail: {extension: "jpg", path:"lala.com"}},
        {id: 1014858, name: "Spider-Man (Ben Reilly)", description: "", modified: "2014-03-05T13:48:42-0500", thumbnail: {extension: "jpg", path:"lala.com"}}
        ];

        var mock = new MockAdapter(axios); 
        mock.onPost(`${API_BASE_URL}/api/characters/search`, { 
            query: wrapper.state().value, 
        }).reply(200, data);
       doCharacterSearchSpy('Spider-Man');
       oSpy(data); 
       wrapper.update();
        expect(doCharacterSearchSpy).toHaveBeenCalledWith('Spider-Man');
        expect(oSpy).toHaveBeenCalledWith(data);
        
        //TODO: Figure this out!
    });

    it('fills up the states suggestion space with results', ()=> {
        const wrapper = mount(<Search/>);
        const data = [{id: 1009610, name: "Spider-Man", description: "Bitten by a radioactive spider, high school studen…pidey has vowed to use his powers to help people.", modified: "2019-02-06T18:06:19-0500", thumbnail: {extension: "jpg", path:"lala.com"}}, 
        {id: 1011054, name: "Spider-Man (1602)", description: "", modified: "2014-03-05T13:47:38-0500", thumbnail: {extension: "jpg", path:"lala.com"}},
        {id: 1014873, name: "Spider-Man (2099)", description: "", modified: "2013-08-15T14:16:16-0400", thumbnail: {extension: "jpg", path:"lala.com"}},
        {id: 1016452, name: "Spider-Man (Ai Apaec)", description: "", modified: "2012-08-06T16:22:54-0400", thumbnail: {extension: "jpg", path:"lala.com"}},
        {id: 1014858, name: "Spider-Man (Ben Reilly)", description: "", modified: "2014-03-05T13:48:42-0500", thumbnail: {extension: "jpg", path:"lala.com"}}
        ];
        const oSpy = jest.spyOn(wrapper.instance(), "putSelectionsInStateSuggestions");
        wrapper.update();
        oSpy(data);
        expect(wrapper.state().suggestions).toEqual(data);
    })


    
});