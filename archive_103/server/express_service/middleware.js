const KJUR = require("jsrsasign");
require("dotenv").config({ path: "/.env" });

const middleware = {};

middleware.generateToken = (req, res, next) => {
  try {
    let signature = "";
    const iat = Math.round(new Date().getTime() / 1000);
    const exp = iat + 60 * 60 * 2;

    const oHeader = { alg: "HS256", typ: "JWT" };

    const { topic, passWord, userId, sessionKey, roleType } = req.body;
    const sdkKey = process.env.ZM_SDK_KEY;
    const sdkSecret = process.env.ZM_SECRET_KEY;

    const oPayload = {
      app_key: sdkKey,
      iat,
      exp,
      tpc: topic,
      pwd: passWord,
      user_identity: userId,
      sessionKey: sessionKey,
      roleType: roleType,
    };

    const sHeader = JSON.stringify(oHeader);
    const sPayload = JSON.stringify(oPayload);

    signature = KJUR.jws.JWS.sign("HS256", sHeader, sPayload, sdkSecret);

    res.locals.signature = signature;
    return next();
  } catch (err) {
    return next({ err });
  }
};

module.exports = middleware;
