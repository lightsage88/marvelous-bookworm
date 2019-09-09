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
    else if (action.type === actions.REFRESH_STATE) {
        return Object.assign({}, state, {
            user: {...action.data,
                characters: action.data.characters
            }
        });
    }
    else if (action.type === actions.ATTEMPT_LOGOUT) {
        return Object.assign({}, state, initialState )
    }
    else if (action.type === actions.MAINTAIN_STATE) {
        return state;
    }
    else if(action.type === actions.ADD_EVENTS_TO_CHARACTER) {
        console.log('gogogogogogo');
        console.log(String(action.charID))
        let newCharacterArray = state.user.characters;
        console.log(newCharacterArray);
        let eventFilledData = action.payload;
        console.log(eventFilledData);
        newCharacterArray.forEach(char => {
            if(char.id == action.charID) {
                char.events = action.payload
            }
        })

        return Object.assign({}, state, {
            user: {...state.user,
                characters: newCharacterArray
            }
        })

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