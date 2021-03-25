import axios from 'axios';
import tw, { styled } from 'twin.macro';
import { useInfiniteQuery } from 'react-query';
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

const Home = () => {
  useRedirect();

  const { data, fetchNextPage } = useInfiniteQuery<Props>(
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
