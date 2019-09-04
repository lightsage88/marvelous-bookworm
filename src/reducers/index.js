import * as actions from '../actions';

const initialState = {

    user : {
        firstName: '',
        lastName: '',
        username: '',
        books: [],
        characters: [],
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
          user: {...state.user,
                authToken: action.data.authToken,
                firstName: action.data.user.firstName,
                books: action.data.user.books,
                characters: action.data.user.characters,
                lastName: action.data.user.lastName,
                username: action.data.user.username,
                loggedIn: true
            }
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