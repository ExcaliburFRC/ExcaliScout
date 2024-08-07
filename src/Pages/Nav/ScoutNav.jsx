import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "../Navbar/Navbar.jsx";
import "./ScoutNav.css"

function ScoutNav() {
    return (
        <div>
            <Navbar />
            <br/>
            {ScoutNavigate()}
        </div>
    );
}

function ScoutNavigate() {
    return (
        <div>
            <h2>Select your Scouting Type:</h2>
            <br/>
            <button onClick={handleClickScout}>Regular Scout</button>
            <br/>
            <button>Pit Scout</button>
            <br/>
            <button>Super Scout</button>
        </div>
    );
}

const handleClickScout = () => {
    window.location.href = '/Scouting';
};

export default ScoutNav;
