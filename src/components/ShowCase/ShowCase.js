import React, { useState, useEffect }   from 'react';

// -- Components
import ShowCaseBook from '../ShowCase/ShowCaseBook';

// -- API
import API from '../../api/API.js';

const api = new API();

const COMPONENT_NAME = "ShowCase";

const ShowCase = () => {

    const [loading, setLoading] = React.useState(true);
    const [books, setBooks] = React.useState([]);

    useEffect(() => {

        setLoading(true);

        (async function fetchData(){

            const fetchedBooks = await api.getBooks().then(data => {
                console.info(`[${COMPONENT_NAME}.useEffect] >>>> books loaded: `, data);
                return data;
            })
            .catch(error => {
                console.error(`[${COMPONENT_NAME}.useEffect] error`, error);
                setLoading(true);

                // TODO : handle error message to global view ...
                /*if (typeof(error.response) === "undefined" && error instanceof Error) {
                    this.setState({ errorMessage: error.toString() });
                }
                else {
                    this.setState({ errorMessage: API.handleAPIErrorMessages(error.response).body });
                }*/
            })

            if (typeof fetchedBooks !== "undefined"){
                console.debug(`[${COMPONENT_NAME}.useEffect] fetchedBooks: `, fetchedBooks);

                setBooks(fetchedBooks);
                setLoading(false);
            }

        })();

    }, []);

    if (loading) {  // TODO : add Backdrop loader
        return <p>loading...</p>;
    }

    return (
        <div className="list">
            {
                books.map( (book, index) => (
                    <ShowCaseBook book={book} key={`book-${index}`} />
                ))
            }
        </div>
    );
};

export default ShowCase;