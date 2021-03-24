import Image from 'next/image';
import tw, { styled } from 'twin.macro';
import { useForm } from 'react-hook-form';
import { HiChat, HiThumbDown, HiThumbUp } from 'react-icons/hi';
import LayOut from '../components/common/Layout';
import ShoutOutBox from '../components/home/ShoutOutBox';

type Input = {
  text: string;
};
const Home = () => {
  const { register, errors, handleSubmit } = useForm<Input>();

  const onSubmit = (formData: Input) => {
    console.log({ formData });
  };
  return (
    <LayOut>
      <Main>
        <ShoutOutBox />
        <ShoutOutShowCase
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
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus a
              modi hic assumenda quaerat dolore. Similique facere quam eaque
              reprehenderit ab itaque et, tenetur saepe, velit praesentium
              expedita beatae cumque! Lorem ipsum dolor sit amet, consectetur
              adipisicing elit. Minus a modi hic assumenda
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
        </ShoutOutShowCase>
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

const ShoutOutShowCase = styled.div`
  ${tw`gap-x-4 mx-auto p-4 max-w-prose h-60 hover:bg-primary-300 bg-primary-400 rounded-xl shadow-2xl transform-gpu transition`}
  display: grid;
  grid-template-columns: auto 1fr;
`;

const ShoutOutBoxButton = styled.button`
  ${tw`inline-flex items-center px-3 py-3 text-white text-lg font-medium bg-accent-600 hover:bg-accent-700 border border-transparent rounded-full focus:outline-none shadow-sm focus:ring-accent-500 focus:ring-offset-2 focus:ring-2`}
`;

export default Home;
