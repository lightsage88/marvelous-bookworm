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
     if (action.type === actions.ATTEMPT_LOGIN_SUCCESS) {
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
                characters: action.data.characters,
                loggedIn: true
            }
        });
    }
    else if(action.type === actions.REFRESH_CHARACTERS) {
        return Object.assign({}, state, {
            user: {...state.user,
                characters: action.data
            }
        })
    }
    else if (action.type === actions.ATTEMPT_LOGOUT) {
        return Object.assign({}, state, initialState )
    }
    else if (action.type === actions.MAINTAIN_STATE) {
        return state;
    }
    
    else if (action.type === actions.DELETE_CHARACTER) {
        let newCharacterArray = state.user.characters.filter(char => {
            return String(char.id) !== String(action.charID)
        })

        return Object.assign({}, state, {
            user: {
                ...state.user,
                characters: newCharacterArray
            }
        })
    
    }
    return state;
};