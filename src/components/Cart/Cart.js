import React, {useState, useEffect} from 'react';

// -- Redux
import {useDispatch, useSelector} from "react-redux";

import {TAX_RATE, ccyFormat, getCartSummary, getDistinctCartArticles} from '../../helpers/helpers';

// -- Material UI
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

// -- Components
import Loader from '../Loader/Loader';

// -- API
import API from '../../api/API.js';

const api = new API();

const useStyles = makeStyles((theme) => ({

    root: {
        marginTop: 100,
        padding: '10px 20px',
    },

    table: {
        minWidth: 650,
    },
    tableCellBtn: {
        padding: 0
    },
}));

const COMPONENT_NAME = "Cart";

const Cart = () => {

    const [loading, setLoading] = React.useState(true);

    // Styles
    const classes = useStyles();

    // Redux
    const {cart} = useSelector(state => ({
        cart: state.cart,
    }));

    const dispatch = useDispatch();

    /**
     * Remove cart article
     * @param {Object} article
     * @returns void
     */
    const handleRemoveCartArticle = (article) => {
        //console.info(`[${COMPONENT_NAME}] handleRemoveCartArticle: `, article);

        // Redux storage
        dispatch({type: "REMOVE_CART_ARTICLE", payload: article});
    }

    const cartSummary = getCartSummary(cart);
    console.info(`[${COMPONENT_NAME}] cartSummary: `, cartSummary);

    useEffect(() => {

        setLoading(true);
        dispatch({type: "SET_IS_XHR_RUNNING", payload: loading});

        (async function fetchData() {

            const distinctCartArticles = getDistinctCartArticles(cart, true);
            if (!distinctCartArticles.length){
                setLoading(false);
                dispatch({type: "SET_IS_XHR_RUNNING", payload: loading});
                return;
            }

            const fetchedBookCommercialOffers = await api.getBookCommercialOffers(distinctCartArticles).then(data => {
                console.info(`[${COMPONENT_NAME}.useEffect] >>>> data loaded: `, data);
                return data;
            })
                .catch(error => {
                    console.error(`[${COMPONENT_NAME}.useEffect] error`, error);
                    setLoading(true);
                    dispatch({type: "SET_IS_XHR_RUNNING", payload: loading});

                    // TODO : handle error message to global view ...
                    /*if (typeof(error.response) === "undefined" && error instanceof Error) {
                        this.setState({ errorMessage: error.toString() });
                    }
                    else {
                        this.setState({ errorMessage: API.handleAPIErrorMessages(error.response).body });
                    }*/
                })

            if (typeof fetchedBookCommercialOffers !== "undefined") {
                console.debug(`[${COMPONENT_NAME}.useEffect] fetchedBookCommercialOffers: `, fetchedBookCommercialOffers);

                // hide loader
                setLoading(false);
                dispatch({type: "SET_IS_XHR_RUNNING", payload: loading});
            }

        })();

    }, []);

    if (loading) {
        return (
            <Loader/>
        )
    }

    return (

        <div className={classes.root}>

            <Typography variant="h5" align="left" gutterBottom>
                Shopping Cart
            </Typography>

            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="Cart">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Article</TableCell>
                            <TableCell align="center">Quantity</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cartSummary.articles.map(article => (
                            <TableRow key={article.isbn}>
                                <TableCell component="th" scope="row">
                                    {article.title}
                                </TableCell>
                                <TableCell align="center">{article.qty}</TableCell>
                                <TableCell align="right">{ccyFormat(article.total_amount_without_taxes)} €</TableCell>
                                <TableCell align="center">
                                    <IconButton
                                        className={classes.tableCellBtn} aria-label="delete" color="primary"
                                        onClick={e => handleRemoveCartArticle(article)}>
                                        <DeleteIcon/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}

                        <TableRow>
                            <TableCell rowSpan={3}/>
                            <TableCell colSpan={1}>Subtotal</TableCell>
                            <TableCell align="right">{ccyFormat(cartSummary.total_amount_without_taxes)} €</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={1}>Tax {`${(TAX_RATE * 100)} %`}</TableCell>
                            <TableCell align="right">{ccyFormat(cartSummary.taxes)} €</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={1}><b>Total</b></TableCell>
                            <TableCell
                                align="right"><b>{ccyFormat(cartSummary.total_amount_with_taxes)} €</b></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default Cart;