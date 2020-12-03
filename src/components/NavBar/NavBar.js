import React  from 'react';

import {Link} from "react-router-dom";

import './NavBar.css';

const NavBar = () => {
    return (
        <div className="navbar">
            <div className="container flex">
                <h1 className="logo">Xebia Test</h1>
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/catalog">Catalog</Link></li>
                        <li><Link to="/cart">Cart</Link></li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default NavBar;
