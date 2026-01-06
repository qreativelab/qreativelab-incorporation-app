import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "QréativeLab Inc. - Legal Document Builder",
  description: "Interactive 8-step legal document builder for QréativeLab Inc. incorporation. Create professional documents with AI-powered research.",
  keywords: ["incorporation", "legal documents", "QréativeLab", "OMEGA", "startup"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans">
        {children}
      </body>
    </html>
  );
}
