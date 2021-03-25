import React, { useContext } from 'react';
import tw, { styled } from 'twin.macro';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Comment } from '../../base';
import { AuthContext } from '../../context/auth';

type Input = {
  text: string;
};

type DataType = {
  success: boolean;
  data: {
    comment: Comment[];
  };
};

interface Variables extends Input {
  authorId: string;
}

const ShoutOutBox = () => {
  const { register, errors, handleSubmit, setError, reset } = useForm<Input>();
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation<DataType, any, Variables>(
    (createPost) => axios.post('api/posts', createPost),
    {
      onSuccess: () => {
        reset();
        queryClient.invalidateQueries(['user', user?.uid]);
        queryClient.invalidateQueries(['posts']);
      },
    }
  );

  const onSubmit = (formData: Input) => {
    if (user?.uid == null) {
      setError('text', {
        message: 'Please sign in to comment',
      });
      return;
    }
    toast.promise(
      mutateAsync({
        authorId: user.uid,
        text: formData.text,
      }),
      {
        loading: 'Saving post',
        success: 'Successfully saved post',
        error: 'Could not save post',
      }
    );
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
          tw="inline-flex self-end px-6 py-2 bg-accent-600 hover:bg-accent-700 border-transparent rounded-full focus:outline-none focus:ring-accent-500 focus:ring"
          type="submit"
        >
          Shout out
        </button>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  ${tw`gap-x-4 mx-auto p-4 max-w-prose bg-primary-400 rounded-xl shadow-lg`}
  display: grid;
  grid-template-columns: 50px 1fr;

  textarea {
    min-height: 7rem;
  }
`;
export default ShoutOutBox;
