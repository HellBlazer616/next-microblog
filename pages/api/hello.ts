// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next';
import { commentPost } from '../../server/controller/commentController';
import {
  createPost,
  disLikePost,
  getPosts,
  likePost,
} from '../../server/controller/postController';
import { UserModel } from '../../server/model/User';
import dbConnect from '../../utils/dbConnect';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  await dbConnect();
  switch (method) {
    case 'POST': {
      try {
        // const doc = await UserModel.create({
        //   uid: 'rifath',
        //   name: 'rifat',
        // });
        // const doc = await createPost({
        //   authorId: 'rifath',
        //   text: 'this is a 5th post',
        // });
        // const doc = await commentPost({
        //   postId: '6056d2d66fabcba6bce5db3c',
        //   authorId: 'rifath',
        //   text: 'this is another comment',
        // });
        // const doc = await likePost({
        //   userId: 'rifat',
        //   postId: '6056d2d66fabcba6bce5db3c',
        // });
        // const doc = await disLikePost({
        //   userId: 'rifath',
        //   postId: '6056d2d66fabcba6bce5db3c',
        // });
        const doc = await getPosts(new Date('2021-03-21T10:43:41.592Z'));
        res.status(200).json({ success: true, post: doc });
      } catch (error) {
        console.error(error);
        res.status(400).json({ success: false });
      }
      break;
    }

    default:
      res.status(400).json({ success: false });
      break;
  }
};
