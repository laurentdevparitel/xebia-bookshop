import React  from 'react';

// -- API
import API from '../../api/API.js';

const api = new API();

const ShowCase = () => {

    const [books, setBooks] = React.useState([]);

    return (
        <div className="list">
            ShowCase
        </div>
    );
};

export default ShowCase;