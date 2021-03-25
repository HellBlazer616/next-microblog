/* eslint-disable no-control-regex */
/* eslint-disable jsx-a11y/anchor-is-valid */
import tw from 'twin.macro';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { HiLockClosed } from 'react-icons/hi';
import { useContext } from 'react';
import Link from 'next/link';
import { AuthContext } from '../context/auth';

interface Inputs {
  email: string;
  password: string;
}

export default function Home() {
  const { register, handleSubmit, errors } = useForm<Inputs>();
  const { authLoading, signInWithEmailAndPassword } = useContext(AuthContext);
  const onSubmit = (formData: Inputs) => {
    signInWithEmailAndPassword(formData.email, formData.password);
  };
  return (
    <div tw="flex min-h-screen text-white bg-primary-500">
      <div tw="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:px-20 xl:px-24">
        <div tw="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <div tw="relative w-32 h-12">
              <Image layout="fill" src="/vercel.svg" alt="Workflow" />
            </div>
            <h2 tw="mt-6 text-accent-500 text-3xl font-extrabold">Sign in</h2>
          </div>

          <div tw="mt-6">
            <form tw="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label
                  htmlFor="email"
                  tw="block text-white text-sm font-medium"
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
                    tw="placeholder-gray-400 block px-3 py-2 w-full text-black border focus:border-accent-500 border-gray-300 rounded-md focus:outline-none shadow-sm appearance-none focus:ring-accent-500 sm:text-sm"
                  />
                </div>
                {errors.email && (
                  <p tw="text-accent-500">{errors.email.message}</p>
                )}
              </div>

              <div tw="space-y-1">
                <label
                  htmlFor="password"
                  tw="block text-white text-sm font-medium"
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
                    tw="placeholder-gray-400 block px-3 py-2 w-full text-black border focus:border-accent-500 border-gray-300 rounded-md focus:outline-none shadow-sm appearance-none focus:ring-accent-500 sm:text-sm"
                  />
                </div>
                {errors.password && (
                  <p tw="text-accent-500">{errors.password.message}</p>
                )}
              </div>

              <div tw="flex items-center justify-end">
                <div tw="text-sm">
                  <Link passHref href="/sign-up">
                    <a tw="text-right hover:text-accent-500 text-white font-medium">
                      Do not have an account? Sign up
                    </a>
                  </Link>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  tw="relative flex justify-center px-4 py-2 w-full text-white text-sm font-medium bg-accent-600 hover:bg-accent-700 border border-transparent rounded-md focus:outline-none focus:ring-accent-500 focus:ring-offset-2 focus:ring-2"
                >
                  {authLoading === false ? (
                    <span tw="absolute inset-y-0 left-0 flex items-center pl-3">
                      <HiLockClosed tw="w-5 h-5 hover:text-gray-50 text-white" />
                    </span>
                  ) : (
                    <span tw="absolute inset-y-0 left-0 flex items-center pl-3">
                      <svg
                        tw="-ml-1 mr-3 w-5 h-5 text-white animate-spin"
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
                    </span>
                  )}
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
