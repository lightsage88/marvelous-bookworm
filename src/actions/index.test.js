import { exportAllDeclaration } from "@babel/types";
import {shallow, mount} from 'enzyme';

import {
    attemptLogIn,
    attemptLoginSuccess, 
    ATTEMPT_LOGIN_SUCCESS, 
    attemptLogout, 
    ATTEMPT_LOGOUT,
    deleteCharacter,
    DELETE_CHARACTER,
    enhanceEventArray,
    ENHANCE_EVENT_ARRAY,
    maintainState,
    MAINTAIN_STATE,
    refreshCharacters,
    REFRESH_CHARACTERS,
    updateState,
    UPDATE_STATE,
    refreshState,
    REFRESH_STATE
} from '../actions'

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
});

describe('deleteCharacter', ()=> {
    it('should return the action', ()=> {
        const action = deleteCharacter();
        expect(action.type).toEqual(DELETE_CHARACTER);
    });
});

describe('enhanceEventArray', ()=>{
    it('should return the action', ()=>{
        let charID = '888';
        let payload = [
            {
                name: "Infinity War"
            },
            {
                name: "Secret Wars"
            }
        ];
        const action = enhanceEventArray(charID, payload);
        expect(action.type).toEqual(ENHANCE_EVENT_ARRAY);
        expect(action.charID).toEqual('888');
        expect(action.payload).toEqual([
            {
                name: "Infinity War"
            },
            {
                name: "Secret Wars"
            }
        ]);
    })
});

describe('maintainState', ()=> {
    it('should return the action', ()=> {
        const action = maintainState();
        expect(action.type).toEqual(MAINTAIN_STATE);
    })
});

describe('refreshCharacters', ()=>{
    it('should return the action', ()=>{
        let data = 'pigs';
        const action = refreshCharacters(data);
        expect(action.type).toEqual(REFRESH_CHARACTERS);
        expect(action.data).toEqual('pigs');
    });
});

describe('refreshState', () => {
    it('should return the action', () => {
        const data = {}
        const action = refreshState(data);
        expect(action.type).toEqual(REFRESH_STATE);
        expect(action.data).toEqual({});
    })
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


//TODO: Test the thunks!

// describe('attemptLogIn', ()=>{
//     it('should dispatch attemptLoginSuccess', ()=>{

//         let username = 'testPerson';
//         let password = 'testPersonPassword';

//         const data = {
//             authToken: '1234567890'
//         };

//         mockAxios.post.mockImplementationOnce(() =>
//             Promise.resolve({
//             data
//             })
//         );

        

//         const dispatch = jest.fn();
//          attemptLogIn(username, password)(dispatch).then(()=>{
//             expect(dispatch).toHaveBeenCalledWith(attemptLoginSuccess(data))


//         })
//             // expect(axios).toHaveBeenCalled();
        

//     })
// })


// describe('fetchBoard', () => {
//     it('Should dispatch fetchBoardSuccess', () => {
//         const board = {
//             lists: []
//         };

        // global.fetch = jest.fn().mockImplementation(() =>
        //     Promise.resolve({
        //         ok: true,
        //         json() {
        //             return board;
        //         }
        //     })
        // );

//         const dispatch = jest.fn();
    //     return fetchBoard()(dispatch).then(() => {
    //         expect(fetch).toHaveBeenCalledWith('/board');
    //         expect(dispatch).toHaveBeenCalledWith(fetchBoardSuccess(board));
    //     });
    // });



// export const fetchBoard = () => dispatch => {
//     return fetch('/board').then(res => {
//         if (!res.ok) {
//             return Promise.reject(res.statusText);
//         }
//         return res.json();
//     }).then(board => {
//         dispatch(fetchBoardSuccess(board));
//     });
// };