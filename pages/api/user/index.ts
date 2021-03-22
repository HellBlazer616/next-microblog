import { NextApiRequest, NextApiResponse } from 'next';
import {
  CreateUserArgs,
  createUser,
} from '../../../server/controller/UserController';

import dbConnect from '../../../utils/dbConnect';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;
  await dbConnect();
  switch (method) {
    case 'POST': {
      try {
        const bodyData: CreateUserArgs = body;
        if (
          bodyData == null ||
          typeof bodyData.name !== 'string' ||
          typeof bodyData.uid !== 'string'
        ) {
          res.status(400).json({ success: false });
          return;
        }
        const user = await createUser({
          name: bodyData.name,
          uid: bodyData.uid,
        });
        res.status(200).json({ success: true, user });
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
