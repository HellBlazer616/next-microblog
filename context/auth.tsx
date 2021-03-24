/* eslint-disable @typescript-eslint/no-empty-function */
import firebase from 'firebase/app';
import 'firebase/auth';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { useInterval } from 'react-use';

const firebaseConfig = {
  apiKey: 'AIzaSyBxOWy44OL_a9ewM11EuB8YTifg4oXkoUw',
  authDomain: 'next-micro-blog.firebaseapp.com',
  projectId: 'next-micro-blog',
  storageBucket: 'next-micro-blog.appspot.com',
  messagingSenderId: '391697363011',
  appId: '1:391697363011:web:d82f95d2d40eff24f7e4f6',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

type FirebaseContextType = {
  user: firebase.User | null;
  signOut: (forgot?: boolean) => void;
  signInWithEmailAndPassword: (email: string, password: string) => void;
  authIdToken: string | null;
  authLoading: boolean;
};

const context: FirebaseContextType = {
  user: firebase.auth().currentUser,
  signOut: (forgot?: boolean) => {},
  signInWithEmailAndPassword: () => {},
  authIdToken: null,
  authLoading: false,
};

export const AuthContext = createContext(context);

type Props = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
  const router = useRouter();
  const [authLoading, setAuthLoading] = useState(false);
  const [authIdToken, setAuthIdToken] = useState<null | string>(null);
  const [currentUser, setCurrentUser] = useState(
    () => firebase.auth().currentUser
  );

  const signOut = (forgot?: boolean): void => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        if (!forgot) toast.success('Signed out, come back soon 😀');
      })
      .catch((error) => console.error(error));
  };

  const signInWithEmailAndPassword = async (
    email: string,
    password: string
  ) => {
    setAuthLoading(true);
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCred) => {
        router.push('/home');
        toast.success(
          `Welcome ${
            userCred.user?.displayName == null
              ? 'User'
              : userCred.user.displayName
          }`
        );
      })
      .catch((error) => {
        console.error(error);
        toast.error('Error! Could not sign in user');
      })
      .finally(() => setAuthLoading(false));
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(async (userAuth) => {
      try {
        setCurrentUser(userAuth);
      } catch (error) {
        console.log('could not sign in user');
        console.error(error);
        toast.error(
          'Sign-in process failed. Please make sure you are connected to the internet.'
        );
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(function getIdToken() {
    const unsubscribe = firebase.auth().onIdTokenChanged((userInfo) => {
      if (userInfo != null && typeof window !== 'undefined') {
        userInfo
          .getIdToken()
          .then((token) => {
            // eslint-disable-next-line no-mixed-operators
            const fiftyMinFromNow = Date.now() + 1000 * 60 * 50;
            localStorage.setItem('token-timeOut', String(fiftyMinFromNow));
            setAuthIdToken(token);
          })
          .catch((error) => console.error(error))
          .finally(() => {
            setAuthLoading(false);
          });
      }
    });
    return () => unsubscribe();
  });

  useInterval(() => {
    if (typeof window !== 'undefined' && currentUser != null) {
      try {
        const timeOutString = localStorage.getItem('token-timeOut');
        if (timeOutString != null) {
          const timeOutNumber = Number(timeOutString);
          if (Date.now() >= timeOutNumber) {
            currentUser
              .getIdToken(true)
              .then((token) => {
                setAuthIdToken(token);
                // eslint-disable-next-line no-mixed-operators
                const fiftyMinFromNow = Date.now() + 1000 * 60 * 50;
                localStorage.setItem('token-timeOut', String(fiftyMinFromNow));
              })
              .catch((e) => console.error(e));
          }
        }
      } catch (e) {
        console.error(e);
        toast.error('Could not verify user');
        router.push('sign-in');
      }
    }
  }, 1000 * 60 * 3);

  const defaultContext = {
    user: currentUser,
    signOut,
    authLoading,
    authIdToken,
    signInWithEmailAndPassword,
  };

  return (
    <AuthContext.Provider value={defaultContext}>
      {children}
    </AuthContext.Provider>
  );
};
