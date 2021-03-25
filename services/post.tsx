import { useMutation } from 'react-query';
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

const useGetPosts = ({ uid, name }: CreateUserArgs) => {
  return useMutation<AxiosResponse<ResponseType>, AxiosError<ErrorType>>(
    'createUser',
    () =>
      axios.post('api/user', {
        uid,
        name,
      })
  );
};
export { useGetPosts };
