import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FastAPIChecker: React.FC = () => {
    const [apiResponse, setApiResponse] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        // Adjust the URL as per your FastAPI endpoint
        axios.get('http://127.0.0.1:8000/status')
            .then(response => {
                setApiResponse(response.data.status);
                setLoading(false);  // Update loading state here
            })
            .catch(error => {
                console.error("Error Object:", error);
                console.error("Error Details:", error.response);
                setApiResponse('Error fetching data from FastAPI.');
                setLoading(false);  // Update loading state here
            });

    }, []);

    return (
        <div>
            <h1>FastAPI Status</h1>
            {loading ? <p>Loading...</p> : <p>{apiResponse}</p>}
        </div>
    );
}

export default FastAPIChecker;
