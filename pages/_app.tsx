import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ThemeProvider } from "styled-components";
import theme from "@/styles/theme";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>판다마켓</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
