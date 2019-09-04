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

export const ATTEMPT_LOGIN_SUCCESS = 'ATTEMPT_LOGIN_SUCCESS'

export const attemptLoginSuccess = (data) => ({
    type: ATTEMPT_LOGIN_SUCCESS,
    data
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
    })
    .catch(err => {
        console.error(err);
    })
}