import tw, { styled } from 'twin.macro';
import LayOut from '../components/common/Layout';
import ShoutOutBox from '../components/home/ShoutOutBox';
import ShoutOutShowCase from '../components/home/ShoutOutShowCase';
import useRedirect from '../hooks/useRedirect';

const Home = () => {
  useRedirect();
  return (
    <LayOut>
      <Main>
        <ShoutOutBox />
        <ShoutOutShowCase />
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
