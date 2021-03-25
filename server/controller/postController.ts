import { PostModel } from '../model/Post';

export type CreatePostArgs = {
  authorId: string;
  text: string;
};

const createPost = async ({ authorId, text }: CreatePostArgs) => {
  await PostModel.create<any>({
    authorId,
    text,
  });
  const post = await PostModel.findOne({ authorId, text })
    .populate('author')
    .lean()
    .exec();
  return post;
};

const getPosts = async (cursor: Date) => {
  const posts = await PostModel.find({ createdAt: { $lt: cursor } })
    .sort({ createdAt: -1 })
    .limit(2)
    .populate('author')
    .populate('comments')
    .populate('likedByUsers')
    .populate('disLikedByUsers')
    .lean()
    .exec();

  return posts;
};

export type getPostByIdArgs = string;
const getPostById = async (id: getPostByIdArgs) => {
  const post = await PostModel.findById(id)
    .populate('author')
    .populate('comments')
    .populate('likedByUsers')
    .populate('disLikedByUsers')
    .lean()
    .exec();

  return post;
};

export type getUsersPostArgs = string;
const getUsersPost = async (uid: getUsersPostArgs) => {
  const post = await PostModel.find({ authorId: uid })
    .populate('author')
    .populate('comments')
    .populate('likedByUsers')
    .populate('disLikedByUsers')
    .lean()
    .exec();

  return post;
};

export type LikePostArgs = {
  userId: string;
  postId: string;
};
const likePost = async ({ userId, postId }: LikePostArgs) => {
  const post = await PostModel.findByIdAndUpdate(
    postId,
    {
      $addToSet: { likedByUsersId: userId },
      $pull: { disLikedByUsersId: userId },
    },
    { new: true }
  )
    .populate('author')
    .populate('comments')
    .populate('likedByUsers')
    .populate('disLikedByUsers')
    .lean()
    .exec();
  return post;
};

export type DisLikePostArgs = {
  userId: string;
  postId: string;
};
const disLikePost = async ({ userId, postId }: DisLikePostArgs) => {
  const post = await PostModel.findByIdAndUpdate(
    postId,
    {
      $addToSet: { disLikedByUsersId: userId },
      $pull: { likedByUsersId: userId },
    },
    { new: true }
  )
    .populate('author')
    .populate('comments')
    .populate('likedByUsers')
    .populate('disLikedByUsers')
    .lean()
    .exec();
  return post;
};

export {
  createPost,
  getPostById,
  likePost,
  disLikePost,
  getPosts,
  getUsersPost,
};
