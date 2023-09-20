const express = require('express');
const axios = require('axios');
const cors = require('cors');  // Import the cors library
const app = express();
const PORT = 8080;

// Use the cors middleware (you can customize this further if needed)
app.use(cors());

app.use(express.json());

app.get("/api/home", async (req, res) => {
    try {
        const fastAPIResponse = await axios.get('http://127.0.0.1:8000/fastapi-endpoint');
        res.json({ 
            message: "Hello World from Express!",
            fastAPI: fastAPIResponse.data
        });
    } catch (error) {
        res.status(500).json({ error: "Error fetching data from FastAPI" });
    }
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});