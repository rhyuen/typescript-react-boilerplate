import { NowRequest, NowResponse } from "@now/node";
import { logger } from "./mw/sentry";
const Auth = require("./mw/auth");

module.exports = async (req: NowRequest, res: NowResponse) => {
    try {
        await logger();
        const result = await Auth(req, res);
        if (!result) {
            return res.status(401).json({
                message: "You're not authorized to view this page."
            });
        }
        return res.status(200).json({
            message: "You've hit the UserDetails Endpoint."
        })
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            message: "Something has gone wrong retrieving user details",
            details: e
        });
    }
}