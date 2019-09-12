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
    // else if(action.type === actions.ADD_EVENTS_TO_CHARACTER) {
    //     console.log('gogogogogogo');
    //     console.log(String(action.charID))
    //     let newCharacterArray = state.user.characters;
    //     console.log(newCharacterArray);
    //     let eventFilledData = action.payload;
    //     console.log(eventFilledData);
    //     newCharacterArray.forEach(char => {
    //         if(char.id == action.charID) {
    //             char.events = action.payload
    //         }
    //     })

    //     return Object.assign({}, state, {
    //         user: {...state.user,
    //             characters: newCharacterArray
    //         }
    //     })

    // }
    else if (action.type === actions.DELETE_CHARACTER) {
        console.log('shrimp sandwich');
        console.log('we need to get the state.user.characters and make a new version of it filtering out anything that has the action.charID');
        let newCharacterArray = state.user.characters.filter(char => {
            return String(char.id) !== String(action.charID)
        })
        console.log(newCharacterArray);

        return Object.assign({}, state, {
            user: {
                ...state.user,
                characters: newCharacterArray
            }
        })
    // } else if (action.type === actions.ENHANCE_EVENT_ARRAY){
    //     console.log('fogfogfog');
    //     console.log(action.charID);
    //     let index = state.user.characters.findIndex((element) => {
    //         return String(element.id) === String(action.charID);
    //     });
    //     console.log(index);
    //     let revisedCharacter = state.user.characters.find((element) => {
    //         return String(element.id) === String(action.charID);
    //     });
        
    //     revisedCharacter.events = action.payload;
    //     console.log(revisedCharacter);
    //     let newCharacterArray = state.user.characters;
    //     newCharacterArray[index] = revisedCharacter;

    //     return Object.assign({}, state, {
    //         user: {
    //             ...state.user,
    //             characters: newCharacterArray
    //         }
    //     });

        
    // }
    }
    return state;
};