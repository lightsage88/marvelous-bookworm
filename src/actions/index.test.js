import { exportAllDeclaration } from "@babel/types";
import {shallow, mount} from 'enzyme';
import {attemptLoginSuccess, ATTEMPT_LOGIN_SUCCESS, attemptLogout, ATTEMPT_LOGOUT} from '../actions'

describe('attemptLoginSuccess', ()=> {
    it('should return the action', ()=> {
        const data = {username: 'bocho', firstName: 'King', lastName: 'Bocho'};
        const action = attemptLoginSuccess(data);
        expect(action.type).toEqual(ATTEMPT_LOGIN_SUCCESS);
        expect(action.data).toEqual(data);
    });
});

describe('attemptLogout', ()=>{
    it('should return the action', ()=>{
        const action = attemptLogout();
        expect(action.type).toEqual(ATTEMPT_LOGOUT);
    });
})