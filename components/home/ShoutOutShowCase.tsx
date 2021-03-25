import React, { FC, useContext, useMemo } from 'react';
import tw, { styled } from 'twin.macro';
import Image from 'next/image';
import {
  HiChat,
  HiDotsCircleHorizontal,
  HiThumbDown,
  HiThumbUp,
} from 'react-icons/hi';
import Link from 'next/link';
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Post } from '../../base';
import { formatDate } from '../../util/formatDate';
import { AuthContext } from '../../context/auth';

type Props = {
  post: Post;
};
type Variable = {
  userId: string;
  postId: string;
};
interface LikeVariable extends Variable {
  like: 'TRUE';
}
interface DisLikeVariable extends Variable {
  like: 'FALSE';
}
const ShoutOutShowCase: FC<Props> = ({ post }) => {
  const { user } = useContext(AuthContext);

  const disLikedByCurrentUser = useMemo(() => {
    if (post.disLikedByUsers == null || user?.uid == null) return false;

    const result = post.disLikedByUsers.find(
      (userData) => userData.uid === user.uid
    );
    if (result == null) return false;
    return true;
  }, [post.disLikedByUsers, user?.uid]);

  const likedByCurrentUser = useMemo(() => {
    if (post.likedByUsers == null || user?.uid == null) return false;

    const result = post.likedByUsers.find(
      (userData) => userData.uid === user.uid
    );
    if (result == null) return false;
    return true;
  }, [post.likedByUsers, user?.uid]);

  const commentedByCurrentUser = useMemo(() => {
    if (post.comments == null || user?.uid == null) return false;

    const result = post.comments.find(
      (userData) => userData.authorId === user.uid
    );
    if (result == null) return false;
    return true;
  }, [post.comments, user?.uid]);

  const dislikedBy = useMemo(() => {
    if (post.disLikedByUsers == null) return 0;

    return post.disLikedByUsers.length;
  }, [post.disLikedByUsers]);

  const likedBy = useMemo(() => {
    if (post.likedByUsers == null) return 0;

    return post.likedByUsers.length;
  }, [post.likedByUsers]);

  const commentedBy = useMemo(() => {
    if (post.comments == null) return 0;

    return post.comments.length;
  }, [post.comments]);

  const formattedTime = useMemo(() => formatDate(Date.parse(post.createdAt)), [
    post.createdAt,
  ]);

  const queryClient = useQueryClient();

  const { mutateAsync: likeMutation } = useMutation<Post, any, LikeVariable>(
    (createComment) => axios.put('/api/posts', createComment),
    {
      onSettled: () => {
        queryClient.invalidateQueries(['user', user?.uid]);
        queryClient.invalidateQueries(['posts']);
        queryClient.invalidateQueries(['post', post._id]);
      },
    }
  );
  const { mutateAsync: disLikeMutation } = useMutation<
    Post,
    any,
    DisLikeVariable
  >((createComment) => axios.put('/api/posts', createComment), {
    onSettled: () => {
      queryClient.invalidateQueries(['user', user?.uid]);
      queryClient.invalidateQueries(['posts']);
      queryClient.invalidateQueries(['post', post._id]);
    },
  });

  const likePost = () => {
    if (user == null) {
      toast.error('Please log in before liking post');
      return;
    }
    toast.promise(
      likeMutation({
        userId: user.uid,
        postId: post._id,
        like: 'TRUE',
      }),
      {
        loading: 'Updating',
        success: 'Updated',
        error: 'Could not',
      }
    );
  };

  const disLikePost = () => {
    if (user == null) {
      toast.error('Please log in before liking post');
      return;
    }
    toast.promise(
      disLikeMutation({
        userId: user.uid,
        postId: post._id,
        like: 'FALSE',
      }),
      {
        loading: 'Updating',
        success: 'Updated',
        error: 'Could not',
      }
    );
  };

  const handleLike = () => {
    if (user == null) {
      toast.error('Please log in before liking post');
      return;
    }
    if (
      post.likedByUsers != null &&
      post.likedByUsers.find((userData) => userData.uid === user.uid)
    ) {
      toast.success('You have already liked the post');
      return;
    }
    likePost();
  };

  const handleDisLike = () => {
    if (user == null) {
      toast.error('Please log in before liking post');
      return;
    }
    if (
      post.disLikedByUsers != null &&
      post.disLikedByUsers.find((userData) => userData.uid === user.uid)
    ) {
      toast.success('You have already liked the post');
      return;
    }
    disLikePost();
  };

  return (
    <div tw="mx-auto max-w-prose">
      <Wrapper>
        <figure>
          <Image
            src="https://placedog.net/70/70"
            width={70}
            height={70}
            objectFit="contain"
            tw="rounded-full"
            alt="your avatar"
          />
        </figure>
        <div tw="space-y-4">
          <span tw="text-accent-500 font-bold">
            {post.author.name}{' '}
            <span tw="text-white text-sm font-normal"> {formattedTime}</span>
          </span>
          <div>{post.text}</div>
          <div tw="flex flex-wrap justify-end w-full space-x-10">
            <Link href={`/posts/${post._id}`} passHref>
              <ShoutOutBoxButton as="a" active={commentedByCurrentUser}>
                <HiChat />
                <HoverIcon>{commentedBy}</HoverIcon>
              </ShoutOutBoxButton>
            </Link>
            <ShoutOutBoxButton
              type="button"
              onClick={handleLike}
              active={likedByCurrentUser}
            >
              <HiThumbUp />
              <HoverIcon>{likedBy}</HoverIcon>
            </ShoutOutBoxButton>
            <ShoutOutBoxButton
              type="button"
              onClick={handleDisLike}
              active={disLikedByCurrentUser}
            >
              <HiThumbDown />
              <HoverIcon>{dislikedBy}</HoverIcon>
            </ShoutOutBoxButton>
            <Link href={`/posts/${post._id}`} passHref>
              <ShoutOutBoxButton as="a">
                <HiDotsCircleHorizontal />
              </ShoutOutBoxButton>
            </Link>
          </div>
        </div>
      </Wrapper>
      <section tw="space-y-2">
        {/* <CommentShowCase />
        <CommentShowCase /> */}
      </section>
    </div>
  );
};

export default ShoutOutShowCase;

const Wrapper = styled.div`
  ${tw`gap-x-4 mx-auto p-4 hover:bg-primary-300 bg-primary-400 rounded-xl focus:outline-none shadow-2xl transform-gpu transition focus:ring-accent-500 focus:ring`}
  display: grid;
  grid-template-columns: auto 1fr;
`;

type StyledProps = {
  active?: boolean;
};

const ShoutOutBoxButton = styled.button<StyledProps>`
  ${tw`relative inline-flex items-center mb-3 px-2 py-2 text-base font-medium bg-accent-600 hover:bg-accent-700 border border-transparent rounded-full focus:outline-none shadow-sm focus:ring-accent-500 focus:ring-offset-primary-100 focus:ring-offset-2 focus:ring-2`}

  ${(props) =>
    props.active == null || props.active === false
      ? tw`text-primary-400`
      : tw`text-white`}
`;

const HoverIcon = styled.span`
  ${tw`absolute -right-1 -top-3 inline-flex items-center justify-center w-5 h-5 text-xs bg-accent-500 rounded-full`}
`;
