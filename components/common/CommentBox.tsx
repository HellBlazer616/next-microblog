import React, { FC, useContext } from 'react';
import tw, { styled } from 'twin.macro';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { Post } from '../../base';
import { AuthContext } from '../../context/auth';

type Input = {
  text: string;
};

type Props = {
  postId?: string;
};

interface Variables extends Input {
  authorId: string;
  postId: string;
}

const CommentBox: FC<Props> = ({ postId }) => {
  const { register, errors, handleSubmit, reset, setError } = useForm<Input>();
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation<Post, any, Variables>(
    (createComment) => axios.post('/api/comment', createComment),
    {
      onSuccess: () => {
        reset();
        queryClient.invalidateQueries(['user', user?.uid]);
        queryClient.invalidateQueries(['posts']);
        queryClient.invalidateQueries(['post', postId]);
      },
    }
  );

  const onSubmit = (formData: Input) => {
    if (postId == null) {
      toast.error('Invalid post');
      return;
    }
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
        postId,
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
