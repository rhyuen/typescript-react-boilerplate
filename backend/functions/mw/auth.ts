import { NowRequest } from "@now/node";
import { verify } from "jsonwebtoken";
import getEnv from "./getEnv";

export async function checkToken(req: NowRequest): Promise<boolean> {
  try {
    const secret = getEnv('jwtsigningkey');
    const tokenToVerify = req.cookies['login'];
    console.log(`[CheckToken]: Cookie: ${tokenToVerify}`);

    if (!tokenToVerify) {
      console.log("No AuthZ token. Redirecting.");
      return false;
    }

    const result = await verify(tokenToVerify, secret);
    console.log(result);

    if (!result) {
      console.log("Invalid AuthZ token.");
      return false;
    }

    //TODO: add token check by connecting to redis. which has a list of 'loggedout' tokens.
    //TODO: onlogout, add token to redis.

    return true;

  } catch (e) {
    console.log(`[AUTH ERROR] ${e}`);
    return false;
  }
};

export async function getFromToken(req: NowRequest): Promise<any> {
  try {
    const secret = getEnv('jwtsigningkey');
    const tokenToVerify = req.cookies['login'];
    console.info('getfromtoken')
    console.log(tokenToVerify);
    console.log(secret);
    console.info('getfromtoken')
    const result = await verify(tokenToVerify, secret);
    return result;
  } catch (e) {
    console.error(`[GETFROMTOKEN ERROR]: ${e.message}`);
  }
}
