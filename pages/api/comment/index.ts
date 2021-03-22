import { NextApiRequest, NextApiResponse } from 'next';
import { commentPost } from '../../../server/controller/commentController';
import dbConnect from '../../../utils/dbConnect';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;
  await dbConnect();
  switch (method) {
    case 'POST': {
      try {
        const { postId, authorId, text } = body;
        if (
          typeof postId !== 'string' ||
          typeof authorId !== 'string' ||
          typeof text !== 'string'
        ) {
          res.status(400).json({ success: false });
          return;
        }
        const comment = await commentPost({ postId, authorId, text });
        if (comment == null) {
          res.status(400).json({ success: false });
          return;
        }

        res.status(200).json({
          success: true,
          data: {
            comment,
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
