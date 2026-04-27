import crypto from "crypto";

const base64UrlEncode = (value) =>
  Buffer.from(JSON.stringify(value)).toString("base64url");

export const signJwt = (payload, secret, expiresInSeconds = 60 * 60 * 24 * 7) => {
  if (!secret) throw new Error("JWT secret is not configured");

  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "HS256", typ: "JWT" };
  const tokenPayload = {
    ...payload,
    iat: now,
    exp: now + expiresInSeconds
  };
  const encodedHeader = base64UrlEncode(header);
  const encodedPayload = base64UrlEncode(tokenPayload);
  const signature = crypto
    .createHmac("sha256", secret)
    .update(`${encodedHeader}.${encodedPayload}`)
    .digest("base64url");

  return `${encodedHeader}.${encodedPayload}.${signature}`;
};
