import { createStore } from "redux";

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web and AsyncStorage for react-native

import rootReducer from "../reducers/reducers.js";

const persistConfig = {
    key: 'root',
    storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

// persist store
// cf :https://github.com/rt2zz/redux-persist
//export default () => {  // KO
const store = createStore(persistedReducer)
store.subscribe(() => console.log('----> Redux action called !'))
const persistor = persistStore(store)

// Init store by passing URL param... TODO: add INI_STORE action || call component
const resetStore = true; // DEV
// const urlParams = new URLSearchParams(window.location.search);
// const regex = /resetStore/gm;
//
// if (urlParams.has('resetStore')){ // http://localhost:3000/?resetStore
//   console.log('resetStore called by urlParams')
//   resetStore = true;
// }
// else if (regex.test(window.location.hash)){  // http://localhost:3000/#/?resetStore
//   console.log('resetStore called by window.location.hash')
//   resetStore = true;
// }

if (resetStore){
    persistor.purge().then(() => {
        console.log('<> Redux store purged !!')
    })
}

//return { store, persistor }
//}

export {store, persistor};
