import {

    SET_BOOKS,
    SET_FILTERED_BOOKS,
    SET_KEYWORD_SEARCH,
    SET_APP_MESSAGE,
    SET_IS_XHR_RUNNING,

} from "../constants/action-types.js";

export const setBooks = books => ({ type: SET_BOOKS, payload: books });
export const setFilteredBooks = filteredBooks => ({ type: SET_FILTERED_BOOKS, payload: filteredBooks });
export const setKeywordSearch = keywordSearch => ({ type: SET_KEYWORD_SEARCH, payload: keywordSearch});

export const setAppMessage = appMessage => ({ type: SET_APP_MESSAGE, payload: appMessage });
export const setIsXHRRunning = isXHRRunning => ({ type: SET_IS_XHR_RUNNING, payload: isXHRRunning });
