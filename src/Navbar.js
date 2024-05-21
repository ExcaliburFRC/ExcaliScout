import React from 'react';
import './Navbar.css';

function Navbar() {
    const handleClick = () => {
        window.location.href = '/login';
    };

    return (
        <div className="navbar">
            <a href="/">בית</a>
            <a onClick={handleClick}>חשבון</a>
            <a href="#Quals">מקצים</a>
            <a href="#Simbucks">Simbucks</a>
        </div>
    );
}

export default Navbar;
