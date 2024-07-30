import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import './MyMatches.css';

function MyMatches() {
    const [matches, setMatches] = useState([]);
    const { user } = useContext(UserContext);

    useEffect(() => {
        if (user) {
            const fetchMatches = async () => {
                const response = await fetch(`http://localhost:5000/matches_assignments?user_id=${user.user_id}`);
                const data = await response.json();
                if (data.status === 'success') {
                    setMatches(data.matches);
                }
            };

            fetchMatches();
        }
    }, [user]);

    return (
        <div>
            <h2>My Matches</h2>
            <table>
                <thead>
                    <tr>
                        <th>Match Number</th>
                        <th>Scouter</th>
                        <th>Alliance</th>
                        <th>Robot</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {matches.map(match => (
                        <tr key={match.match_id}>
                            <td>{match.match_id}</td>
                            <td>{user.username}</td>
                            <td>{match.alliance}</td>
                            <td>{match.robot}</td>
                            <td>
                                <button onClick={() => navigate(`/scout/${match.match_id}`)}>Scout Now</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default MyMatches;
