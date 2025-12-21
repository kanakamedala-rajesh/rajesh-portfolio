"use client";

import { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll as useMotionScroll,
  useMotionValueEvent,
} from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useLoader } from "@/context/LoaderContext";
import { useScroll } from "@/context/ScrollContext";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { name: "About", href: "#hero-title" },
  { name: "Experience", href: "#experience" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const { isLoading } = useLoader();
  const { lenis } = useScroll(); // Use our custom context
  const { scrollY } = useMotionScroll();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [pendingScrollTarget, setPendingScrollTarget] = useState<string | null>(
    null
  );

  const scrollToTarget = (targetId: string) => {
    const elem = document.getElementById(targetId);
    if (!elem) return;

    if (lenis) {
      lenis.scrollTo(elem, {
        offset: 0,
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        lock: true,
      });
    } else {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const targetId = href.replace("#", "");

    if (isMobileMenuOpen) {
      // Defer scroll until menu exit animation completes
      setPendingScrollTarget(targetId);
      setIsMobileMenuOpen(false);
    } else {
      // Immediate scroll
      scrollToTarget(targetId);
    }
  };

  // Update scroll state for morph effect
  useMotionValueEvent(scrollY, "change", (latest) => {
    const threshold = 100;
    if (latest > threshold && !isScrolled) {
      setIsScrolled(true);
    } else if (latest <= threshold && isScrolled) {
      setIsScrolled(false);
    }
  });

  // Toggle body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header className="pointer-events-none fixed top-0 left-0 z-50 w-full">
        <motion.div
          className={cn(
            "font-space pointer-events-auto relative mx-auto items-center",
            "grid grid-cols-[1fr_auto_1fr]",
            "md:flex md:justify-between",
            isScrolled ? "bg-deep-void/80 rounded-full" : "bg-transparent",
            isLoading && "pointer-events-none"
          )}
          initial={{
            opacity: 0,
            y: -100,
            width: "100%",
            marginTop: "0rem",
            paddingLeft: "2rem",
            paddingRight: "2rem",
            paddingTop: "1.5rem",
            paddingBottom: "1.5rem",
          }}
          animate={{
            opacity: isLoading ? 0 : 1,
            y: isLoading ? -100 : 0,
            position: "relative",
            width: isScrolled ? "calc(100% - 2rem)" : "100%",
            maxWidth: isScrolled ? "56rem" : "100%",
            marginTop: isLoading ? "0rem" : isScrolled ? "2rem" : "0rem",
            borderRadius: isScrolled ? "9999px" : "0px",
            backgroundColor: isScrolled
              ? "rgba(15, 17, 26, 0.85)"
              : "rgba(15, 17, 26, 0)",
            backdropFilter: isScrolled ? "blur(16px)" : "blur(0px)",
            borderWidth: "1px",
            borderColor: isScrolled
              ? "rgba(255, 255, 255, 0.05)"
              : "rgba(255, 255, 255, 0)",
            paddingLeft: isScrolled ? "1.5rem" : "2rem",
            paddingRight: isScrolled ? "1.5rem" : "2rem",
            paddingTop: isScrolled ? "0.75rem" : "1.5rem",
            paddingBottom: isScrolled ? "0.75rem" : "1.5rem",
            boxShadow: isScrolled
              ? "0 20px 50px -12px rgba(0, 0, 0, 0.8), 0 0 15px rgba(6, 182, 212, 0.15), inset 0 1px 1px rgba(255, 255, 255, 0.1)"
              : "0 0px 0px 0px rgba(0, 0, 0, 0)",
          }}
          transition={{
            type: "spring",
            stiffness: 150,
            damping: 20,
            mass: 1,
          }}
        >
          {isScrolled && (
            <div className="moving-border-overlay z-0 rounded-full" />
          )}

          <Link
            href="/"
            className="text-foreground group relative z-50 col-start-2 justify-self-center font-mono text-xl font-bold tracking-tighter md:col-auto md:justify-self-start"
            onClick={(e) => handleScroll(e, "#hero-title")}
          >
            <span className="text-primary group-hover:text-accent transition-colors">
              &lt;
            </span>
            RK
            <span className="text-primary group-hover:text-accent transition-colors">
              /&gt;
            </span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-foreground/80 hover:text-primary font-space relative z-50 cursor-pointer px-1 py-1 text-sm font-medium tracking-widest uppercase transition-colors"
                onMouseEnter={() => setHoveredLink(link.name)}
                onMouseLeave={() => setHoveredLink(null)}
                onClick={(e) => handleScroll(e, link.href)}
              >
                <span className="relative z-10">{link.name}</span>
                <AnimatePresence>
                  {hoveredLink === link.name && (
                    <motion.span
                      layoutId="navbar-underline"
                      className="bg-primary absolute bottom-0 left-0 block h-[2px] w-full"
                      initial={{ opacity: 0, scaleX: 0 }}
                      animate={{ opacity: 1, scaleX: 1 }}
                      exit={{ opacity: 0, scaleX: 0 }}
                      transition={{
                        layout: {
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        },
                        opacity: { duration: 0.2 },
                        scaleX: { duration: 0.2 },
                      }}
                      style={{ originX: 0 }}
                    />
                  )}
                </AnimatePresence>
              </a>
            ))}
          </nav>

          <div className="pointer-events-auto relative z-50 col-start-3 justify-self-end md:hidden">
            <button
              className="text-foreground hover:text-primary hover:border-primary/50 flex h-10 w-10 items-center justify-center rounded-md border border-white/10 transition-all hover:bg-white/5 active:scale-95"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open Menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </motion.div>
      </header>

      <AnimatePresence
        onExitComplete={() => {
          if (pendingScrollTarget) {
            scrollToTarget(pendingScrollTarget);
            setPendingScrollTarget(null);
          }
        }}
      >
        {isMobileMenuOpen && (
          <motion.div
            className="bg-deep-void cyber-grid fixed inset-0 z-[100] flex flex-col items-center justify-between overflow-hidden"
            initial={{ opacity: 0, y: "110%" }}
            animate={{
              opacity: 1,
              y: "0%",
              transition: {
                duration: 0.6,
                ease: [0.19, 1, 0.22, 1],
              },
            }}
            exit={{
              opacity: 0,
              y: "110%",
              transition: {
                duration: 0.5,
                ease: [0.19, 1, 0.22, 1],
              },
            }}
            style={{
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: "100%",
              height: "100%",
              margin: 0,
              padding: 0,
            }}
            onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="relative z-10 flex w-full items-center justify-end p-8">
              <button
                className="text-foreground hover:text-accent hover:border-accent/50 group flex h-12 w-12 items-center justify-center rounded-full border border-white/10 transition-all hover:bg-white/5"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close Menu"
              >
                <X className="h-6 w-6 transition-transform duration-300 group-hover:rotate-90" />
              </button>
            </div>

            <nav className="flex flex-1 flex-col items-center justify-center gap-8">
              {NAV_LINKS.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.2 } }}
                  transition={{
                    delay: 0.1 + index * 0.05,
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                  }}
                >
                  <a
                    href={link.href}
                    className="group flex cursor-pointer items-baseline gap-4"
                    onClick={(e) => handleScroll(e, link.href)}
                  >
                    <span className="group-hover:text-primary font-mono text-sm text-white/40 transition-colors">
                      0{index + 1}
                    </span>
                    <span
                      className="font-space relative text-5xl font-bold tracking-tighter text-transparent uppercase transition-all"
                      style={{
                        WebkitTextStroke: "1px rgba(255,255,255,0.5)",
                      }}
                    >
                      <span className="text-foreground group-hover:text-primary absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100 group-hover:blur-sm">
                        {link.name}
                      </span>
                      {link.name}
                    </span>
                  </a>
                </motion.div>
              ))}
            </nav>

            <motion.div
              className="w-full border-t border-white/10 bg-black/20 p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-mono text-xs tracking-widest text-white/40 uppercase">
                    System Status
                  </span>
                  <span className="text-accent flex items-center gap-2 font-mono text-sm">
                    <span className="relative flex h-2 w-2">
                      <span className="bg-accent absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"></span>
                      <span className="bg-accent relative inline-flex h-2 w-2 rounded-full"></span>
                    </span>
                    ONLINE
                  </span>
                </div>
                <div className="font-mono text-xs text-white/40">
                  © 2025 RK PORTFOLIO
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
