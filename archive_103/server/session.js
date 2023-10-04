// import cookieSession from 'cookie-session';
const cookieSession = require("cookie-session");
// import { zoomApp } from "../config.js";
const { zoomApp } = require("./config");

module.exports = cookieSession({
  name: "session",
  httpOnly: true,
  keys: [zoomApp.sessionSecret],
  maxAge: 24 * 60 * 60 * 1000,
  secure: process.env.NODE_ENV === "production",
});
