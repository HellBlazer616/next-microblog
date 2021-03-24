/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { CSSProperties } from 'react';
import tw, { styled } from 'twin.macro';
import LayOut from '../components/common/Layout';

const Home = () => {
  return (
    <LayOut>
      <Main>Hello I am a main</Main>
    </LayOut>
  );
};

const Main = styled.main`
  ${tw`p-4`}
  @media (min-width: 768px) {
    margin-left: calc(var(--nav-width) + 0.5rem);
  }
`;

export default Home;
