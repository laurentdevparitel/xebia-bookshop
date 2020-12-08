import React, { useState, useEffect }   from 'react';

const COMPONENT_NAME = "ShowCaseBook";

const ShowCaseBook = (props) => {
    //console.info(`[${COMPONENT_NAME}.useEffect] props : `, props);

    const [book, setBook] = useState(props.book);

    // synchronize props
    useEffect(() => {
        setBook(props.book);
    }, [props]);

    return (
        <div className="book">
            {book.isbn}
        </div>
    )
}

export default ShowCaseBook;