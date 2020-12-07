import React, { useState, useEffect }   from 'react';


// -- API
import API from '../../api/API.js';

const api = new API();

const COMPONENT_NAME = "ShowCase";

const ShowCase = () => {

    const [loading, setLoading] = React.useState(true);
    const [books, setBooks] = React.useState([]);

    useEffect(() => {

        setLoading(true);

        (async function load(){

            const books = await api.getBooks().then(data => {
                console.info(`[${COMPONENT_NAME}.useEffect] >>>> books loaded: `, data);
                return data;
            })
            .catch(error => {
                console.error(`[${COMPONENT_NAME}.useEffect] error`, error);
                setLoading(true);
                /*if (typeof(error.response) === "undefined" && error instanceof Error) {
                    this.setState({ errorMessage: error.toString() });
                }
                else {
                    this.setState({ errorMessage: API.handleAPIErrorMessages(error.response).body });
                }*/
            })

            setLoading(false);

            console.debug(`[${COMPONENT_NAME}.useEffect] books: `, books);
            setBooks(books);
        })();

    }, []);

    if (loading) {
        return <p>loading...</p>;
    }

    return (
        <div className="list">
            ShowCase
        </div>
    );
};

export default ShowCase;