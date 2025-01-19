import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
    const [message, setMessage] = useState('');
    const [response, setResponse] = useState('');
    const BACKEND_PORT = "http://localhost:8000"
    const ROUTE = "api/message"

    // Function to fetch a message from the backend
    const getMessage = async () => {
        try {
            const res = await axios.get('http://localhost:8000/api/message');
            setMessage(res.data.message);
        } catch (error) {
            console.error('Error fetching message:', error);
        }
    };

    // Function to send data to the backend
    const sendData = async () => {
        try {
            const data = { name: 'John Doe', email: 'john.doe@example.com' };
            const res = await axios.post('http://localhost:8000/api/data', data);
            setResponse(res.data.message);
        } catch (error) {
            console.error('Error sending data:', error);
        }
    };

    return (
        <div>
            <button onClick={getMessage}>Get Message from Backend</button>
            <p>{message}</p>

            <button onClick={sendData}>Send Data to Backend</button>
            <p>{response}</p>
        </div>
    );
};

export default App;
