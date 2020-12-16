import React, { useState, useEffect }   from 'react';

// -- Redux
import { useDispatch, useSelector } from "react-redux";

import { TAX_RATE, ccyFormat, getCartSummary } from '../../helpers/helpers';

// -- Material UI
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography";

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
}));

const COMPONENT_NAME = "Cart";

const Cart = () => {

    // Styles
    const classes = useStyles();

    // Redux
    const { cart } = useSelector(state => ({
        cart: state.cart,
    }));

    const cartSummary = getCartSummary(cart);
    console.info(`[${COMPONENT_NAME}] cartSummary: `, cartSummary);

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
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { cartSummary.articles.map(article => (
                            <TableRow key={article.isbn}>
                                <TableCell component="th" scope="row">
                                    {article.title}
                                </TableCell>
                                <TableCell align="center">{article.qty}</TableCell>
                                <TableCell align="right">{article.total_amount_without_taxes} €</TableCell>
                                <TableCell align="right"></TableCell>
                            </TableRow>
                        ))}

                        <TableRow>
                            <TableCell rowSpan={3} />
                            <TableCell colSpan={1}>Subtotal</TableCell>
                            <TableCell align="right">{ccyFormat(cartSummary.total_amount_without_taxes)} €</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={1}>Tax {`${(TAX_RATE * 100)} %`}</TableCell>
                            <TableCell align="right">{ccyFormat(cartSummary.taxes)} €</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={1}><b>Total</b></TableCell>
                            <TableCell align="right"><b>{ccyFormat(cartSummary.total_amount_with_taxes)} €</b></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default Cart;