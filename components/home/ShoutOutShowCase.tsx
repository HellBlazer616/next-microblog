import React from 'react';
import tw, { styled } from 'twin.macro';
import Image from 'next/image';
import { HiChat, HiThumbDown, HiThumbUp } from 'react-icons/hi';

const ShoutOutShowCase = () => {
  return (
    <Wrapper
      onClick={() => console.log('hello')}
      onKeyDown={() => console.log('hello')}
      role="link"
      tabIndex={0}
    >
      <figure>
        <Image
          src="https://placedog.net/70/70"
          width={70}
          height={70}
          objectFit="contain"
          tw="rounded-full"
          alt="your avatar"
        />
      </figure>
      <div tw="space-y-3">
        <span tw="text-accent-500 font-bold">Rifat Hossain</span>
        <div>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus a modi
          hic assumenda quaerat dolore. Similique facere quam eaque
          reprehenderit ab itaque et, tenetur saepe, velit praesentium expedita
          beatae cumque! Lorem ipsum dolor sit amet, consectetur adipisicing
          elit. Minus a modi hic assumenda
        </div>
        <div tw="flex justify-end w-full space-x-10">
          <ShoutOutBoxButton type="button">
            <HiChat />
          </ShoutOutBoxButton>
          <ShoutOutBoxButton type="button">
            <HiThumbUp />
          </ShoutOutBoxButton>
          <ShoutOutBoxButton type="button">
            <HiThumbDown />
          </ShoutOutBoxButton>
        </div>
      </div>
    </Wrapper>
  );
};

export default ShoutOutShowCase;

const Wrapper = styled.div`
  ${tw`gap-x-4 mx-auto p-4 max-w-prose h-60 hover:bg-primary-300 bg-primary-400 rounded-xl shadow-2xl transform-gpu transition`}
  display: grid;
  grid-template-columns: auto 1fr;
`;

const ShoutOutBoxButton = styled.button`
  ${tw`inline-flex items-center px-3 py-3 text-white text-lg font-medium bg-accent-600 hover:bg-accent-700 border border-transparent rounded-full focus:outline-none shadow-sm focus:ring-accent-500 focus:ring-offset-2 focus:ring-2`}
`;
