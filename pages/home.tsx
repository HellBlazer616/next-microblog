import { DocumentType } from '@typegoose/typegoose';
import axios, { AxiosResponse } from 'axios';
import { DocumentDefinition, Types } from 'mongoose';
import { GetStaticProps } from 'next';
import tw, { styled } from 'twin.macro';
import { FC } from 'react';
import { QueryClient, useInfiniteQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import LayOut from '../components/common/Layout';
import ShoutOutBox from '../components/home/ShoutOutBox';
import ShoutOutShowCase from '../components/home/ShoutOutShowCase';
import useRedirect from '../hooks/useRedirect';
import { getPosts } from '../server/controller/postController';
import dbConnect from '../utils/dbConnect';
import { Post } from '../base';

type Props = {
  success: boolean;
  cursor: string;
  data: {
    posts: Post[];
  };
};

const Home = () => {
  useRedirect();

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery<Props>(
    'posts',
    async ({ pageParam = 'FIRST' }) => {
      const res = await axios.get(`/api/posts?cursor=${pageParam}`);
      return res.data;
    },
    {
      getNextPageParam: (firstPage) => {
        const cursor = firstPage.cursor ?? undefined;
        return cursor;
      },
      refetchOnWindowFocus: false,
    }
  );

  return (
    <LayOut>
      <Main>
        <ShoutOutBox />
        <button type="button" onClick={() => fetchNextPage()}>
          Fetch
        </button>
        {data?.pages != null &&
          data.pages.map((page) =>
            page.data.posts.map((post) => (
              <ShoutOutShowCase post={post} key={post._id} />
            ))
          )}
      </Main>
    </LayOut>
  );
};

const Main = styled.main`
  ${tw`p-4 shadow-sm space-y-5`}
  padding-bottom: calc(var(--footer-height) + 1rem);
  @media (min-width: 1024px) {
    margin-left: calc(var(--nav-width) + 0.5rem);
  }
`;

export default Home;
