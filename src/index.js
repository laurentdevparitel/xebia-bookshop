import React from 'react';
import ReactDOM from 'react-dom';

// -- Redux
import { Provider } from 'react-redux'
import store from './redux/store/store'

import App from './App';

import './styles/index.css';

//import reportWebVitals from './reportWebVitals';

const rootElement = document.getElementById('root');

ReactDOM.render(
    <Provider store={store}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </Provider>,
    rootElement
);

console.log('ENV', process.env);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
