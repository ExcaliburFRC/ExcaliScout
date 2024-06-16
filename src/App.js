import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Scouting from './Pages/Scouting/Scouting.jsx';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/Scouting" element={<Scouting />} />
            </Routes>
        </Router>
    );
}

export default App;
