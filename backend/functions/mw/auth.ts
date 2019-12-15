import { NowRequest } from "@now/node";
import { verify } from "jsonwebtoken";
import logger from "./logger"
import getEnv from "./getEnv";

export async function checkToken(req: NowRequest): Promise<boolean> {
  try {
    const secret = getEnv('jwtsigningkey');
    const tokenToVerify = req.cookies['login'];
    logger.info(`[CheckToken]: Cookie: ${tokenToVerify}`);

    if (!tokenToVerify) {
      logger.info("No AuthZ token. Redirecting.");
      return false;
    }

    const result = await verify(tokenToVerify, secret);

    if (!result) {
      logger.info("Invalid AuthZ token.");
      return false;
    }

    //TODO: add token check by connecting to redis. which has a list of 'loggedout' tokens.
    //TODO: onlogout, add token to redis.

    return true;

  } catch (e) {
    logger.error(`[AUTHZ ERROR] ${e}`);
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
    logger.error(`[GETFROMTOKEN ERROR]: ${e.message}`);
  }
}
