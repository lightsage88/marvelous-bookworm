import * as actions from '../actions';

const initialState = {

    user : {
        firstName: '',
        lastName: '',
        username: '',
        loggedIn: false,
    }
};

export const bookwormReducer = (state=initialState, action) => {
    if (action.type === actions.ADD_LIST) {
        return Object.assign({}, state, {
            lists: [...state.lists, {
                title: action.title,
                cards: []
            }]
        });
    } 
    else if (action.type === actions.ATTEMPT_LOGIN_SUCCESS) {
        return Object.assign({}, state, {
            username:'KING BOCHO'
        });
    }
    else if (action.type === actions.ADD_CARD) {
        let lists = state.lists.map((list, index) => {
            if (index !== action.listIndex) {
                return list;
            }
            return Object.assign({}, list, {
                cards: [...list.cards, {
                    text: action.text
                }]
            });
        });

        return Object.assign({}, state, {
            lists
        });
    }
    return state;
};