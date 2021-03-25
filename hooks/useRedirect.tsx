import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../context/auth';

/**
 * @param {string} [redirect=router.pathname] - The url to redirect after auth.
 * @param {boolean} [replace=true] - if the url is to be added to history.
 */
const useRedirect = (redirect?: string, replace = true): void => {
  const { user, authLoading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(
    function redirectIfNotLoggedIn() {
      if (authLoading || user != null) return;

      if (replace) {
        router.replace(
          `/sign-in?redirect=${redirect == null ? router.pathname : redirect}`,
          undefined,
          { scroll: false, shallow: true }
        );

        return;
      }
      router.push(
        `/sign-in?redirect=${redirect == null ? router.pathname : redirect}`,
        undefined,
        { scroll: false, shallow: true }
      );
    },
    [user, redirect, router.pathname, router, replace, authLoading]
  );
};

export default useRedirect;
