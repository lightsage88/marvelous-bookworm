import {API_BASE_URL} from '../config';
import axios from 'axios'

export const ADD_LIST = 'ADD_LIST';
export const addList = title => ({
    type: ADD_LIST,
    title
});

export const ADD_CARD = 'ADD_CARD';
export const addCard = (text, listIndex) => ({
    type: ADD_CARD,
    text,
    listIndex
});

export const UPDATE_STATE = 'UPDATE_STATE';
export const updateState = (newStateValues) => ({
    type:"UPDATE_STATE",
    newStateValues
})

export const MAINTAIN_STATE = 'MAINTAIN_STATE';
export const maintainState = () => ({
    type: MAINTAIN_STATE
})

export const ATTEMPT_LOGIN_SUCCESS = 'ATTEMPT_LOGIN_SUCCESS';

export const attemptLoginSuccess = (data) => ({
    type: ATTEMPT_LOGIN_SUCCESS,
    data
});

export const ATTEMPT_LOGOUT = 'ATTEMPT_LOGOUT';

export const attemptLogout = () => ({
    type: ATTEMPT_LOGOUT
});

export const REFRESH_STATE = 'REFRESH_STATE';
export const refreshState = (data) => ({
    type: REFRESH_STATE,
    data
})

export const ADD_EVENTS_TO_CHARACTER = 'ADD_EVENTS_TO_CHARACTER';
export const addEventsToCharacter = (charID, payload) => ({
    type: ADD_EVENTS_TO_CHARACTER,
    charID,
    payload
});



export const attemptLogIn = (username, password) => dispatch => {
    axios({
        url:`${API_BASE_URL}/api/auth/login`,
        method: "POST",
        headers: {
            "accept": "application/json"
        },
        data: {
            username,
            password
        }
    })
    .then(response => {
        dispatch(attemptLoginSuccess(response.data));
        localStorage.setItem('authToken', response.data.authToken);
    })
    .catch(err => {
        console.error(err);
    })
}

//do a thing where we send the authroken over in an attemptt o refresh and then when it gets to the back end, we decode it to find what the username to get the 
//refreshed account name is. Then we can get our new character updates :)

export const refreshStateWithToken = (token) => dispatch => {
    axios({
        url:`${API_BASE_URL}/api/users/refreshStateWithToken`,
        method:"POST",
        headers: {
            "accept":"application/json"
        },
        data: {
            token
        }
    })
    .then( response => {
         console.log(response);
        dispatch(refreshState(response.data));
    })
    .catch(err => {
        console.error(err);
    });
    
}

export const comicEventHydration = (charID) => dispatch => {
    console.log('comiceventhydration running');
    axios({
        url: `${API_BASE_URL}/api/characters/events`,
        method: "POST",
        headers: {
            "accept": "application/json"
        },
        data: {
            charID
        }
    })
    .then(response => {
        console.log(response);
        console.log('samoan breeze');
        dispatch(addEventsToCharacter(charID, response.data))
    })
    .catch(err => {
        console.error(err);
    })
}