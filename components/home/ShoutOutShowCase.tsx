import React, { FC, useMemo } from 'react';
import tw, { styled } from 'twin.macro';
import Image from 'next/image';
import {
  HiChat,
  HiDotsCircleHorizontal,
  HiThumbDown,
  HiThumbUp,
} from 'react-icons/hi';
import Link from 'next/link';
import { Post } from '../../base';
import CommentShowCase from '../common/CommentShowCase';
import { formatDate } from '../../util/formatDate';

type Props = {
  post: Post;
};

const ShoutOutShowCase: FC<Props> = ({ post }) => {
  const likedBy = useMemo(() => {
    if (post.likedByUsers == null) return 0;

    return post.likedByUsers.length;
  }, [post.likedByUsers]);

  const dislikedBy = useMemo(() => {
    if (post.likedByUsers == null) return 0;

    return post.likedByUsers.length;
  }, [post.likedByUsers]);

  const commentedBy = useMemo(() => {
    if (post.comments == null) return 0;

    return post.comments.length;
  }, [post.comments]);

  const formattedTime = useMemo(() => formatDate(Date.parse(post.updatedAt)), [
    post.updatedAt,
  ]);
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
              <ShoutOutBoxButton as="a">
                <HiChat />
                <span tw="absolute -right-1 -top-3 inline-flex items-center justify-center w-5 h-5 text-xs bg-accent-500 rounded-full">
                  {commentedBy}
                </span>
              </ShoutOutBoxButton>
            </Link>
            <ShoutOutBoxButton
              type="button"
              onClick={() => console.log('like')}
            >
              <HiThumbUp />
              <span tw="absolute -right-1 -top-3 inline-flex items-center justify-center w-5 h-5 text-sm bg-accent-500 rounded-full">
                {likedBy}
              </span>
            </ShoutOutBoxButton>
            <ShoutOutBoxButton type="button">
              <HiThumbDown />
              <span tw="absolute -right-1 -top-3 inline-flex items-center justify-center w-5 h-5 text-sm bg-accent-500 rounded-full">
                {dislikedBy}
              </span>
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

const ShoutOutBoxButton = styled.button`
  ${tw`relative inline-flex items-center px-3 py-3 text-white text-lg font-medium bg-accent-600 hover:bg-accent-700 border border-transparent rounded-full focus:outline-none shadow-sm focus:ring-accent-500 focus:ring-offset-primary-100 focus:ring-offset-2 focus:ring-2`}
`;
