import React     from 'react';
import Cart  from "../components/Cart/Cart";

// -- Material UI
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';

const handleClick = (e) => {
    e.preventDefault();
    console.info('You clicked a breadcrumb.');
}

const CartView = () => {
    return (
        <div className="view-container cart">

            <div className="breadcrumbs-container">
                <Breadcrumbs aria-label="breadcrumb">
                    <Link color="inherit" href="/" onClick={handleClick}>
                        Home
                    </Link>
                    <Typography color="textPrimary">Shopping Cart</Typography>

                </Breadcrumbs>
            </div>

            <Cart />
        </div>
    );
};

export default CartView;
