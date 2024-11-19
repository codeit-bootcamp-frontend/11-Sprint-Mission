import Nav from "@/components/Nav";
import type { AppProps } from "next/app";
import "@/styles/Nav.css";
import "@/styles/common.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Nav />
      <Component {...pageProps} />;
    </div>
  );
}
