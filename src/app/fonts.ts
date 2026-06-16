import { Fraunces, Poppins, Sora, Syne } from "next/font/google";

export const bodyFont = Poppins({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const displayFont = Sora({
  variable: "--font-display",
  subsets: ["latin"],
});

export const nameFont = Fraunces({
  variable: "--font-name",
  subsets: ["latin"],
  weight: ["600"],
  style: ["italic"],
});

export const logoFont = Syne({
  variable: "--font-logo",
  subsets: ["latin"],
  weight: ["700"],
});
