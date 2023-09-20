import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MAX_RETRIES = 3;  // For example, you might want to try 3 times
const RETRY_INTERVAL = 3000;  // 5 seconds
const TIMEOUT_INTERVAL = 6000

interface AxiosError {
    code?: string;
    response?: {
        data: any;
        status: number;
        headers: any;
    };
    // You can add more properties as required...
}

function isAxiosError(error: any): error is AxiosError {
    return error && typeof error === 'object' && 'code' in error;
}

const ServerStatusChecker: React.FC = () => {
    const [apiResponse, setApiResponse] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchData = async (retryCount: number = 0) => {
        try {
            const response = await axios.get('http://localhost:8080/fetch-status', {
                timeout: TIMEOUT_INTERVAL
            });
            // Assuming your Express route returns data under a property named "fastAPI"
            setApiResponse(response.data.fastAPI.status);
            setLoading(false);
        } catch (error) {
            if (isAxiosError(error) && error.code === 'ECONNABORTED' && retryCount < MAX_RETRIES) {
                console.error(`Request timed out. Retrying (${retryCount + 1}/${MAX_RETRIES})...`);
                setTimeout(() => fetchData(retryCount + 1), RETRY_INTERVAL);
            } else if (isAxiosError(error) && error.code === 'ECONNABORTED') {
                console.error("Max retries reached. Giving up.");
                setApiResponse('Server timeout');
                setLoading(false);
            } else {
                console.error("Error Object:", error as any);
                if (typeof error === 'object' && error !== null && 'response' in error) {
                    console.error("Error Details:", error.response);
                }
                setApiResponse('Error fetching data from Express/FastAPI.');
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        fetchData(); // Initiate the data fetch when the component mounts
    }, []); // Empty dependency array ensures this runs once when the component mounts


    return (
        <div>
            <h1>Server Status</h1>
            {loading ? <p>Loading...</p> : <p>{apiResponse}</p>}
        </div>
    );
}

export default ServerStatusChecker;
