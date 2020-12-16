import React     from 'react';
import {Link} from "react-router-dom";

// -- Components
import ShowCase from '../components/ShowCase/ShowCase';
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
//import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

const ShowCaseView = () => {

    return (
        <div className="view-container showcase">

            <div className="breadcrumbs-container">
                <Breadcrumbs aria-label="breadcrumb">
                    <Link to="/">
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
