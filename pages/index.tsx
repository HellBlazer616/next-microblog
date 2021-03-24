/* eslint-disable no-control-regex */
/* eslint-disable jsx-a11y/anchor-is-valid */
import Head from 'next/head';
import tw from 'twin.macro';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { HiLockClosed } from 'react-icons/hi';

interface Inputs {
  email: string;
  password: string;
}

export default function Home() {
  const { register, handleSubmit, errors } = useForm<Inputs>();

  const onSubmit = (formData: Inputs) => {
    console.log({ formData });
  };
  return (
    <div tw="min-h-screen bg-primary-500 text-white flex">
      <div tw="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6  lg:px-20 xl:px-24">
        <div tw="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <div tw="h-12 w-32 relative">
              <Image layout="fill" src="/vercel.svg" alt="Workflow" />
            </div>
            <h2 tw="mt-6 text-3xl font-extrabold text-accent-500">
              Sign in to your account
            </h2>
          </div>

          <div tw="mt-6">
            <form tw="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label
                  htmlFor="email"
                  tw="block text-sm font-medium text-white"
                >
                  Email address
                </label>
                <div tw="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    ref={register({
                      required: {
                        value: true,
                        message: 'Please provide a valid email address',
                      },
                      pattern: {
                        value: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
                        message: 'Please provide a valid email address',
                      },
                    })}
                    tw="appearance-none text-black block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-accent-500 focus:border-accent-500 sm:text-sm"
                  />
                </div>
                {errors.email && (
                  <p tw="text-accent-500">{errors.email.message}</p>
                )}
              </div>

              <div tw="space-y-1">
                <label
                  htmlFor="password"
                  tw="block text-sm font-medium text-white"
                >
                  Password
                </label>
                <div tw="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    ref={register({
                      required: {
                        value: true,
                        message: 'Please enter your password',
                      },
                      minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters',
                      },
                    })}
                    tw="appearance-none text-black block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-accent-500 focus:border-accent-500 sm:text-sm"
                  />
                </div>
                {errors.password && (
                  <p tw="text-accent-500">{errors.password.message}</p>
                )}
              </div>

              <div>
                <button
                  type="submit"
                  tw="relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-accent-600 hover:bg-accent-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-500"
                >
                  <span tw="absolute left-0 inset-y-0 flex items-center pl-3">
                    <HiLockClosed tw="h-5 w-5 text-white hover:text-gray-50" />
                  </span>
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
