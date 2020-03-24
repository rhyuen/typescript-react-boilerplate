import { NowRequest, NowResponse } from "@now/node";
import { startSentry } from "./mw/sentry";
import { query } from "./db/index";
import logger from "./mw/logger";
import * as Auth from "./mw/auth";

interface PostResult {
    post_id: string;
    post_name: string;
    post_content: string;
    post_media: string;
    post_create: string;
    post_mod: string;
    comment_id: string;
    comment_user: string;
    comment_content: string;
    comment_create: string;
    comment_mod: string;
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

        const getPersonalPostsWithComments = `
            select 
                p.post_id as post_id,
                p.name as post_name, 
                p.content as post_content, 
                p.medialink as post_media, 
                p.created_at as post_create, 
                p.last_modified as post_mod,
                c.comment_id as comment_id,
                concat(u.first_name, ' ', u.last_name) as comment_user,
                c.content as comment_content, 
                c.created_at as comment_create, 
                c.last_modified as comment_mod
            from posts p
            left join comments c 
            on(p.post_id = c.post_id)
            inner join users u
            on(c.user_id = u.user_id)
            where p.user_id = $1
        `;

        const { rows }: any = await query(getPersonalPostsWithComments, [user_id]);

        //TODO: For each post, get the corresponding comments and append them to the post in a 'comments' field.

        const allcomments = rows.map((r: PostResult) => {
            return {
                post_id: r.post_id,
                post_name: r.post_name,
                post_content: r.post_content,
                post_media: r.post_media,
                post_create: r.post_create,
                comment_id: r.comment_id,
                comment_user: r.comment_user,
                comment_content: r.comment_content,
                comment_create: r.comment_create,
                comment_mod: r.comment_mod
            };
        });

        interface PostWithoutComment {
            post_id: string;
            post_name: string;
            post_content: string;
            post_media: string;
            post_create: string;
        }

        const postsWithoutComments: Array<PostWithoutComment> = allcomments.map((comment: PostResult) => {
            return {
                post_id: comment.post_id,
                post_name: comment.post_name,
                post_content: comment.post_content,
                post_media: comment.post_media,
                post_create: comment.post_create
            };
        });

        const onlyPostIds = postsWithoutComments.map((post: PostWithoutComment) => post.post_id);
        const uniquePostIds = Array.from(new Set(onlyPostIds));

        // let uniquePostsWithoutComments: Array<PostWithoutComment> = [];
        // uniquePostIds.forEach(postId => {
        //     uniquePostsWithoutComments.push(postsWithoutComments.filter((post: PostWithoutComment) => post.post_id == postId)[0]);
        // });

        const uniquePostsWithoutComments: Array<PostWithoutComment> = uniquePostIds.map(postId => {
            return postsWithoutComments.filter((post: PostWithoutComment) => post.post_id == postId)[0];
        });

        interface FormedPost {
            post_id: string;
            post_name: string;
            post_content: string;
            post_media: string;
            post_create: string;
            post_comments: Array<FormedComment>
        }

        interface FormedComment {
            comment_id: string;
            comment_user: string;
            comment_content: string;
            comment_create: string;
            comment_mod: string;
        }

        // let payload: Array<FormedPost> = [];

        // uniquePostsWithoutComments.forEach((post: PostWithoutComment) => {
        //     const currentPostComments = allcomments.filter((comment: PostResult) => comment.post_id === post.post_id)
        //         .map((c: PostResult) => ({
        //             comment_user: c.comment_user,
        //             comment_content: c.comment_content,
        //             comment_create: c.comment_create,
        //             comment_mod: c.comment_mod
        //         }));
        //     payload.push(Object.assign(post, { post_comments: currentPostComments }));
        // });

        const payload: Array<FormedPost> = uniquePostsWithoutComments.map((post: PostWithoutComment) => {
            const currentPostComments = allcomments.filter((comment: PostResult) => comment.post_id === post.post_id)
                .map((c: PostResult) => ({
                    comment_id: c.comment_id,
                    comment_user: c.comment_user,
                    comment_content: c.comment_content,
                    comment_create: c.comment_create,
                    comment_mod: c.comment_mod
                }));
            return Object.assign(post, { post_comments: currentPostComments });
        });

        logger.info(payload);

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