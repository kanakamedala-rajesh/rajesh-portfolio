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
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(sessionStorage.getItem('rk_portfolio_visited')==='true')document.documentElement.classList.add('visited-mode')}catch(e){}})()`,
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
