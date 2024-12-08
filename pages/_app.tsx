import Container from "@/components/layout/Container";
import Header from "@/components/layout/Header";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
// import Layout from "../components/Layout/Layout";
// import { ThemeProvider } from "styled-components";
// import theme from "@/styles/theme";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>판다마켓</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <ThemeProvider theme={theme}> */}
      <Header />
      <Container>
        <Component {...pageProps} />
      </Container>
      {/* </ThemeProvider> */}
    </>
  );
}
