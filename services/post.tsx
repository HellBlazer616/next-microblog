import { useInfiniteQuery, useMutation } from 'react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { CreateUserArgs } from '../server/controller/UserController';

type ResponseType = {
  success: boolean;
  data: {
    _id: string;
    uid: string;
    name: string;
    __v: number;
  };
};

type ErrorType = {
  success: boolean;
};
const useGetPostsKey = 'posts';
const useGetPosts = (cursor = 'FIRST') => {
  return useInfiniteQuery<AxiosResponse<ResponseType>, AxiosError<ErrorType>>(
    useGetPostsKey,
    () => axios.get(`api/posts?cursor=${cursor}`)
  );
};

useGetPosts.key = () => useGetPostsKey;
export { useGetPosts };
