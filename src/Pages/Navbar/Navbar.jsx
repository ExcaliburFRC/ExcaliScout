import React from 'react';
import './Navbar.css';

function Navbar() {
    const handleClickScout = () => {
        window.location.href = '/Scouting';
    };

    const handleClickLogin = () => {
        window.location.href = '/Login';
    };

    return (
        <div className="navbar">
            <a href="/">Home</a>
            <a onClick={handleClickScout}>Scout</a>
            <a onClick={handleClickLogin}>Login</a>
            <a href="#Simbucks">Simbucks</a>
        </div>
    );
}

export default Navbar;