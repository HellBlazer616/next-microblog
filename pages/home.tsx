import tw, { styled } from 'twin.macro';
import LayOut from '../components/common/Layout';

const Home = () => {
  return (
    <LayOut>
      <Main>
        <div tw="mx-auto max-w-prose bg-primary-200">Hello</div>
      </Main>
    </LayOut>
  );
};

const Main = styled.main`
  ${tw`p-4`}
  @media (min-width: 1024px) {
    margin-left: calc(var(--nav-width) + 0.5rem);
  }
`;

export default Home;
