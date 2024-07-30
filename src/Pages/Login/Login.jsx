// src/components/Login/Login.jsx

import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import './Login.css';

function Login() {
    return (
        <div>
            <Navbar />
            <br />
            <LoginForm />
        </div>
    );
}

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });
        const data = await response.json();
        if (data.status === 'success') {
            setMessage(`Welcome, ${data.user.username}! Role: ${data.user.role}`);
        } else {
            setMessage(data.message);
        }
    };

    return (
        <div>
            <h2>Login into your account:</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="UserName">Username:</label><br />
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                /><br />
                <br />
                <label htmlFor="Password">Password:</label><br />
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br />
                <button type="submit">Login</button>
            </form>
            <br />
            {message && <p>{message}</p>}
        </div>
    );
}

export default Login;
