import QueryProvider from "@/providers/QueryProvider";
import Header from "@/components/ui/Header";
import "./globals.css";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 모든 페이지에 적용되는 레이아웃
  return (
    <html lang="ko">
      <body>
        <Header />
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
