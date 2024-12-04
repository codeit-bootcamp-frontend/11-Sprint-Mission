import { ReactNode } from "react";
import type { AppProps } from "next/app";
import type { NextPage } from "next";
import Nav from "@/components/Nav";
import "@/styles/Nav.css";
import "@/styles/globals.css";
import Head from "next/head";

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactNode) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout =
    Component.getLayout ||
    ((page: ReactNode) => (
      <>
        <Nav />
        {page}
      </>
    ));

  return (
    <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {getLayout(<Component {...pageProps} />)}
    </div>
  );
}
