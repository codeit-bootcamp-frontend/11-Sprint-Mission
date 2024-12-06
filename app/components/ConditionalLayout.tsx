"use client";

import { usePathname } from "next/navigation";
import Header from "./layout/Header";

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  if (pathname === "/login" || pathname === "signup") {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      {children}
    </>
  );
}
