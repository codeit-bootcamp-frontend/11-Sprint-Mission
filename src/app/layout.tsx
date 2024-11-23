export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 모든 페이지에 적용되는 레이아웃
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
