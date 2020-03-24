import { NowRequest, NowResponse } from "@now/node";
import { startSentry } from "./mw/sentry";
import { query } from "./db/index";
import logger from "./mw/logger"
import * as Auth from "./mw/auth";

interface FriendResult {

}

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

        const getFriends = `
            select * 
            from friends            
            where friender_id = $1 or friendee_id = $1;
        `;
        const { rows }: any = await query(getFriends, [user_id]);
        console.log("FRIENDS")
        console.log(rows);

        interface Relationship {
            friender_id: string;
            friendee_id: string;
            accepted: boolean;
            created_at: string;
            last_modified: string;
        }
        const payload = rows.map((r: Relationship) => r);

        return res.status(200).json({
            payload
        });
    } catch (e) {
        logger.error(e);
        return res.status(500).json({
            message: "Something has gone wrong retrieving user details",
            details: e
        });
    }
}