import React, { useState, useRef, useEffect } from "react";
import Papa from "papaparse";

function TeleField({ formData, setFormData }) {
    const [dotColor, setDotColor] = useState(1);
    const [pointPositions, setPointPositions] = useState([]);
    const [barcodeData, setBarcodeData] = useState('');

    const imageRef = useRef(null);

    useEffect(() => {
        const generateBarcode = () => {
            const telePointsCSV = Papa.unparse(pointPositions.map(point => ({
                x: point.x.toFixed(2),
                y: point.y.toFixed(2),
                color: point.color === 1 ? 'G' : 'O'
            })));
            const barcodeString = `${formData.Name},${formData.Alliance},${formData.Team},${telePointsCSV}`;
            return barcodeString;
        };

        setBarcodeData(generateBarcode());
    }, [formData, pointPositions]);

    const handleImageClick = (event) => {
        const imageElement = imageRef.current;
        if (!imageElement) return;

        const rect = imageElement.getBoundingClientRect();
        const x = parseFloat(((event.clientX - rect.left) / rect.width * 100).toFixed(2));
        const y = parseFloat(((event.clientY - rect.top) / rect.height * 100).toFixed(2));

        const newPoint = {
            x,
            y,
            color: dotColor,
        };

        setPointPositions([...pointPositions, newPoint]);

        setFormData(prevState => ({
            ...prevState,
            TelePoints: [...prevState.TelePoints, newPoint]
        }));
    };

    const toggleDotColor = () => {
        setDotColor(dotColor === 1 ? 2 : 1);
    };

    const exportCSV = () => {
        const csvData = Papa.unparse(pointPositions.map(point => ({
            x: point.x.toFixed(2),
            y: point.y.toFixed(2),
            color: point.color === 1 ? 'green' : 'orange'
        })));
        return csvData;
    };

    return (
        <div style={{ position: 'relative', width: '100%', maxWidth: '1000px', margin: '0 auto' }}>
            <img
                ref={imageRef}
                src="https://www.chiefdelphi.com/uploads/default/original/3X/a/a/aa745548020a507cf4a07051dcd0faa446607840.png"
                alt="Field Image"
                style={{ width: '100%', height: 'auto', display: 'block' }}
                onClick={handleImageClick}
            />

            {pointPositions.map((point, index) => (
                <div
                    key={index}
                    style={{
                        position: 'absolute',
                        left: `${point.x}%`,
                        top: `${point.y}%`,
                        transform: 'translate(-50%, -50%)',
                    }}
                >
                    <div
                        style={{
                            width: '10px',
                            height: '10px',
                            borderRadius: '50%',
                            backgroundColor: point.color === 1 ? 'green' : 'orange',
                            position: 'absolute',
                            transform: 'translate(-50%, -50%)',
                        }}
                    />
                </div>
            ))}

            <button onClick={toggleDotColor} style={{ position: 'absolute', top: '10px', left: '10px', zIndex: '10' }}>
                Change Mode
            </button>

            <button onClick={() => {
                const csvData = exportCSV();
                console.log(csvData);
            }} style={{ position: 'absolute', top: '50px', left: '10px', zIndex: '10' }}>
                Export CSV
            </button>

        </div>
    );
}

export default TeleField;
