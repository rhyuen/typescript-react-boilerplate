import { NowRequest, NowResponse } from "@now/node";
import { startSentry } from "./mw/sentry";
import { query } from "./db/index";
import logger from "./mw/logger";
import * as Auth from "./mw/auth";

interface PostResult {
    name: string;
    content: string;
    created_at: Date;
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



        const getPersonalPosts = `
            select name, content, created_at 
            from posts            
            where user_id = $1
        `;
        const { rows }: any = await query(getPersonalPosts, [user_id]);

        const payload = rows.map((r: PostResult) => {
            return {
                name: r.name,
                content: r.content,
                created_at: r.created_at
            };
        });

        return res.status(200).json({
            payload
        })
    } catch (e) {
        logger.error(e);
        return res.status(500).json({
            message: "Something has gone wrong retrieving user details",
            details: e
        });
    }
}