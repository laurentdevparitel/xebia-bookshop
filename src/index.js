import React from 'react';
import ReactDOM from 'react-dom';


// -- Redux
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './redux/store/store'

import App from './App';

import './styles/index.css';

//import reportWebVitals from './reportWebVitals';

// Redux Store Log
window.store = store;

// NB: Get store state :
//store.getState()

const rootElement = document.getElementById('root');

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </PersistGate>
    </Provider>,
    rootElement
);

//console.log('ENV', process.env);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
