import "./globals.css";

export const metadata = {
  title: "מכירת תכולת בית",
  description: "אתר למכירת פריטים לפני מעבר דירה",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <body>{children}</body>
    </html>
  );
}