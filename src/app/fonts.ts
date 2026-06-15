import { Fraunces, Inter, Sora, Space_Mono, Syne } from "next/font/google";

export const bodyFont = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

export const displayFont = Sora({
  variable: "--font-display",
  subsets: ["latin"],
});

export const nameFont = Fraunces({
  variable: "--font-name",
  subsets: ["latin"],
  weight: ["700"],
});

export const taglineFont = Space_Mono({
  variable: "--font-tagline",
  subsets: ["latin"],
  weight: ["400"],
});

export const logoFont = Syne({
  variable: "--font-logo",
  subsets: ["latin"],
  weight: ["700"],
});

export const categoryFont = Fraunces({
  variable: "--font-category",
  subsets: ["latin"],
  weight: ["600"],
  style: ["italic"],
});
