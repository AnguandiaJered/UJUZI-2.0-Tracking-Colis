import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './font-awesome/css/font-awesome.min.css';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
// redux
import { applyMiddleware , createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxThunk from 'redux-thunk';
import rootReducer from './redux/reducers';
import { getClients,getAgents,getColis,getDestination,getExpedition,getLocalisation,getPaiement,getUsers } from './redux/actions/getData';
// import store from './redux/reducers/store';

const middlewares = [reduxThunk];
const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middlewares)),
)
store.dispatch(getClients());
store.dispatch(getAgents());
store.dispatch(getColis());
store.dispatch(getDestination());
store.dispatch(getExpedition());
store.dispatch(getLocalisation());
store.dispatch(getPaiement());
store.dispatch(getUsers());

ReactDOM.render(
  <React.StrictMode>
       <Provider store={store}>
          <App />
       </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
