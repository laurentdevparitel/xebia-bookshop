import React     from 'react';

const NoMatchView = () => {
    return (
        <div className="view">
            <h3>
                Error 404 : No match view for <code>{window.location.pathname}</code>
            </h3>
        </div>
    );
};

export default NoMatchView;
