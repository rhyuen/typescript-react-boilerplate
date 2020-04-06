import { NowRequest, NowResponse } from "@now/node";
import { startSentry } from "./mw/sentry";
import { query } from "./db/index";
import logger from "./mw/logger";
import * as Auth from "./mw/auth";

interface UnprocessedPost {
    post_id: string;
    post_name: string;
    post_content: string;
    post_media: string;
    post_created_at: string;
    post_modified_at: string;
    comment_id: string;
    comment_username: string;
    comment_content: string;
    comment_created_at: string;
    comment_modified_at: string;
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
        const getPersonalPostsWithComments1 = `
            select 
                p.post_id as post_id,
                p.name as post_name, 
                p.content as post_content, 
                p.medialink as post_media, 
                p.created_at as post_created_at, 
                p.last_modified as post_modified_at,
                c.comment_id as comment_id,
                concat(u.first_name, ' ', u.last_name) as comment_username,
                c.content as comment_content, 
                c.created_at as comment_created_at, 
                c.last_modified as comment_modified_at
            from users u
            inner join posts p
            on(u.user_id = p.user_id)
            left join comments c
            on(p.post_id = c.post_id)
            where u.user_id = $1
        `;

        const getPersonalPostsWithComments = `
            select 
                p.post_id as post_id,
                p.name as post_name, 
                p.content as post_content, 
                p.medialink as post_media, 
                p.created_at as post_created_at, 
                p.last_modified as post_modified_at,
                c.comment_id as comment_id,
                concat(u.first_name, ' ', u.last_name) as comment_username,
                c.content as comment_content, 
                c.created_at as comment_created_at, 
                c.last_modified as comment_modified_at
            from posts p
            left join comments c 
            on(p.post_id = c.post_id)
            left join users u
            on(c.user_id = u.user_id)
            where p.user_id = $1
        `;

        const { rows }: any = await query(getPersonalPostsWithComments, [user_id]);

        const allcomments = rows.map((r: UnprocessedPost) => {
            return {
                post_id: r.post_id,
                post_name: r.post_name,
                post_content: r.post_content,
                post_media: r.post_media,
                post_created_at: r.post_created_at,
                comment_id: r.comment_id,
                comment_username: r.comment_username,
                comment_content: r.comment_content,
                comment_created_at: r.comment_created_at,
                comment_modified_at: r.comment_modified_at
            };
        });

        interface PostWithoutComment {
            post_id: string;
            post_name: string;
            post_content: string;
            post_media: string;
            post_created_at: string;
        }

        const postsWithoutComments: Array<PostWithoutComment> = allcomments.map((comment: UnprocessedPost) => {
            return {
                post_id: comment.post_id,
                post_name: comment.post_name,
                post_content: comment.post_content,
                post_media: comment.post_media,
                post_created_at: comment.post_created_at
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
            post_created_at: string;
            post_comments: Array<FormedComment>
        }

        interface FormedComment {
            comment_id: string;
            comment_username: string;
            comment_content: string;
            comment_created_at: string;
            comment_modified_at: string;
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
            const relevantComments = allcomments
                .filter((comment: UnprocessedPost) => comment.post_id === post.post_id);



            const currentPostComments = relevantComments[0].comment_id === null ? [] : relevantComments.map((c: UnprocessedPost) => {

                return {
                    comment_id: c.comment_id,
                    comment_username: c.comment_username,
                    comment_content: c.comment_content,
                    comment_created_at: c.comment_created_at,
                    comment_modified_at: c.comment_modified_at
                };
            });

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

async function nestCommentsIntoPosts() {
    return [];
}