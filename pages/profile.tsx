import tw, { styled } from 'twin.macro';
import CommentBox from '../components/common/CommentBox';
import LayOut from '../components/common/Layout';
import CommentShowCase from '../components/common/CommentShowCase';
import ShoutOutShowCase from '../components/home/ShoutOutShowCase';
import useRedirect from '../hooks/useRedirect';

const Profile = () => {
  useRedirect();
  return (
    <LayOut>
      <Main>
        {/* <ShoutOutShowCase /> */}
        <section tw="space-y-2">
          <CommentShowCase />
          <CommentShowCase />
        </section>
        <CommentBox />
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
