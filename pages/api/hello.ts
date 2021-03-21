// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next';
import { commentPost } from '../../server/controller/commentController';
import { createPost } from '../../server/controller/postController';
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
        //   text: 'this is a another post',
        // });
        const doc = await commentPost({
          postId: '6056ce1d0cf5059b3809e42f',
          authorId: 'rifath',
          text: 'this is another comment',
        });
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
