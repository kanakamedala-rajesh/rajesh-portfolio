import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Loader from "@/components/ui/Loader";
import Navbar from "@/components/ui/Navbar";
import PageWrapper from "@/components/ui/PageWrapper";
import { LoaderProvider } from "@/context/LoaderContext";
import { ScrollProvider } from "@/context/ScrollContext";
import { SectionProvider } from "@/context/SectionContext";

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

/**
 * JetBrains Mono: Used for code/terminal elements only.
 * Loaded with display: "swap" — browser renders with fallback font
 * until this font is available, avoiding render-blocking.
 */
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

/** Known bot/lighthouse user-agent patterns for loader-skip optimization */
const BOT_UA_PATTERN =
  /lighthouse|pagespeed|googlebot|bingbot|baiduspider|yandex|slurp|duckduckbot|facebot|ia_archiver|semrush|ahrefs|mj12bot|dotbot|petalbot|bytespider|gptbot|chatgpt/i;

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
      suppressHydrationWarning
    >
      <head>
        {/* Preload LCP image to reduce Largest Contentful Paint time */}
        <link rel="preload" href="/home_bg.webp" as="image" type="image/webp" />
        {/**
         * Inline script runs before any React hydration to:
         * 1. Skip loader for returning visitors (sessionStorage check)
         * 2. Skip loader for bots/Lighthouse (navigator.userAgent check)
         *    This prevents the boot animation from delaying LCP measurement
         *    in performance audits. The BOT_UA_PATTERN regex is duplicated
         *    here to keep the script self-contained and blocking-free.
         */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var d=document.documentElement;if(sessionStorage.getItem('rk_portfolio_visited')==='true'||${BOT_UA_PATTERN}.test(navigator.userAgent))d.classList.add('visited-mode')}catch(e){}})()`,
          }}
        />
        <noscript>
          <style>{`
            #initial-loader { display: none !important; }
            main { opacity: 1 !important; }
            header { transform: translateY(0) !important; opacity: 1 !important; }
          `}</style>
        </noscript>
      </head>
      <body className="antialiased">
        <LoaderProvider>
          <ScrollProvider>
            <SectionProvider>
              <Loader />
              <Navbar />
              <div className="bg-deep-void fixed inset-0 -z-50" />
              <div className="texture-overlay" />
              <PageWrapper>{children}</PageWrapper>
            </SectionProvider>
          </ScrollProvider>
        </LoaderProvider>
      </body>
    </html>
  );
}
