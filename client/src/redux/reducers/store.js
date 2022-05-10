// import { configureStore,applyMiddleware } from '@reduxjs/toolkit';
import { createStore,applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxThunk from 'redux-thunk';
import rootReducer from './index';

const middlewares = [reduxThunk];
const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middlewares)),
)

export default store