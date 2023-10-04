const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });

const config = process.env;
const deps = [
  "ZM_CLIENT_ID",
  "ZM_CLIENT_SECRET",
  "ZM_REDIRECT_URL",
  "SESSION_SECRET",
];

const zoomApp = {
  host: config.ZM_HOST || "https://zoom.us",
  clientId: config.ZM_CLIENT_ID,
  clientSecret: config.ZM_CLIENT_SECRET,
  redirectUrl: config.ZM_REDIRECT_URL,
  sessionSecret: config.SESSION_SECRET,
};

// Zoom App Info
const appName = config.APP_NAME || "zoom-app";
const redirectUri = zoomApp.redirectUrl;

// HTTP
const port = config.PORT || "3000";

module.exports = {
  appName,
  redirectUri,
  port,
  zoomApp,
  deps,
};
