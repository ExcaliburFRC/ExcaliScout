import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login/Login';
import MyMatches from './Pages/MyMatches/MyMatches';
import ScoutingForm from './Pages/Scouting/Scouting';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/my-matches" element={<MyMatches />} />
                <Route path="/scout/:match_id" element={<ScoutingForm />} />
            </Routes>
        </Router>
    );
}

export default App;
