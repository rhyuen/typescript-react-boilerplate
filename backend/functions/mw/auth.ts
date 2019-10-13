import { NowRequest } from "@now/node";
import { verify } from "jsonwebtoken";
import getEnv from "./getEnv";

export async function checkToken(req: NowRequest): Promise<boolean> {
  try {
    const secret = getEnv('jwtsigningkey');
    const tokenToVerify = req.cookies['login'];

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

    return true;

  } catch (e) {
    console.log(`[AUTH ERROR] ${e}`);
    return false;
  }
};

export async function getFromToken(req: NowRequest): Promise<any> {
  const secret = getEnv('jwtsigningkey');
  const tokenToVerify = req.cookies['login'];
  const result = await verify(tokenToVerify, secret);
  return result;
}
