import {API_BASE_URL} from '../config';


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

// export const fetchUserCollection = () => dispatch => {
//     fetch(`${API_BASE_URL}/api/${userId}`)
// }