import {createStore, applyMiddleware} from 'redux';
import {bookwormReducer} from './reducers';
import thunk from 'redux-thunk';
import axios from 'axios';

const store =  createStore(bookwormReducer, applyMiddleware(thunk.withExtraArgument(axios)) +  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;