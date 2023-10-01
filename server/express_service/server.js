// import { handleError, sanitize } from "../helpers/routing.js";
const { handleError, sanitize } = require("../helpers/routing.js");
const { contextHeader, getAppContext } = require("../helpers/cipher.js");
// import { contextHeader, getAppContext } from "../helpers/cipher.js";
const { getInstallURL } = require("../helpers/zoom-api.js");
// import { getInstallURL } from "../helpers/zoom-api.js";
// import session from "../session.js";
const session = require("../session.js");

require("dotenv").config({ path: "/.env" });
const express = require("express"); // Import the express library
const axios = require("axios"); // Import the axios library
const cors = require("cors"); // Import the cors library
const app = express();
const PORT = 8080;

const router = express.Router();

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
  console.log("ZM_SDK_KEY:", process.env.ZM_SDK_KEY);
});

/*
 * Home Page - Zoom App Launch handler
 * this route is used when a user navigates to the deep link
 */
router.get("/", async (req, res, next) => {
  try {
    sanitize(req);

    const header = req.header(contextHeader);

    const isZoom = header && getAppContext(header);
    // const isZoom = false;
    console.log(isZoom);
    const name = isZoom ? "Zoom" : "Browser";

    return res.render("index", {
      isZoom,
      title: `Hello ${name}`,
    });
  } catch (e) {
    console.log(e);
    next(handleError(e));
  }
});

/*
 * Install Route - Install the Zoom App from the Zoom Marketplace
 * this route is used when a user installs the app from the Zoom Client
 */
app.get("/install", session, async (req, res) => {
  const { url, state, verifier } = getInstallURL();

  // console.log(state);
  // console.log(verifier);
  // req.state = state;
  // req.session.verifier = verifier;
  // console.log(req);
  res.redirect(url.href);
});

module.exports = app;
