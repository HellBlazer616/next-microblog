/* eslint-disable jsx-a11y/anchor-is-valid */
import { CSSProperties, FC, useContext, useState } from 'react';
import tw, { styled } from 'twin.macro';
import Link from 'next/link';
import {
  HiHashtag,
  HiHome,
  HiOutlineX,
  HiPaperAirplane,
  HiUser,
} from 'react-icons/hi';
import { useTransition, config, animated } from 'react-spring';
import { DialogOverlay, DialogContent } from '@reach/dialog';
import { useIsFetching } from 'react-query';
import '@reach/dialog/styles.css';
import VisuallyHidden from '../misc/VisuallyHidden';
import ShoutOutBox from './ShoutOutBox';
import { AuthContext } from '../../context/auth';

interface CustomCSSProperties extends CSSProperties {
  '--nav-width': string;
  '--footer-height': string;
}

const customCSSVariables: CustomCSSProperties = {
  '--nav-width': '20rem',
  '--footer-height': '4rem',
};

const Loading = () => {
  return (
    <div tw="fixed z-10 right-0 top-0 flex items-center justify-center">
      <svg
        tw="-ml-1 mr-3 w-8 h-8 text-accent-500 animate-spin"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          tw="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          tw="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
  );
};

const LayOut: FC = ({ children }) => {
  const isFetching = useIsFetching();
  const [showMenu, setShowMenu] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const { user, signOut } = useContext(AuthContext);
  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);
  const AnimatedDialogOverlay = animated(DialogOverlay);
  const AnimatedDialogContent = animated(DialogContent);

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

  const showDialogTransition = useTransition(showDialog, null, {
    from: { opacity: 0, transform: `translate3d(0px,-10px,3px)` },
    enter: { opacity: 1, transform: `translate3d(0,0,0)` },
    leave: { opacity: 0, transform: `translate3d(0px,10px,3px)` },
    config: config.stiff,
  });

  return (
    <Page style={customCSSVariables}>
      {isFetching && <Loading />}
      <Aside>
        <div tw="w-full space-y-6">
          <Link passHref href="/home">
            <a className="menu__link">
              <HiHome className="menu__icon" />
              Home
            </a>
          </Link>
          {user != null ? (
            <Link passHref href="/profile">
              <a className="menu__link">
                <HiHashtag className="menu__icon" />
                Profile
              </a>
            </Link>
          ) : null}
        </div>
        <div tw="flex flex-col justify-center space-y-6">
          <AccountButton type="button" tw="px-5 py-2 w-full" onClick={open}>
            <HiPaperAirplane className="menu__icon" />
            <span>Shout out</span>
          </AccountButton>
          {user == null ? (
            <Link passHref href="/sign-in">
              <AccountButton as="a" tw="px-5 py-2 w-full">
                <HiUser className="menu__icon" />
                <span>Sign in</span>
              </AccountButton>
            </Link>
          ) : (
            <AccountButton
              type="button"
              tw="px-5 py-2 w-full"
              onClick={() => signOut()}
            >
              <HiUser className="menu__icon" />
              <span>Sign out</span>
            </AccountButton>
          )}
        </div>
        {showDialogTransition.map(
          ({ item, key, props }) =>
            item && (
              <AnimatedDialogOverlay
                as="div"
                isOpen={showDialog}
                key={key}
                style={{ opacity: props.opacity }}
              >
                <AnimatedDialogContent
                  as="div"
                  tw="relative z-40 mx-auto p-0 w-full text-white bg-transparent sm:w-11/12 xl:w-2/4"
                  style={props}
                  aria-label="compose micro message"
                >
                  <div tw="absolute -top-3 right-0 pr-4 pt-4">
                    <button
                      type="button"
                      tw="text-gray-400 hover:text-gray-500 rounded-md focus:outline-none focus:ring-accent-500 focus:ring-2"
                      onClick={close}
                    >
                      <span tw="sr-only">Close</span>
                      <HiOutlineX tw="w-6 h-6" />
                    </button>
                  </div>
                  <ShoutOutBox />
                </AnimatedDialogContent>
              </AnimatedDialogOverlay>
            )
        )}
      </Aside>

      {children}

      <Footer>
        <div tw="flex items-center h-full space-x-8">
          <Link passHref href="/home">
            <a className="menu__link">
              <VisuallyHidden>Home</VisuallyHidden>
              <HiHome className="menu__icon" />
            </a>
          </Link>

          {user != null ? (
            <Link passHref href="/profile">
              <a className="menu__link">
                <VisuallyHidden>profile</VisuallyHidden>
                <HiHashtag className="menu__icon" />
              </a>
            </Link>
          ) : null}
        </div>
        <div tw="flex items-center justify-center space-x-3">
          <FooterButton type="button" tw="w-full" onClick={open}>
            <VisuallyHidden>Home</VisuallyHidden>
            <HiPaperAirplane className="menu__icon" />
          </FooterButton>
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
                  {user == null ? (
                    <Link href="/sign-in" passHref>
                      <a className="btn" tw="" role="menuitem">
                        Sign in
                      </a>
                    </Link>
                  ) : (
                    <button className="btn" type="button" tw="" role="menuitem">
                      Sign out
                    </button>
                  )}
                </BaseMenu>
              )
          )}
        </div>
      </Footer>
    </Page>
  );
};

const Page = styled.div`
  ${tw`relative min-h-screen text-white bg-primary-500 md:grid-cols-2`}

  & .menu__icon {
    ${tw`w-9 h-9`}
  }
  & .menu__link {
    ${tw`inline-flex justify-center w-full rounded-sm transform-gpu transition`}
    :hover {
      ${tw`text-accent-500`}
    }
  }
`;

const Aside = styled.aside`
  ${tw`fixed left-0 top-0 hidden flex-col justify-between px-20 py-8 h-screen text-white bg-primary-400 lg:flex`}
  width: var(--nav-width);
  & .menu__link {
    ${tw`grid grid-cols-2 items-center px-6 py-2 text-xl hover:bg-primary-300 rounded-full`}
  }
`;

const AccountButton = styled.button`
  ${tw`relative inline-flex items-center px-2 py-2 text-white bg-accent-600 hover:bg-accent-700 border border-transparent rounded-full focus:outline-none shadow-sm space-x-2 focus:ring-accent-500 focus:ring-offset-2 focus:ring-2`}
`;

const BaseMenu = styled(animated.div)`
  ${tw`absolute mt-2 w-24 text-white bg-primary-300 rounded-md focus:outline-none shadow-lg origin-top-right ring-black ring-opacity-5 ring-1`}

  & .btn {
    ${tw`block px-4 py-2 w-full text-left text-sm hover:bg-primary-100 border border-transparent rounded-md outline-none focus:outline-none focus:ring-accent-400 focus:ring-1`}
  }
`;

const Footer = styled.footer`
  ${tw`fixed bottom-0 flex items-center justify-between px-8 w-full bg-primary-400 shadow lg:hidden`}
  height: var(--footer-height);
  & .menu__link {
    ${tw`items-center h-full`}
  }
`;

const FooterButton = styled.button`
  ${tw`inline-flex items-center p-1 text-white bg-accent-600 hover:bg-accent-700 border border-transparent rounded-full focus:outline-none shadow-sm focus:ring-accent-500 focus:ring-offset-primary-200 focus:ring-offset-2 focus:ring-2`}
`;
export default LayOut;
