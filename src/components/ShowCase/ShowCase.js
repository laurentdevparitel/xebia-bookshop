import React, { useState, useEffect }   from 'react';

// -- Redux
import { useDispatch, useSelector } from "react-redux";

// -- Material UI
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

// -- Components
import ShowCaseBook from '../ShowCase/ShowCaseBook';
import ShowCaseBookDialog from '../ShowCase/ShowCaseBookDialog';

// -- API
import API from '../../api/API.js';

const api = new API();

const useStyles = makeStyles((theme) => ({

    root: {
        flexGrow: 1,
        margin: '80px auto 20px auto'
    },
}));

const COMPONENT_NAME = "ShowCase";

const ShowCase = () => {

    const [loading, setLoading] = React.useState(true);
    const [books, setBooks] = React.useState([]);
    const [selectedBook, setSelectedBook] = React.useState({});
    const [showCaseBookDialogOpen, setShowCaseBookDialogOpen] = React.useState(false);

    // Redux
    const dispatch = useDispatch();

    const { filteredBooks } = useSelector(state => ({
        filteredBooks: state.filteredBooks,
    }));

    // Styles
    const classes = useStyles();

    useEffect(() => {

        dispatch({type: "SET_IS_XHR_RUNNING", payload: true});

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

                // Redux storage;
                dispatch({type: "SET_BOOKS", payload: fetchedBooks});
                dispatch({type: "SET_IS_XHR_RUNNING", payload: false});

                // hide loader
                setLoading(false);
            }

        })();

    }, []);

    /**
     * Open ShowCaseBookDialog
     * @param {obj} book
     * @returns void
     */
    const handleOpenShowCaseBookDialog = (book) => {
        console.info(`[${COMPONENT_NAME}.handleOpenShowCaseBookDialog] book`, book);

        setSelectedBook(book);

        // open dialog
        setShowCaseBookDialogOpen(true);

        console.debug(`[${COMPONENT_NAME}.handleOpenShowCaseBookDialog] showCaseBookDialogOpen: `, showCaseBookDialogOpen);
    }

    /**
     * Close ShowCaseBookDialog
     * @param {obj} book
     * @returns void
     */
    const handleCloseShowCaseBookDialog = () => {
        console.info(`[${COMPONENT_NAME}.handleCloseShowCaseBookDialog]`);

        setSelectedBook({});

        // close dialog
        setShowCaseBookDialogOpen(false);

        console.debug(`[${COMPONENT_NAME}.handleCloseShowCaseBookDialog] showCaseBookDialogOpen: `, showCaseBookDialogOpen);
    }

    /**
     * Add book to basket
     * @param {obj} book
     * @returns void
     */
    const handleAddToBasket = (book) => {
        console.info(`[${COMPONENT_NAME}.handleAddToBasket]`, book);
    }

    if (loading) {  // TODO : add Backdrop loader
        return <p>loading...</p>;
    }

    const data = filteredBooks ? filteredBooks  : books;

    return (

        <div className={classes.root}>

            <Grid container alignItems="center" spacing={2}>
            {
                data.map( (book, index) => (
                    <Grid key={book.isbn} item>
                        <ShowCaseBook
                            book={book}
                            onClickCardActionArea={handleOpenShowCaseBookDialog}
                            handleAddToBasket={handleAddToBasket} />
                    </Grid>
                ))
            }
            </Grid>

            <ShowCaseBookDialog
                book={selectedBook}
                open={showCaseBookDialogOpen}
                handleClose={handleCloseShowCaseBookDialog}
                handleAddToBasket={handleAddToBasket}/>
        </div>
    );
};

export default ShowCase;