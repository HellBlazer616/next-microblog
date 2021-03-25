import tw, { styled } from 'twin.macro';
import CommentBox from '../../components/common/CommentBox';
import LayOut from '../../components/common/Layout';
import ShoutOutShowCase from '../../components/home/ShoutOutShowCase';

const PostById = () => {
  return (
    <LayOut>
      <Main>
        <ShoutOutShowCase />
        <CommentBox />
      </Main>
    </LayOut>
  );
};

const Main = styled.main`
  ${tw`p-4 shadow-sm space-y-5`}
  @media (min-width: 1024px) {
    margin-left: calc(var(--nav-width) + 0.5rem);
  }
`;

export default PostById;
