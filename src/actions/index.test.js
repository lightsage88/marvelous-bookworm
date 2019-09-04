import { exportAllDeclaration } from "@babel/types";
import {shallow, mount} from 'enzyme';
import {attemptLoginSuccess, ATTEMPT_LOGIN_SUCCESS} from '../actions'

describe('attemptLoginSuccess', ()=> {
    it('should return the action', ()=> {
        const data = {username: 'bocho', firstName: 'King', lastName: 'Bocho'};
        const action = attemptLoginSuccess(data);
        expect(action.type).toEqual(ATTEMPT_LOGIN_SUCCESS);
        expect(action.data).toEqual(data);
    });
});