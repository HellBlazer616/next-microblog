import tw, { styled } from 'twin.macro';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import toast from 'react-hot-toast';
import CommentBox from '../../components/common/CommentBox';
import LayOut from '../../components/common/Layout';
import CommentShowCase from '../../components/common/CommentShowCase';
import ShoutOutShowCaseWithComment from '../../components/posts/ShoutOutShowCaseWithComment';
import { AuthContext } from '../../context/auth';
import { Post } from '../../base';

type Props = {
  success: boolean;
  data: {
    post?: Post;
  };
};

const PostById = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data } = useQuery<Props>(
    ['post', id],
    async () => {
      const res = await axios.get(`/api/posts/${id}`);
      return res.data;
    },
    {
      enabled: id != null || typeof id === 'string',
      onError: () => {
        toast.error('Post do not exist');
      },
    }
  );

  return (
    <LayOut>
      <Main>
        {data?.data.post != null && (
          <ShoutOutShowCaseWithComment post={data?.data.post} />
        )}

        <CommentBox postId={data?.data.post?._id} />
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

export default PostById;
