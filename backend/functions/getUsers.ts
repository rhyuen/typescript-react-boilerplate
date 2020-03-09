import { NowRequest, NowResponse } from "@now/node";
import { startSentry } from "./mw/sentry";
import { query } from "./db/index";
import logger from "./mw/logger"
import * as Auth from "./mw/auth";



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

        const getAllUsers = `
            select * from users;
        `;
        const { rows }: any = await query(getAllUsers, []);

        const payload = rows.map((r: any) => r);

        return res.status(200).json({
            payload
        });
    } catch (e) {
        logger.error(e);
        return res.status(500).json({
            message: "Something has gone wrong retrieving all possible friends.",
            details: e
        });
    }
}