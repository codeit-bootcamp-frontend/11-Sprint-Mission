import "./global.css";
import ConditionalLayout from "./components/ConditionalLayout";

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
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  );
}
