import React, { useState, useEffect }   from 'react';

// -- Material UI
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

// -- Component styles
import styles from "./ShowCaseBookStyles";

const useStyles = makeStyles(styles);

const COMPONENT_NAME = "ShowCaseBook";

const ShowCaseBook = (props) => {
    //console.info(`[${COMPONENT_NAME}.useEffect] props : `, props);

    const [book, setBook] = useState(props.book);
    const classes = useStyles();

    // synchronize props
    useEffect(() => {
        setBook(props.book);
    }, [props]);

    /**
     * CardActionArea click
     * @returns void
     */
    const handleClickCardActionArea = () => {
        //console.info(`[${COMPONENT_NAME}.handleClickCardActionArea] props`, props);

        // Passing data to parent component
        props.onClickCardActionArea(book);
    };

    /**
     * Add item to basket
     * @returns void
     */
    const handleAddToBasket = () => {

        // Passing data to parent component
        props.handleAddToBasket(book);
    }

    return (
        <div className="book">
            <Card className={classes.root}>
                <CardActionArea onClick={handleClickCardActionArea}>
                    <CardMedia
                        className={classes.media}
                        image={book.cover}
                        title={book.title}
                    />
                    <CardContent>
                        <Typography className={classes.title} gutterBottom variant="h5" component="h2" align="left">
                            {book.title}
                        </Typography>
                        <Typography className={classes.synopsis} variant="body2" color="textSecondary" component="p" align="justify" noWrap={true}>
                            {book.synopsis[0]}
                        </Typography>
                        <Typography className={classes.price}  variant="h6" align="left">
                            {book.price}€
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions className={classes.cardActions}>
                    <Button size="small" color="primary" className={classes.addToBasketBtn} onClick={handleAddToBasket}>
                        Add to basket
                    </Button>
                </CardActions>
            </Card>
        </div>
    )
}

export default ShowCaseBook;