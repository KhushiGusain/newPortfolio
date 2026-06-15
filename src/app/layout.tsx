import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "./contexts/ThemeContext";
import { bodyFont, displayFont, nameFont, taglineFont } from "./fonts";

export const metadata: Metadata = {
  title: "Khushi Gusain - Portfolio",
  description: "Full Stack Developer & Student - Portfolio showcasing projects in React, Next.js, Node.js",
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bodyFont.variable} ${displayFont.variable} ${nameFont.variable} ${taglineFont.variable}`}
    >
      <body className={`${bodyFont.className} antialiased`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
