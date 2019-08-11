import { NowRequest, NowResponse } from "@now/node";
import * as Sentry from "@sentry/node";
import * as jwt from "jsonwebtoken";

export default async (req: NowRequest, res: NowResponse) => {
  const { sentrydsn, jwtsigningkey } = process.env;
  Sentry.init({ dsn: sentrydsn });
  const { email, password } = req.body;
  const payload = { message: "I am a payload" };
  const token = await jwt.sign(payload, jwtsigningkey);
  res.status(200).json({
    message: `Your email is '${email}' and your password is '${password}'.`,
    token: token
  });
};
