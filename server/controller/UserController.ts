import { UserModel } from '../model/User';

export type CreateUserArgs = {
  uid: string;
  name: string;
};
const createUser = async ({ uid, name }: CreateUserArgs) => {
  const doc = await UserModel.create({
    uid,
    name,
  });
  return doc;
};

export { createUser };
