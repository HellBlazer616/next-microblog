import { CommentModel } from '../model/Comment';
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

export { createPost, getPostById };
