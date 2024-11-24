import Header from "./components/layout/Header";
import "./global.css";

export const metadata = {
  title: "판다마켓",
  description: "판다마켓 메인홈",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
