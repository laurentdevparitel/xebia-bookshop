import React, { useState, useEffect } from 'react';

// -- Material UI
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Card from "@material-ui/core/Card";

import styles from "./ShowCaseBookStyles";

const useStyles = makeStyles(styles);

const COMPONENT_NAME = "ShowCaseBookDialog";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ShowCaseBookDialog(props) {
    console.info(`[${COMPONENT_NAME}] props`, props);

    const classes = useStyles();
    const [open, setOpen] = React.useState(props.open);
    const [book, setBook] = React.useState(props.book);

    // update ShowCaseBookDialog content
    useEffect(() => {
        setBook(props.book);
        setOpen(props.open);
    }, [props])

    /**
     * Close Dialog
     * @returns void
     */
    const handleClose = () => {
        setOpen(false);

        // Passing data to parent component
        props.handleClose();
    };

    /**
     * Add item to basket
     * @returns void
     */
    const handleAddToBasket = () => {

        // Passing data to parent component
        props.handleAddToBasket(book);
    }

    if (Object.keys(book).length === 0){
        return '';
    }

    return (
        <div>
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.appBarTitle}>
                            {book.title}
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleAddToBasket}>
                            Add to basket
                        </Button>
                    </Toolbar>
                </AppBar>

                <Card className={classes.dialogCart}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.dialogCartMedia}
                            image={book.cover}
                            title={book.title}
                        />
                        <CardContent>
                            <Typography className={classes.title} gutterBottom variant="h5" component="h2" align="left">
                                {book.title}
                            </Typography>

                            {
                                book.synopsis.map(s => (
                                    <Typography className={classes.synopsis} gutterBottom variant="body2" color="textSecondary" component="p" align="justify" >
                                        {s}
                                    </Typography>
                                ))
                            }

                            <Typography className={classes.price}  variant="h6" align="left">
                                {book.price}€
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Dialog>
        </div>
    );
}