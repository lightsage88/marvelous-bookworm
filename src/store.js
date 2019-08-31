import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {bookwormReducer} from './reducers';

const store = createStore(
    bookwormReducer, applyMiddleware(thunk) /* preloadedState, */
 +  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

export default store;