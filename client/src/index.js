import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM, { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';


const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

// ReactDOM.render(
//     <Provider store ={store}><App /></Provider>, 
//     document.querySelector('#root')
// );
createRoot(document.getElementById('root')).render(<Provider store ={store}><App /></Provider>);
