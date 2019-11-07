import { NowRequest, NowResponse } from "@now/node";
import getEnv from './mw/getEnv';
import Cookies from "cookies";
import * as redis from "./mw/redis";
import * as Auth from "./mw/auth";

function expireCookie(req: NowRequest, res: NowResponse, name: string) {
    const signingKey = getEnv('jwtsigningkey');
    const cookies = new Cookies(req, res, {
        keys: [signingKey]
    });
    console.log("expiring cookie.");
    cookies.set(name);
}


export default async (req: NowRequest, res: NowResponse) => {
    try {
        const result = await Auth.checkToken(req);
        console.log(`Result of authz check: ${result}`)
        if (!result) {
            return res.status(401).json({
                message: "You're not authorized to view this page."
            });
        }

        const token = await Auth.getFromToken(req);
        const loggedout_user = token.user_id;
        console.log(loggedout_user);
        const remainingTime = Math.abs(Math.ceil(Date.now() / 1000) - token.iat);

        const redisResult = await redis.setex(
            loggedout_user,
            remainingTime,
            loggedout_user
        );
        console.log(redisResult);

        expireCookie(req, res, 'login');

        return res.status(200).json({
            path: "logout",
            result: "success",
            message: `Logging out.`
        });
    } catch (e) {
        console.error(`[LOGOUT ISSUE]: ${e.message} |||| ${e.lineNumber} |||| ${e.stack}`);
        return res.status(500).json({
            path: "logout",
            result: "failure",
            message: "Something has gone wrong with the signout.",
            description: e
        });
    }
};
