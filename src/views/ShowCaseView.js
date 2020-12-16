import React     from 'react';

// -- Components
import ShowCase from '../components/ShowCase/ShowCase';
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

const handleClick = (e) => {
    e.preventDefault();
    console.info('You clicked a breadcrumb.');
}

const ShowCaseView = () => {
    return (
        <div className="view-container showcase">

            <div className="breadcrumbs-container">
                <Breadcrumbs aria-label="breadcrumb">
                    <Link color="inherit" href="/" onClick={handleClick}>
                        Home
                    </Link>
                    <Typography color="textPrimary">Catalog</Typography>

                </Breadcrumbs>
            </div>
            <ShowCase />
        </div>
    );
};

export default ShowCaseView;
