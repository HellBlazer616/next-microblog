/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { CSSProperties, FC, ReactNode } from 'react';
import tw, { styled } from 'twin.macro';
import Link from 'next/link';
import { HiHashtag, HiHome, HiUser } from 'react-icons/hi';
import VisuallyHidden from '../misc/VisuallyHidden';

interface CustomCSSProperties extends CSSProperties {
  '--nav-width': string;
}

const customCSSVariables: CustomCSSProperties = {
  '--nav-width': '4rem',
};

const LayOut: FC = ({ children }) => {
  return (
    <Page style={customCSSVariables}>
      <Aside>
        <div tw="w-full space-y-6">
          <Link passHref href="/home">
            <a>
              <HiHome className="menu__icon" />
            </a>
          </Link>

          <Link passHref href="/home">
            <a>
              <HiHashtag className="menu__icon" />
            </a>
          </Link>
        </div>
        <div tw="flex items-center justify-center">
          <AccountButton type="button" tw="w-full">
            <HiUser className="menu__icon" />
          </AccountButton>
        </div>
      </Aside>

      {children}

      <Footer>
        <div tw="flex items-center h-full space-x-8">
          <Link passHref href="/home">
            <a>
              <VisuallyHidden>Home</VisuallyHidden>
              <HiHome className="menu__icon" />
            </a>
          </Link>

          <Link passHref href="/home">
            <a>
              <VisuallyHidden>Home</VisuallyHidden>
              <HiHashtag className="menu__icon" />
            </a>
          </Link>
        </div>
        <div tw="flex items-center justify-center">
          <AccountButton type="button" tw="w-full">
            <VisuallyHidden>Home</VisuallyHidden>
            <HiUser className="menu__icon" />
          </AccountButton>
        </div>
      </Footer>
    </Page>
  );
};

const Page = styled.div`
  ${tw`min-h-screen text-white bg-primary-500 md:grid-cols-2`}

  & .menu__icon {
    ${tw`w-8 h-8`}
  }
  a {
    ${tw`inline-flex justify-center w-full rounded-sm transform-gpu transition`}
    :hover {
      ${tw`text-accent-500`}
    }
  }
`;

const Aside = styled.aside`
  ${tw`fixed z-10 left-0 top-0 hidden flex-col items-center justify-between py-8 h-screen text-white bg-primary-400 md:flex`}
  width: var(--nav-width);
`;

const Footer = styled.footer`
  ${tw`fixed bottom-0 flex items-center justify-between px-8 w-full h-16 bg-primary-400 shadow md:hidden`}
  a {
    ${tw`items-center h-full`}
  }
`;

const AccountButton = styled.button`
  ${tw`inline-flex items-center justify-center p-1 text-white bg-accent-600 hover:bg-accent-700 border border-transparent rounded-full focus:outline-none shadow-sm focus:ring-accent-500 focus:ring-offset-2 focus:ring-2`}
`;

export default LayOut;
