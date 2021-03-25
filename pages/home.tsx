import axios from 'axios';
import tw, { styled } from 'twin.macro';
import { useInfiniteQuery } from 'react-query';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useMemo } from 'react';
import LayOut from '../components/common/Layout';
import ShoutOutBox from '../components/common/ShoutOutBox';
import ShoutOutShowCase from '../components/home/ShoutOutShowCase';
import useRedirect from '../hooks/useRedirect';

import { Post } from '../base';

type Props = {
  success: boolean;
  cursor: string;
  data: {
    posts: Post[];
  };
};

const EndMessage = () => {
  return (
    <div tw="mt-4 mx-auto max-w-prose bg-accent-600">
      <div tw="mx-auto px-3 py-3 max-w-7xl sm:px-6 lg:px-8">
        <div tw="pr-16 sm:px-16 sm:text-center">
          <p tw="text-white font-medium">
            <span>You have seen all the post 🎉🎉🚀🚀!</span>
          </p>
        </div>
      </div>
    </div>
  );
};

const Loading = () => {
  <span tw="mx-auto max-w-prose">
    <svg
      tw="-ml-1 mr-3 w-5 h-5 text-white animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        tw="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        tw="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  </span>;
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

  const postsLength = useMemo(() => {
    if (data?.pages == null) return 0;

    const len = data.pages.reduce((acc, page) => {
      // eslint-disable-next-line no-param-reassign
      acc += page.data.posts.length;
      return acc;
    }, 0);
    return len;
  }, [data?.pages]);

  return (
    <LayOut>
      <Main>
        <ShoutOutBox />
        {data?.pages != null && (
          <InfiniteScroll
            next={fetchNextPage}
            loader={<div>Loading</div>}
            hasMore={hasNextPage === true}
            dataLength={postsLength}
            endMessage={<EndMessage />}
          >
            <section tw="space-y-10">
              {data.pages.map((page) =>
                page.data.posts.map((post) => (
                  <ShoutOutShowCase post={post} key={post._id} />
                ))
              )}
            </section>
          </InfiniteScroll>
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
