import { PostModel } from '../model/Post';

type CreatePostProps = {
  authorId: string;
  text: string;
};

const createPost = async ({ authorId, text }: CreatePostProps) => {
  await PostModel.create<any>({
    authorId,
    text,
  });
  const post = await PostModel.findOne({ authorId })
    .populate('author')
    .lean()
    .exec();
  return post;
};

const getPostById = async (id: string) => {
  const post = await PostModel.findById(id)
    .populate('author')
    .populate('comments')
    .populate('likedByUsers')
    .populate('disLikedByUsers')
    .lean()
    .exec();

  return post;
};

type LikePostArgs = {
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

type DisLikePostArgs = {
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

export { createPost, getPostById, likePost, disLikePost };
