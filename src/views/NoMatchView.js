import React     from 'react';

import { useLocation } from "react-router-dom";

const NoMatchView = () => {

    const location = useLocation();

    return (
        <div className="view-container">
            <h3>
                Error 404 : No match view for <code>{location.pathname}</code>
            </h3>
        </div>
    );
};

export default NoMatchView;
