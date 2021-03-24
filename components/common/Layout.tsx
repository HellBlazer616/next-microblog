/* eslint-disable jsx-a11y/anchor-is-valid */
import { CSSProperties, FC, useState } from 'react';
import tw, { styled } from 'twin.macro';
import Link from 'next/link';
import { HiHashtag, HiHome, HiOutlineX, HiUser } from 'react-icons/hi';
import { useTransition, config, animated } from 'react-spring';
import { Dialog, DialogOverlay, DialogContent } from '@reach/dialog';
import '@reach/dialog/styles.css';

import VisuallyHidden from '../misc/VisuallyHidden';

interface CustomCSSProperties extends CSSProperties {
  '--nav-width': string;
}

const customCSSVariables: CustomCSSProperties = {
  '--nav-width': '20rem',
};

const LayOut: FC = ({ children }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);

  const showMenuTransition = useTransition(showMenu, null, {
    from: {
      opacity: 0,
      scale: 95,
      transform: `translate3d(0px,10px,3px)`,
    },
    enter: {
      opacity: 1,
      scale: 100,
      transform: `translate3d(0,0,0)`,
    },
    leave: {
      opacity: 0,
      scale: 95,
      transform: `translate3d(0px,10px,3px)`,
    },
    config: config.stiff,
  });

  return (
    <Page style={customCSSVariables}>
      <Aside>
        <div tw="w-full space-y-6">
          <Link passHref href="/home">
            <a>
              <HiHome className="menu__icon" />
              Home
            </a>
          </Link>

          <Link passHref href="/home">
            <a>
              <HiHashtag className="menu__icon" />
              Profile
            </a>
          </Link>
        </div>
        <div tw="flex flex-col justify-center space-y-6">
          <AccountButton type="button" tw="px-6 py-2 w-full" onClick={open}>
            <HiUser className="menu__icon" />
            Tweet
          </AccountButton>
          <AccountButton type="button" tw="px-6 py-2 w-full">
            <HiUser className="menu__icon" />
            Sign out
          </AccountButton>
        </div>
        <Dialog tw="relative text-white bg-primary-300" isOpen={showDialog}>
          <div tw="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
            <button
              type="button"
              tw="text-gray-400 hover:text-gray-500 rounded-md focus:outline-none focus:ring-accent-500 focus:ring-2"
              onClick={close}
            >
              <span tw="sr-only">Close</span>

              <HiOutlineX tw="w-6 h-6" />
            </button>
          </div>
          <p>My text is red because the style prop got applied to the div</p>
        </Dialog>
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
          <FooterButton
            type="button"
            tw="w-full"
            onClick={() => setShowMenu(!showMenu)}
          >
            <VisuallyHidden>Home</VisuallyHidden>
            <HiUser className="menu__icon" />
          </FooterButton>
          {showMenuTransition.map(
            ({ item, key, props }) =>
              item && (
                <BaseMenu
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                  key={key}
                  style={props}
                  tw="bottom-16"
                >
                  <button className="btn" type="button" tw="" role="menuitem">
                    Sign out
                  </button>
                </BaseMenu>
              )
          )}
        </div>
      </Footer>
    </Page>
  );
};

const Page = styled.div`
  ${tw`min-h-screen text-white bg-primary-500 md:grid-cols-2`}

  & .menu__icon {
    ${tw`w-9 h-9`}
  }
  a {
    ${tw`inline-flex justify-center w-full rounded-sm transform-gpu transition`}
    :hover {
      ${tw`text-accent-500`}
    }
  }
`;

const Aside = styled.aside`
  ${tw`fixed z-10 left-0 top-0 hidden flex-col justify-between px-20 py-8 h-screen text-white bg-primary-400 lg:flex`}
  width: var(--nav-width);
  a {
    ${tw`grid grid-cols-2 items-center px-6 py-2 text-xl hover:bg-primary-300 rounded-full`}
  }
`;

const Footer = styled.footer`
  ${tw`fixed bottom-0 flex items-center justify-between px-8 w-full h-16 bg-primary-400 shadow lg:hidden`}
  a {
    ${tw`items-center h-full`}
  }
`;

const AccountButton = styled.button`
  ${tw`relative inline-flex items-center justify-between px-2 py-2 text-white bg-accent-600 hover:bg-accent-700 border border-transparent rounded-full focus:outline-none shadow-sm focus:ring-accent-500 focus:ring-offset-2 focus:ring-2`}
`;

const BaseMenu = styled(animated.div)`
  ${tw`absolute mt-2 w-24 text-white bg-primary-300 rounded-md focus:outline-none shadow-lg origin-top-right ring-black ring-opacity-5 ring-1`}

  & .btn {
    ${tw`block px-4 py-2 w-full text-left text-sm hover:bg-primary-100 border border-transparent rounded-md outline-none focus:outline-none focus:ring-accent-400 focus:ring-1`}
  }
`;

const FooterButton = styled.button`
  ${tw`inline-flex items-center p-1 text-white bg-accent-600 hover:bg-accent-700 border border-transparent rounded-full focus:outline-none shadow-sm focus:ring-accent-500 focus:ring-offset-2 focus:ring-2`}
`;
export default LayOut;
