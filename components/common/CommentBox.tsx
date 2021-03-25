import React from 'react';
import tw, { styled } from 'twin.macro';
import { useForm } from 'react-hook-form';
import Image from 'next/image';

type Input = {
  text: string;
};

const CommentBox = () => {
  const { register, errors, handleSubmit } = useForm<Input>();

  const onSubmit = (formData: Input) => {
    console.log({ formData });
  };
  return (
    <Wrapper tw="">
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
      <form
        onSubmit={handleSubmit(onSubmit)}
        tw="flex flex-col justify-between space-y-5"
      >
        <label htmlFor="text" tw="sr-only">
          Your message
        </label>
        <textarea
          tw="h-full bg-primary-200 focus:border-accent-400 resize-none focus:ring-accent-400"
          name="text"
          id="text"
          ref={register({
            required: {
              value: true,
              message: 'Please enter you shout out',
            },
            minLength: {
              value: 3,
              message: 'Shout outs must be at least 3 character',
            },
            maxLength: {
              value: 250,
              message: `Shout outs can't be more than 250 characters`,
            },
          })}
        />

        {errors.text && <p tw="text-accent-400">{errors.text.message}</p>}
        <button
          tw="inline-flex self-end px-6 py-2 bg-accent-500 border-transparent rounded-full focus:outline-none focus:ring-accent-500 focus:ring"
          type="submit"
        >
          Comment
        </button>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  ${tw`gap-x-4 mx-auto p-4 max-w-prose h-64 bg-primary-400 rounded-xl shadow-lg`}
  display: grid;
  grid-template-columns: auto 1fr;
`;
export default CommentBox;