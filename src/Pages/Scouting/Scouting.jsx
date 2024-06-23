import React, { useEffect, useState } from "react";
import QRCode from "qrcode.react";
import "./Scouting.css";
import Navbar  from "../Navbar/Navbar";
import Field from "./Game/Autonomus";

function ScoutingForm() {
    const [formData, setFormData] = useState({ Name: '', Team: '', Alliance: '', TeleNotes: '', checkboxes: Array(9).fill(false) });
    const [barcodeData, setBarcodeData] = useState('');

    useEffect(() => {
        const generateBarcode = () => {
            return JSON.stringify(formData);
        };

        setBarcodeData(generateBarcode());
    }, [formData]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCheckboxChange = (index) => {
        const newCheckboxes = [...formData.checkboxes];
        newCheckboxes[index] = !newCheckboxes[index];
        setFormData({ ...formData, checkboxes: newCheckboxes });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        sendDataToSheet(JSON.stringify(formData));
    };

    const sendDataToSheet = (value) => {
        value = removeUnwantedCharacters(value);
        fetch('https://script.google.com/macros/s/AKfycbzxJmqZyvvPHM01FOFTnlGtUFxoslmNOJTUT0QccjLQsK5uQAHHhe_HfYFO2BxyK7Y_/exec', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            mode: 'no-cors',
            body: JSON.stringify({ value: value })
        })
            .then(response => response.json())
            .then(data => console.log('Success:', data))
            .catch(error => console.error('Error:', error));
    };

    const removeUnwantedCharacters = (value) => {
        return value.replace(/[\{\}\[\]]/g, '');
    };

    return (
        <div>
            <Navbar></Navbar>
            <br/>

            <form onSubmit={handleSubmit}>
                <label htmlFor="Sname">Name:</label><br/>
                <input type="text" id="Sname" name="Name" value={formData.Name} onChange={handleInputChange}/><br/>
                <br/>

                <label htmlFor="Team">Team Number:</label><br/>
                <input type="number" id="Team" name="Team" value={formData.Team} onChange={handleInputChange}/><br/>
                <br/>

                <label htmlFor="Alliance">Alliance:</label><br/>
                <input type="text" id="Alliance" name="Alliance" value={formData.Alliance}
                       onChange={handleInputChange}/>
                <br/>
            </form>

            <br/>

            <h3 style={{color: 'black'}}>Turn your phone sideways to work comfortably with the map.</h3>

            <h3>Map for scouting:</h3>

            <div className="button-container">
                <button type="button" className="resizable-button">Endgame</button>
                <button type="button" className="resizable-button">Teleop</button>
                <button type="button" className="resizable-button" >Autonomous</button>

            </div>
            <br/>
            <Field formData={formData} handleCheckboxChange={handleCheckboxChange}/>
            <br/>

            <button type="submit">Submit</button>
            <h3>If there is no Wifi:</h3>
            <QRCodeSection barcodeData={barcodeData}/>
        </div>
    );
}



function QRCodeSection({ barcodeData }) {
    return (
        <div style={{ textAlign: 'center' }}>
            <QRCode value={barcodeData} size={150} />
            <br />
        </div>
    );
}

function Button(Mergin) {
    const buttonStyle = {
        margin: {Mergin}
    };

    return (
        <button style={buttonStyle}>Hey</button>
    );
}

export default ScoutingForm;