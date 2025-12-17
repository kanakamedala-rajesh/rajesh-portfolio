import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/ui/SmoothScroll";
import Loader from "@/components/ui/Loader";
import Navbar from "@/components/ui/Navbar";
import PageWrapper from "@/components/ui/PageWrapper";
import { LoaderProvider } from "@/context/LoaderContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rajesh Kanakamedala | Portfolio",
  description: "Full Stack & Embedded Systems Engineer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body className="antialiased">
        <LoaderProvider>
          <Loader />
          <Navbar />
          <SmoothScroll />
          <div className="texture-overlay" />
          <PageWrapper>{children}</PageWrapper>
        </LoaderProvider>
      </body>
    </html>
  );
}
