import React     from 'react';
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from "@material-ui/core/Typography";
//import Home  from "../components/Home";

const HomeView = () => {
    return (
        <div className="view-container home">
            <div className="breadcrumbs-container">
                <Breadcrumbs aria-label="breadcrumb">
                    <Typography color="textPrimary">Home</Typography>
                </Breadcrumbs>
            </div>

            <Typography color="textPrimary">Welcome to Xebia Bookshop !</Typography>
        </div>
    );
};

export default HomeView;
