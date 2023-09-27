require("dotenv").config();

const ZOOM = {
  SDK: {
    KEY: process.env.ZM_SDK_KEY,
    SECRET: process.env.ZM_SECRET_KEY,
  },
};

module.exports = {
  ZOOM,
};
