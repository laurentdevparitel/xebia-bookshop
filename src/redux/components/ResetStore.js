
import React, { Component } from 'react';

// -- Redux
import { connect } from "react-redux";
import { store, persistor } from "../../redux/store/store.js";

const mapStateToProps = state => {
    return {
        //
    };
};

const mapDispatchToProps = dispatch => {
    return {
        //
    };
};

class ConnectedResetStore extends Component {
    constructor(props) {
        console.info(`.constructor`, props);
        super(props);
        this.state = {
            //
        }

        if (typeof(persistor) !== "undefined"){
            persistor.purge().then(() => {
                console.log('<> Redux store purged !!')
                console.log('store:', store.getState());
            })
        }
    }

    render() {

        return (
            <h3>
                <code>Store has been reset !</code>
            </h3>
        )
    }
}

const ResetStore = connect(mapStateToProps, mapDispatchToProps)(ConnectedResetStore);

export default ResetStore;
