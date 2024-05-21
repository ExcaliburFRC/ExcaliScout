import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';
import Navbar from './Navbar';

function App() {
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

    const removeUnwantedCharacters = (value) => {
        return value.replace(/[\{\}\[\]]/g, '');
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

    const handleSubmit = (event) => {
        event.preventDefault();
        sendDataToSheet(JSON.stringify(formData));
    };

    return (
        <div>
            <Navbar />
            <br/>
            <form onSubmit={handleSubmit}>
                <label htmlFor="Sname">:שם</label><br/>
                <input type="text" id="Sname" name="Name" value={formData.Name} onChange={handleInputChange}/><br/>
                <br/>
                <label htmlFor="Team">:מספר קבוצה</label><br/>
                <input type="number" id="Team" name="Team" value={formData.Team} onChange={handleInputChange}/><br/>
                <br/>
                <label htmlFor="Alliance">:ברית</label><br/>
                <input type="text" id="Alliance" name="Alliance" value={formData.Alliance}
                       onChange={handleInputChange}/>
                <br/>
                <br/>

                <label htmlFor="TeleNotes">:Teleopב Notes</label><br/>
                <input type="number" id="TeleNotes" name="TeleNotes" value={formData.TeleNotes}
                       onChange={handleInputChange}/><br/>
                <br/>
                <br/>
                <button type="submit">שליחה</button>
            </form>
            <br/>
            <h3>:באוטונומי Notes מספר </h3>
            <Field formData={formData} handleCheckboxChange={handleCheckboxChange}/>
            <br/>
            <h3>:למקרה שאין אינטרנט</h3>
            <div style={{textAlign: 'center'}}>
                <QRCode value={barcodeData} size={150}/>
            </div>
            <br/>
        </div>
    );
}

function Field({ formData, handleCheckboxChange }) {
    return (
        <div style={{ position: 'relative' }}>
            <img
                src="https://www.chiefdelphi.com/uploads/default/original/3X/a/a/aa745548020a507cf4a07051dcd0faa446607840.png"
                alt="Field Image" className="center"/>
            {formData.checkboxes.map((checked, index) => (
                <div key={index} style={{ position: 'absolute', top: `${getFieldTop(index)}%`, left: `${getFieldLeft(index)}%` }}>
                    <input type="checkbox" checked={checked} onChange={() => handleCheckboxChange(index)} />
                </div>
            ))}
        </div>
    );
}

function getFieldTop(index) {
    switch (index) {
        case 0:
            return 19.1;
        case 1:
            return 34.1;
        case 2:
            return 49;
        case 3:
            return 13.5;
        case 4:
            return 30.9;
        case 5:
            return 48.2;
        case 6:
            return 65.5;
        case 7:
            return 82.6;
        case 8:
            return 30.9;
        default:
            return 0;
    }
}

function getFieldLeft(index) {
    switch (index) {
        case 0:
        case 1:
        case 2: return 69.26;
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
        case 8: return 46.8;
        default: return 0;
    }
}

export default App;
