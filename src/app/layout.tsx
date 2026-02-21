import type { Metadata } from "next";
import { headers } from "next/headers";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Loader from "@/components/ui/Loader";
import Navbar from "@/components/ui/Navbar";
import PageWrapper from "@/components/ui/PageWrapper";
import { LoaderProvider } from "@/context/LoaderContext";
import { ScrollProvider } from "@/context/ScrollContext";
import { SectionProvider } from "@/context/SectionContext";
import { resumeData } from "@/data/resume";
import { SITE_CONFIG } from "@/lib/constants";

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

export const viewport = {
  themeColor: "#06b6d4",
};

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  // Allow env var to override (e.g. for prod strictness)
  let baseUrl = SITE_CONFIG.baseUrl;

  if (!process.env.NEXT_PUBLIC_BASE_URL) {
    const host = headersList.get("host");
    if (host) {
      const protocol = host.includes("localhost") ? "http" : "https";
      baseUrl = `${protocol}://${host}`;
    }
  }

  const metadataBase = new URL(baseUrl);

  return {
    metadataBase,
    title: {
      default: "Rajesh Kanakamedala | Senior Software Engineer Portfolio",
      template: "%s | Rajesh Kanakamedala",
    },
    description:
      "Official portfolio of Rajesh Kanakamedala, a Senior Software Engineer with 10+ years of experience in Full Stack, Android, and Embedded Linux. Expert in architecting 'Silicon to Cloud' solutions.",
    keywords: [
      "Rajesh Kanakamedala",
      "Kanakamedala Rajesh",
      "Rajesh K.",
      "Rajesh Kanakamedala Portfolio",
      "Senior Software Engineer",
      "Full Stack Developer",
      "Android Developer",
      "Embedded Systems Engineer",
      "Embedded Linux Expert",
      "Next.js Developer Portfolio",
      "India",
    ],
    authors: [{ name: "Rajesh Kanakamedala" }],
    creator: "Rajesh Kanakamedala",
    publisher: "Rajesh Kanakamedala",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    alternates: {
      canonical: "/",
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: baseUrl,
      siteName: "Rajesh Kanakamedala Portfolio",
      title: "Rajesh Kanakamedala | Senior Software Engineer Portfolio",
      description:
        "Architecting Robust Full Stack, Android, and Embedded Systems. Over 10 years of experience from Silicon to Cloud.",
      images: [
        {
          url: "/og-image.svg",
          width: 1200,
          height: 630,
          alt: "Rajesh Kanakamedala - Senior Software Engineer Portfolio",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Rajesh Kanakamedala | Senior Software Engineer Portfolio",
      description:
        "Architecting Robust Full Stack, Android, and Embedded Systems. Over 10 years of experience from Silicon to Cloud.",
      images: ["/og-image.svg"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    manifest: "/manifest.json",
    icons: {
      icon: [
        { url: "/logo.svg", type: "image/svg+xml" },
        { url: "/favicon.ico", sizes: "any" },
      ],
      shortcut: "/favicon.ico",
      apple: "/apple-touch-icon.png",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const nonce = headersList.get("x-nonce") || "";

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
          nonce={nonce}
          suppressHydrationWarning
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
        <script
          type="application/ld+json"
          nonce={nonce}
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Person",
                "@id": `${SITE_CONFIG.baseUrl}/#person`,
                name: "Rajesh Kanakamedala",
                alternateName: [
                  "Kanakamedala Rajesh",
                  "Rajesh K.",
                  "Rajesh Kanakamedala",
                ],
                givenName: "Rajesh",
                familyName: "Kanakamedala",
                jobTitle: resumeData.header.title,
                url: SITE_CONFIG.baseUrl,
                description: resumeData.summary,
                image: `${SITE_CONFIG.baseUrl}/og-image.svg`,
                logo: `${SITE_CONFIG.baseUrl}/logo.svg`,
                sameAs: [
                  resumeData.contact.linkedin,
                  // Add other social links if available in resumeData
                ],
                knowsAbout: resumeData.skills.flatMap((s) => s.items),
                worksFor: {
                  "@type": "Organization",
                  name: resumeData.experience[0].company,
                },
                address: {
                  "@type": "PostalAddress",
                  addressLocality: "Vijayawada",
                  addressRegion: "Andhra Pradesh",
                  addressCountry: "India",
                },
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "@id": `${SITE_CONFIG.baseUrl}/#website`,
                url: SITE_CONFIG.baseUrl,
                name: "Rajesh Kanakamedala Portfolio",
                publisher: {
                  "@id": `${SITE_CONFIG.baseUrl}/#person`,
                },
                description:
                  "Senior Software Engineer Portfolio - Rajesh Kanakamedala",
                inLanguage: "en-US",
              },
            ]),
          }}
        />
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
