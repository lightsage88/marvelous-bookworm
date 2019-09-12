import { exportAllDeclaration } from "@babel/types";
import {shallow, mount} from 'enzyme';
import {attemptLoginSuccess, 
    ATTEMPT_LOGIN_SUCCESS, 
    attemptLogout, 
    ATTEMPT_LOGOUT,
    maintainState,
    MAINTAIN_STATE,
    updateState,
    UPDATE_STATE,
    refreshState,
    REFRESH_STATE} from '../actions'

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

describe('updateState', () => {
    it('should return the action', () => {
        const newStateValues = {
            username: 'admin', firstName: 'King', lastName: 'Bocho'
        }
        const action = updateState(newStateValues);
        expect(action.type).toEqual(UPDATE_STATE);
        expect(action.newStateValues).toEqual(newStateValues);
    })
});

describe('maintainState', () => {
    it('should return the action', () => {
        const action = maintainState();
        expect(action.type).toEqual(MAINTAIN_STATE);
    });
});

describe('refreshState', () => {
    it('should return the action', () => {
        const data = {}
        const action = refreshState(data);
        expect(action.type).toEqual(REFRESH_STATE);
    })
})

