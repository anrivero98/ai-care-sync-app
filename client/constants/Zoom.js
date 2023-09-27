const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });

// Rest of the code...
// console.log(process.env.ZM_SDK_KEY);
// console.log(process.env.ZM_SECRET_KEY);

module.exports = {
  ZOOM: {
    SDK: {
      KEY: process.env.ZM_SDK_KEY,
      SECRET: process.env.ZM_SECRET_KEY,
    },
  },
};
