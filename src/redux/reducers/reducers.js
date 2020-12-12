import {

    SET_BOOKS,
    SET_APP_MESSAGE,
    SET_IS_XHR_RUNNING,

} from "../constants/action-types.js";


const initialState = {

    books: [],
    appMessage: {   // messages success / error de l'app (cf: MuiAlert)
        text: null,   // contenu du message
        severity: "success"    // success|warning|info|error
    },
    isXHRRunning: false,    // requête XHR en cours ou non
};

/*
  Avoiding mutations in Redux :
  Using concat(), slice(), and …spread for arrays
  Using Object.assign() and …spread for objects
  https://medium.com/@nitish15p/immutable-object-and-array-operations-in-javascript-86047609532
*/

const rootReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_BOOKS:
            return { ...state, books: action.payload };

        case SET_APP_MESSAGE:
            return { ...state, appMessage: action.payload };

        case SET_IS_XHR_RUNNING:
            return { ...state, isXHRRunning: action.payload };

        default:
            return state;
    }
};

// Remove an item inside items Array
const removeItem = (items, index) =>
    //items.slice(0, index-1).concat(items.slice(index, items.length))  // KO
    items.filter(function(value, i) {
        return i !== index;
    });

export default rootReducer;
