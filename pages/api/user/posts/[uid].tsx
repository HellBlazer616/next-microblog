import { NextApiRequest, NextApiResponse } from 'next';
import { getUsersPost } from '../../../../server/controller/postController';
import dbConnect from '../../../../utils/dbConnect';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req;
  await dbConnect();
  switch (method) {
    case 'GET': {
      try {
        const { uid } = query;
        if (typeof uid !== 'string') {
          res.status(400).json({ success: false });
          return;
        }
        const posts = await getUsersPost(uid);
        res.status(200).json({
          success: true,
          data: {
            posts,
          },
        });
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
