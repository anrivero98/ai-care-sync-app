const KJUR = require("jsrsasign");
const { ZOOM } = require("../../../constants/Zoom");

export default function handler(req, res) {
  const iat = Math.round(new Date().getTime() / 1000);
  const exp = iat + 60 * 60 * 2;

  const Header = {
    alg: "HS256",
    typ: "JWT",
  };

  const Payload = {
    sdkKey: ZOOM.SDK.KEY,
    mn: req.body.meetingNumber,
    role: req.body.role,
    iat: iat,
    exp: exp,
  };

  const sHeader = JSON.stringify(Header);
  const sPayload = JSON.stringify(Payload);

  //   console.log("ZOOM SDK SECRET:", ZM.SDK.SECRET);

  const signature = KJUR.jws.JWS.sign(
    "HS256",
    sHeader,
    sPayload,
    ZOOM.SDK.SECRET
  );

  return res.json({
    signature: signature,
    sdkKey: ZOOM.SDK.KEY,
  });
}

function getInstallURL() {
  const state = rand('base64');
  const verifier = rand('ascii');

  const digest = crypto
      .createHash('sha256')
      .update(verifier)
      .digest('base64')
      .toString();

  const challenge = base64URL(digest);

  const url = new URL('/oauth/authorize', zoomApp.host);

  url.searchParams.set('response_type', 'code');
  url.searchParams.set('client_id', zoomApp.clientId);
  url.searchParams.set('redirect_uri', zoomApp.redirectUrl);
  url.searchParams.set('code_challenge', challenge);
  url.searchParams.set('code_challenge_method', 'S256');
  url.searchParams.set('state', state);

  return { url, state, verifier };
}