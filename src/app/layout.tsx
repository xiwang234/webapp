import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Life Strategy AI - Strategic Intelligence for Life Decisions",
  description: "Transform complex decisions into actionable strategies using ancient wisdom and modern AI.",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
