import Nav from "@/components/Nav";
import type { AppProps } from "next/app";
import "@/styles/Nav.css";
import "@/styles/globals.css";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Nav />
      <Component {...pageProps} />;
    </div>
  );
}
