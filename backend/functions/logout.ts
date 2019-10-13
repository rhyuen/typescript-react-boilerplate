import { NowRequest, NowResponse } from "@now/node";
import getEnv from './mw/getEnv';
import Cookies from "cookies";

function expireCookie(req: NowRequest, res: NowResponse, name: string) {
    const signingKey = getEnv('jwtsigningkey');
    const cookies = new Cookies(req, res, {
        keys: [signingKey]
    });
    cookies.set(name);
}


export default async (req: NowRequest, res: NowResponse) => {
    try {
        console.log("Do something with the cookies.");
        console.log(req.cookies);
        expireCookie(req, res, 'login');

        return res.status(200).json({
            path: "logout",
            result: "success",
            message: `Logging out.`
        });
    } catch (e) {
        console.log(`${e.message} |||| ${e.lineNumber} |||| ${e.stack}`);
        return res.status(500).json({
            path: "logout",
            result: "failure",
            message: "Something has gone wrong with the signout.",
            description: e
        });
    }
};
