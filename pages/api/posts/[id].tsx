import { NextApiRequest, NextApiResponse } from 'next';
import { getPostById } from '../../../server/controller/postController';
import dbConnect from '../../../utils/dbConnect';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req;
  await dbConnect();
  switch (method) {
    case 'GET': {
      try {
        const { id } = query;
        if (typeof id !== 'string') {
          res.status(400).json({ success: false });
          return;
        }
        const post = await getPostById(id);
        if (post == null) {
          res.status(400).json({ success: false });
          return;
        }
        res.status(200).json({
          success: false,
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

    default: {
      res.status(400).json({ success: false });
      break;
    }
  }
};
