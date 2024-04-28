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
    const [formData, setFormData] = useState({ Sname: '', Alliance: '' });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        generateBarcode(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="Sname">First name of the Scouter:</label><br />
            <input type="text" id="Sname" name="Sname" value={formData.Sname} onChange={handleInputChange} /><br />
            <br />
            <label htmlFor="Alliance">Alliance:</label><br />
            <input type="text" id="Alliance" name="Alliance" value={formData.Alliance} onChange={handleInputChange} />
            <br />
            <br />
            <button type="submit">Submit</button>
        </form>
    );
}

function Field() {
    const [checkboxes, setCheckboxes] = useState(Array(9).fill(false));

    const handleCheckboxChange = (index) => {
        const newCheckboxes = [...checkboxes];
        newCheckboxes[index] = !newCheckboxes[index];
        setCheckboxes(newCheckboxes);
    };

    const renderCheckbox = (topPercent, leftPercent, index) => {
        return (
            <div key={index} style={{ position: 'absolute', top: `${topPercent}%`, left: `${leftPercent}%` }}>
                <input type="checkbox" checked={checkboxes[index]} onChange={() => handleCheckboxChange(index)} />
            </div>
        );
    };

    return (
        <div style={{ position: 'relative' }}>
            <img src="https://www.chiefdelphi.com/uploads/default/original/3X/a/a/aa745548020a507cf4a07051dcd0faa446607840.png" alt="Field Image" className="center" />
            {renderCheckbox(20, 56.6, 0)}
            {renderCheckbox(35, 56.6, 1)}
            {renderCheckbox(50, 56.6, 2)}
            {renderCheckbox(14.9, 49.5, 3)}
            {renderCheckbox(30.9, 49.5, 4)}
            {renderCheckbox(48.5, 49.5, 5)}
            {renderCheckbox(66.9, 49.5, 6)}
            {renderCheckbox(82.9, 49.5, 7)}
            {renderCheckbox(30.9, 49.5, 8)}
        </div>
    );
}

function generateBarcode(formData) {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const checkboxValues = Array.from(checkboxes).map(checkbox => checkbox.checked);

    const data = { ...formData, checkboxes: checkboxValues };
    const jsonStr = JSON.stringify(data);
    const barcodeImageSrc = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(jsonStr)}&size=150x150`;

    console.log(barcodeImageSrc);
    // Display the barcode image or take further actions as needed
}

export default App;
