import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';

function App() {
    const [formData, setFormData] = useState({ Sname: '', Alliance: '', checkboxes: Array(9).fill(false) });
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
    };

    return (
        <div>
            <h1>Scouting 2024:</h1>
            <br/>
            <form onSubmit={handleSubmit}>
                <label htmlFor="Sname">First name of the Scouter:</label><br />
                <input type="text" id="Sname" name="Sname" value={formData.Sname} onChange={handleInputChange} /><br />
                <br />
                <label htmlFor="Alliance">Alliance:</label><br />
                <input type="text" id="Alliance" name="Alliance" value={formData.Alliance} onChange={handleInputChange} />
                <br />
                <br />
            </form>
            <br/>
            <br/>
            <h3>Map for autonomous:</h3>
            <Field formData={formData} handleCheckboxChange={handleCheckboxChange} />
            <br />
            <div style={{ textAlign: 'center' }}>
                <QRCode value={barcodeData} size={150} />
            </div>
        </div>
    );
}

function Field({ formData, handleCheckboxChange }) {
    return (
        <div style={{ position: 'relative' }}>
            <img src="https://www.chiefdelphi.com/uploads/default/original/3X/a/a/aa745548020a507cf4a07051dcd0faa446607840.png" alt="Field Image" className="center" />
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
        case 0: return 20;
        case 1: return 35;
        case 2: return 50;
        case 3: return 14.9;
        case 4: return 30.9;
        case 5: return 48.5;
        case 6: return 66.9;
        case 7: return 82.9;
        case 8: return 30.9;
        default: return 0;
    }
}

function getFieldLeft(index) {
    switch (index) {
        case 0:
        case 1:
        case 2: return 56.6;
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
        case 8: return 49.5;
        default: return 0;
    }
}

export default App;
