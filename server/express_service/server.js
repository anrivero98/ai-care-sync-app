const express = require("express"); // Import the express library
const axios = require("axios"); // Import the axios library
const cors = require("cors"); // Import the cors library
const app = express();
const PORT = 8080;

// Use the cors middleware (you can customize this further if needed)
app.use(cors());

app.use(express.json());

app.get("/fetch-status", async (req, res) => {
  try {
    const fastAPIResponse = await axios.get("http://127.0.0.1:8000/status");

    // Construct the response object
    const responseObject = {
      message: "Hello World from Express!",
      fastAPI: fastAPIResponse.data,
    };

    // Print the response object to the console
    console.log("Express:", responseObject);

    // Send the response object to the client
    res.json(responseObject);
  } catch (error) {
    console.error("Error fetching data from FastAPI:", error);
    res.status(500).json({ error: "Error fetching data from FastAPI" });
  }
});

// writing some comments so I can update the git

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

module.exports = app;
