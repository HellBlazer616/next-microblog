/* eslint-disable react/jsx-props-no-spreading */
import Router, { AppProps } from "next/dist/next-server/lib/router/router";
import { GlobalStyles } from "twin.macro";
import { Global } from "@emotion/react";
import NProgress from "nprogress";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import { Toaster } from "react-hot-toast";
import { ReactQueryDevtools } from "react-query/devtools";
import "nprogress/nprogress.css";
import { useRef } from "react";
import { AuthProvider } from "../context/auth";
import stylesBase from "../styles/styleBase";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const queryClientRef = useRef<null | QueryClient>(null);
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }

  return (
    <QueryClientProvider client={queryClientRef.current}>
      <AuthProvider>
        <Hydrate state={pageProps.dehydratedState}>
          <GlobalStyles />
          <Global styles={stylesBase} />
          <Component {...pageProps} />
          <Toaster />
        </Hydrate>
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default MyApp;
