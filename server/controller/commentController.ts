import { CommentModel } from '../model/Comment';
import { PostModel } from '../model/Post';

type CommentPostArgs = {
  postId: string;
  authorId: string;
  text: string;
};
const commentPost = async ({ postId, authorId, text }: CommentPostArgs) => {
  const comment = await CommentModel.findOneAndUpdate(
    {
      authorId,
      text,
    },
    { authorId, text },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  )
    .lean()
    .exec();

  if (comment == null) {
    throw new Error('Could not find comment');
  }

  const post = await PostModel.findByIdAndUpdate(
    postId,
    {
      $push: { comments: comment._id },
    },
    { new: true }
  )
    .populate('author')
    .populate('comments')
    .populate('likedByUsers')
    .populate('disLikedByUsers')
    .lean()
    .exec();

  if (post == null) {
    throw new Error('Could not save post');
  }

  return post;
};

export { commentPost };
