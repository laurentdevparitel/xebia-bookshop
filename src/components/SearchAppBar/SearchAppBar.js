import React from 'react';
import {Link, useHistory} from "react-router-dom";

// -- Redux
import { useDispatch, useSelector } from "react-redux";

import { searchOnProperty, getDistinctCartArticles } from '../../helpers/helpers';

// -- Material UI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';

import {makeStyles, useTheme} from '@material-ui/core/styles';

import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import HomeIcon from '@material-ui/icons/Home';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';


// -- Component styles
import styles from "./SearchAppBarStyles";

const useStyles = makeStyles(styles);

const COMPONENT_NAME = "SearchAppBar";

const SearchAppBar = () => {

    const classes = useStyles();
    const theme = useTheme();

    // Redux
    const { books, cart } = useSelector(state => ({
        books: state.books,
        cart: state.cart,
    }));

    const dispatch = useDispatch();

    const REACT_APP_APP_NAME = process.env.REACT_APP_APP_NAME;

    const [open, setOpen] = React.useState(false);

    // React Router redirection
    const history = useHistory();

    /**
     * Open drawer
     * @returns void
     */
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    /**
     * Close drawer
     * @returns void
     */
    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleClickAway = () => {
        setOpen(false);
    };

    /**
     * Filtering on local books
     * @param {Event} e
     * @returns void
     */
    const handleSearchFilterChange = (e) => {

        const filteredBooks = searchOnProperty(books, e.target.value, 'title');

        // Redux storage
        dispatch({type: "SET_KEYWORD_SEARCH", payload: e.target.value});
        dispatch({type: "SET_FILTERED_BOOKS", payload: filteredBooks});
    }

    console.info(`[${COMPONENT_NAME}] getDistinctCartArticles: `, getDistinctCartArticles(cart));

    const redirectToCartView = () => {
        //document.location.href = '/cart'; // KO
        history.push('/cart');
    }

    return (
        <div className={classes.root}>
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography className={classes.title} variant="h6" noWrap>
                        {REACT_APP_APP_NAME}
                    </Typography>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon/>
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{'aria-label': 'search'}}
                            onChange={handleSearchFilterChange}
                        />
                    </div>

                    <IconButton aria-label="show 4 article(s)" color="inherit" onClick={redirectToCartView}>
                        <Badge badgeContent={getDistinctCartArticles(cart).length} color="secondary">
                            <ShoppingCartIcon />
                        </Badge>
                    </IconButton>
                </Toolbar>
            </AppBar>

            <ClickAwayListener
                mouseEvent="onMouseDown"
                touchEvent="onTouchStart"
                onClickAway={handleClickAway}
            >
                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="left"
                    open={open}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                        </IconButton>
                    </div>
                    <Divider/>
                    <List>
                        <ListItem button>
                            <ListItemIcon><HomeIcon/></ListItemIcon>
                            <ListItemText>
                                <Link to="/">Home</Link>
                            </ListItemText>
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon><LibraryBooksIcon/></ListItemIcon>
                            <ListItemText>
                                <Link to="/catalog">Catalog</Link>
                            </ListItemText>
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon><ShoppingCartIcon/></ListItemIcon>
                            <ListItemText>
                                <Link to="/cart">Cart</Link>
                            </ListItemText>
                        </ListItem>
                    </List>

                </Drawer>
            </ClickAwayListener>
        </div>
    );
}

export default SearchAppBar;