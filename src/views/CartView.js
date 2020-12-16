import React     from 'react';
import {Link} from "react-router-dom";

import Cart  from "../components/Cart/Cart";

// -- Material UI
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
//import Link from '@material-ui/core/Link';

const CartView = () => {

    return (
        <div className="view-container cart">

            <div className="breadcrumbs-container">
                <Breadcrumbs aria-label="breadcrumb">
                    <Link to="/">
                        Home
                    </Link>
                    <Link to="/catalog">
                        Catalog
                    </Link>
                    <Typography color="textPrimary">Shopping Cart</Typography>

                </Breadcrumbs>
            </div>

            <Cart />
        </div>
    );
};

export default CartView;
