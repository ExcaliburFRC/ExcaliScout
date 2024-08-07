import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Scouting from './Pages/Scouting/Scouting.jsx';
import Login from './Pages/Login/Login.jsx';
import ScoutNav from './Pages/Nav/ScoutNav.jsx';
import PitScouting from './Pages/Scouting/Pit/PitScouting';



function App() {
    return (
        <Router>
            <Routes>
                <Route path="/Scouting" element={<Scouting />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/Scouting/ScoutNav" element={<ScoutNav />} />
                <Route path="/Scouting/PitScouting" element={<PitScouting />} />
            </Routes>
        </Router>
    );
}

export default App;
