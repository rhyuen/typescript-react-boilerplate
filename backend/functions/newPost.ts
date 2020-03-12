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

        const { text, title } = req.body;

        const getPageID = `
            select page_id 
            from pages
            where creator_id = $1 and personal=true
        `;
        const { rows: { page_id: currentPageId } }: any = await query(getPageID, [user_id]);


        const newPost = `
            insert into posts (post_id, user_id, page_id, name, medialink, content) 
            values ($1, $2, $3, $4, $5, $6)
            returning *
        `;

        const { rows }: any = await query(newPost, [v4(), user_id, currentPageId, title, "medialink blah", text]);

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