import React from 'react';
import './Navbar.css';

function Navbar() {
    const handleClick = () => {
        window.location.href = '/Pages/User.js';
    };

    return (
        <div className="navbar">
            <a href="#home">בית</a>
            <a href="#Login" onClick={handleClick}>חשבון</a>
            <a href="#Quals">מקצים</a>
            <a href="#Simbucks">Simbucks</a>
        </div>
    );
}

export default Navbar;
