import { NowRequest, NowResponse } from "@now/node";
import { logger } from "./mw/sentry";
import { query } from "./db/index";
import * as Auth from "./mw/auth";

interface FriendResult {

}

module.exports = async (req: NowRequest, res: NowResponse) => {
    try {
        await logger();
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

        const payload = rows.map((r: any) => r);

        return res.status(200).json({
            payload
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            message: "Something has gone wrong retrieving user details",
            details: e
        });
    }
}