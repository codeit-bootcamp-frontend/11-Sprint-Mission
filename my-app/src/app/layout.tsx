"use client";

import { usePathname } from "next/navigation";
import localFont from "next/font/local";
import "./globals.css";
import Header from "./components/Header";

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
  const pathname = usePathname();
  const hiddenPaths = ["/login", "/signup"];
  const showHeader = !hiddenPaths.includes(pathname);
  return (
    <html lang="ko">
      <body className={`${pretendard.className}  antialiased`}>
        {showHeader && <Header />}
        <main className="mt-[72px]">{children}</main>
      </body>
    </html>
  );
}
