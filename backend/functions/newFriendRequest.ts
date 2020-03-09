import { NowRequest, NowResponse } from "@now/node";
import { startSentry } from "./mw/sentry";
import { query } from "./db/index";
import logger from "./mw/logger"
import * as Auth from "./mw/auth";
import { v4 } from "uuid";

module.exports = async (req: NowRequest, res: NowResponse) => {
    try {
        await startSentry();
        const result = await Auth.checkToken(req);
        if (!result) {
            return res.status(401).json({
                message: "You're not authorized to view this page."
            });
        }

        const { user_id } = await Auth.getFromToken(req);

        //TODO: DO THE QUERY FOR THIS.
        const newFriendRequest = `
          
        `;

        const { rows }: any = await query(newFriendRequest, []);

        const payload = rows.map((r: any) => r);

        return res.status(200).json({
            payload
        });
    } catch (e) {
        logger.error(e);
        return res.status(500).json({
            message: "Something has gone wrong with adding the new post..",
            details: e
        });
    }
}