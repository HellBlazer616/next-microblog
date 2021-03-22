import { NextApiRequest, NextApiResponse } from 'next';
import {
  createPost,
  disLikePost,
  getPosts,
  likePost,
} from '../../../server/controller/postController';
import dbConnect from '../../../utils/dbConnect';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body, query } = req;
  await dbConnect();

  switch (method) {
    // for initial data we will send cursor = "". For later pages of data we
    // will send the timestamp we got from last post
    case 'GET': {
      try {
        if (typeof query.cursor !== 'string') {
          res.status(400).json({ success: false });
          return;
        }

        let date: string | number = Date.now();

        if (query.cursor !== 'NULL') {
          date = String(query.cursor);
        }

        const posts = await getPosts(new Date(date));
        res.status(200).json({
          success: true,
          data: {
            posts,
          },
        });
        return;
      } catch (error) {
        console.error(error);
        res.status(400).json({ success: false });
      }
      break;
    }
    case 'POST': {
      try {
        const { authorId, text } = body;
        if (typeof authorId !== 'string' || typeof text !== 'string') {
          res.status(400).json({ success: false });
          return;
        }

        const post = await createPost({ authorId, text });

        if (post == null) {
          res.status(400).json({ success: false });
          return;
        }

        res.status(200).json({
          success: true,
          data: {
            post,
          },
        });
      } catch (error) {
        console.error(error);
        res.status(400).json({ success: false });
      }
      break;
    }
    case 'PUT': {
      try {
        const { userId, postId, like } = body;

        if (
          typeof userId !== 'string' ||
          typeof postId !== 'string' ||
          typeof like !== 'string'
        ) {
          res.status(400).json({ success: false });
          return;
        }

        if (like === 'TRUE') {
          const post = await likePost({ userId, postId });
          if (post == null) {
            res.status(400).json({ success: false });
            return;
          }
          res.status(200).json({
            success: true,
            data: {
              post,
            },
          });
          return;
        }

        if (like === 'FALSE') {
          const post = await disLikePost({ userId, postId });
          if (post == null) {
            res.status(400).json({ success: false });
            return;
          }
          res.status(200).json({
            success: true,
            data: {
              post,
            },
          });
          return;
        }

        res.status(400).json({ success: false });
        return;
      } catch (error) {
        console.error(error);
        res.status(400).json({ success: false });
      }
      break;
    }

    default: {
      res.status(400).json({ success: false });
      break;
    }
  }
};
