import { NowRequest, NowResponse } from "@now/node";
import getEnv from "./getEnv";
import { verify } from "jsonwebtoken";

module.exports = async (req: NowRequest, res: NowResponse): Promise<boolean> => {
  try {
    const secret = getEnv('jwtsigningkey');
    const tokenToVerify = req.cookies['login'];

    if (!tokenToVerify) {
      console.log("No auth token. Redirecting.");
      return false;
    }

    const result = await verify(tokenToVerify, secret);
    if (!result) {
      console.log("invalid token.");
      return false;
    }
    return true;

  } catch (e) {
    console.log("AUTH ERROR");
    console.log(e);
    console.log("AUTH ERROR END.")
  }
};
