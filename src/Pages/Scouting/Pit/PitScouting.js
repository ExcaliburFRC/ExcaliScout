import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "C:/code/my-app/src/Pages/Navbar/Navbar.jsx";
import "./PitScouting.css";

function PitScouting() {
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
            <label htmlFor="Sname">Name:</label><br/>
            <input type="text" id="Sname" name="Name"/><br/>
            <br/>
        </div>
    );
}

const handleClickScout = () => {
    window.location.href = '/Scouting';
};

export default PitScouting;
