const config = process.env;
const deps = [
  "ZM_CLIENT_ID",
  "ZM_CLIENT_SECRET",
  "ZM_REDIRECT_URL",
  "SESSION_SECRET",
];

export const zoomApp = {
  host: config.ZM_HOST || "https://zoom.us",
  clientId: config.ZM_CLIENT_ID,
  clientSecret: config.ZM_CLIENT_SECRET,
  redirectUrl: config.ZM_REDIRECT_URL,
  sessionSecret: config.SESSION_SECRET,
};

// Zoom App Info
export const appName = config.APP_NAME || "zoom-app";
export const redirectUri = zoomApp.redirectUrl;

// HTTP
export const port = config.PORT || "3000";

// require secrets are explicitly imported
export default {
  appName,
  redirectUri,
  port,
};
