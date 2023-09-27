require("dotenv").config();

export default function handler(req, res) {
  res.json({
    key: process.env.ZM_SDK_KEY,
    secret: process.env.ZM_SECRET_KEY,
  });
}
