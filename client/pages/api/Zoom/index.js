const KJUR = require("jsrsasign");
const { ZOOM } = require("../../../constants/Zoom");

export default function handler(req, res) {
  const iat = Math.round(new Date().getTime / 1000);
  const exp = iat + 60 * 60 * 2;

  const Headers = { alg: "HS256", typ: "JWT" };

  const Payload = {
    sdkKey: ZOOM.SDK.KEY,
    mn: req.body.meetingNumber,
    role: req.body.role,
    iat: iat,
    exp: exp,
  };

  const sHeader = JSON.stringify(Headers);
  const sPayload = JSON.stringify(Payload);

  signature = KJUR.jws.JWS.sign("HS256", sHeader, sPayload, sdkSecret);

  return res.join({
    signature: signature,
    sdkKey: ZOOM.SDK.KEY,
  });
}
