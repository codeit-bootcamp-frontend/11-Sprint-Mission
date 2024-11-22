import localFont from "next/font/local";
import "./globals.css";
import HeaderContainer from "./components/Header";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${pretendard.className}  antialiased`}>
        <HeaderContainer />
        <main className="mt-[72px]">{children}</main>
      </body>
    </html>
  );
}
