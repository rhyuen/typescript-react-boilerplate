import { NowRequest, NowResponse } from "@now/node";
import { logger } from "./mw/sentry";
const Auth = require("./mw/auth");

module.exports = async (req: NowRequest, res: NowResponse) => {
    try {
        await logger();
        await Auth();
        return res.status(200).json({
            message: "dummy text. yes, it's here."
        })
    } catch (e) {
        console.log("USER DETAILS ERROR");
        console.log(e);
        return res.status(500).json({
            message: "Something has gone wrong retrieving user details",
            details: e
        });
    }
}