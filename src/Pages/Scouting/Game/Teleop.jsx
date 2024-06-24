import React, { useState, useRef } from "react";

function TeleField({ handleCheckboxChange }) {
    const [dotColor, setDotColor] = useState('green');
    const [dotPositions, setDotPositions] = useState([]);
    const imageRef = useRef(null);

    const handleImageClick = (event) => {
        const imageElement = imageRef.current;
        if (!imageElement) return;

        const rect = imageElement.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width * 100;
        const y = (event.clientY - rect.top) / rect.height * 100;

        const position = {
            x,
            y,
            color: dotColor,
        };

        setDotPositions([...dotPositions, position]);
    };

    const toggleDotColor = () => {
        setDotColor(dotColor === 'green' ? 'orange' : 'green');
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

            {dotPositions.map((position, index) => (
                <div
                    key={index}
                    style={{
                        position: 'absolute',
                        left: `${position.x}%`,
                        top: `${position.y}%`,
                        transform: 'translate(-50%, -50%)',
                    }}
                >
                    <div
                        style={{
                            width: '10px',
                            height: '10px',
                            borderRadius: '50%',
                            backgroundColor: position.color,
                        }}
                    />
                </div>
            ))}

            <button onClick={toggleDotColor} style={{ position: 'absolute', top: '10px', left: '10px', zIndex: '10' }}>
                Change Mode
            </button>
        </div>
    );
}

export default TeleField;
