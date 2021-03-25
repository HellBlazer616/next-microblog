import tw, { styled } from 'twin.macro';
import { useQuery } from 'react-query';
import { useContext } from 'react';
import axios from 'axios';
import LayOut from '../components/common/Layout';
import ShoutOutShowCase from '../components/home/ShoutOutShowCase';
import useRedirect from '../hooks/useRedirect';
import { AuthContext } from '../context/auth';
import { Post } from '../base';
import ShoutOutBox from '../components/common/ShoutOutBox';
import MyLoader from '../components/common/MyLoader';

type Props = {
  success: boolean;
  data: {
    posts: Post[];
  };
};

const Profile = () => {
  useRedirect();
  const { user } = useContext(AuthContext);
  const { data, status } = useQuery<Props>(
    ['user', user?.uid],
    async () => {
      const res = await axios.get(`/api/user/posts/${user?.uid}`);
      return res.data;
    },
    {
      enabled: user?.uid != null,
    }
  );
  return (
    <LayOut>
      <Main>
        <ShoutOutBox />
        {status === 'loading' && <MyLoader />}
        {data?.data.posts != null ? (
          data.data.posts.map((post) => {
            return <ShoutOutShowCase post={post} key={post._id} />;
          })
        ) : (
          <div tw="flex items-center justify-center mx-auto max-w-xl h-24 text-base bg-accent-500">
            <p>Write your first post</p>
          </div>
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
export default Profile;
