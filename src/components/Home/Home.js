import React, {useEffect} from 'react';

import {Link} from "react-router-dom";

// -- Material UI
import { makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
//import Link from '@material-ui/core/Link';

const COMPONENT_NAME = "Home";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
    },
}));

const Home = () => {

    const classes = useStyles();

    return(
        <div>
            <Typography color="textPrimary" gutterBottom>Welcome to Xebia Bookshop !</Typography>

            <Typography className={classes.root}>

                <Link to="/catalog">
                    See Catalog
                </Link>
            </Typography>
        </div>
    )
}

export default Home;