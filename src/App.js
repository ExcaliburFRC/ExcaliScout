import React, { useRef, useState } from 'react';

function App() {
    return (
        <div>
            <h1>Scouting 2024:</h1>
            <br/>
            <Form/>
            <br/>
            <br/>
            <br/>
            <h3>Map for autonomous:</h3>
            <Field/>
        </div>
    );
}

function Form() {
    return (
        <form>
            <label htmlFor="fname">First name of the Scouter:</label><br />
            <input type="text" id="Sname" name="Sname" /><br />
            <br />
            <label htmlFor="lname">Alliance:</label><br />
            <input type="text" id="Alliance" name="Alliance" />
        </form>
    );
}

function Field() {
    const renderCheckbox = (topPercent, leftPercent) => {
        return (
            <div style={{ position: 'absolute', top: `${topPercent}%`, left: `${leftPercent}%` }}>
                <input type="checkbox" />
            </div>
        );
    };

    return (
        <div style={{ position: 'relative' }}>
            <img src="https://www.chiefdelphi.com/uploads/default/original/3X/a/a/aa745548020a507cf4a07051dcd0faa446607840.png" alt="Field Image" className="center" />
            {renderCheckbox(20, 56.6)}
            {renderCheckbox(35, 56.6)}
            {renderCheckbox(50, 56.6)}
            {renderCheckbox(14.9, 49.5)}
            {renderCheckbox(30.9, 49.5)}
            {renderCheckbox(48.5, 49.5)}
            {renderCheckbox(66.9, 49.5)}
            {renderCheckbox(82.9, 49.5)}
            {renderCheckbox(30.9, 49.5)}
        </div>
    );
}


export default App;
