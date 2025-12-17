"use client";

import { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useLoader } from "@/context/LoaderContext";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const { isLoading } = useLoader();
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

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
    <AnimatePresence>
      {!isLoading && (
        <>
          <motion.header
            className={cn(
              "font-space fixed z-40 flex items-center justify-between",
              isScrolled ? "bg-deep-void/80 rounded-full" : "bg-transparent"
            )}
            initial={{
              y: -100,
              opacity: 0,
              top: "0rem",
              left: "0%",
              x: "0%",
              width: "100%",
              paddingLeft: "2rem",
              paddingRight: "2rem",
              paddingTop: "1.5rem",
              paddingBottom: "1.5rem",
            }}
            animate={{
              y: 0,
              opacity: 1,
              top: isScrolled ? "1.5rem" : "0rem",
              left: isScrolled ? "50%" : "0%",
              x: isScrolled ? "-50%" : "0%",
              width: isScrolled ? "90%" : "100%",
              maxWidth: isScrolled ? "56rem" : "100%", // 4xl equivalent
              borderRadius: isScrolled ? "9999px" : "0px",
              backgroundColor: isScrolled
                ? "rgba(15, 17, 26, 0.8)"
                : "rgba(15, 17, 26, 0)", // deep-void equivalent
              backdropFilter: isScrolled ? "blur(12px)" : "blur(0px)",
              borderWidth: "1px",
              borderColor: isScrolled
                ? "rgba(255, 255, 255, 0.1)"
                : "rgba(255, 255, 255, 0)",
              paddingLeft: isScrolled ? "1.5rem" : "2rem",
              paddingRight: isScrolled ? "1.5rem" : "2rem",
              paddingTop: isScrolled ? "0.75rem" : "1.5rem",
              paddingBottom: isScrolled ? "0.75rem" : "1.5rem",
              boxShadow: isScrolled
                ? "0 10px 15px -3px rgba(0, 0, 0, 0.3)"
                : "0 0px 0px 0px rgba(0, 0, 0, 0)",
            }}
            transition={{
              type: "spring",
              stiffness: 150,
              damping: 20,
              mass: 1,
            }}
          >
            {/* Logo */}
            <Link
              href="/"
              className="text-foreground group font-mono text-xl font-bold tracking-tighter"
            >
              <span className="text-primary group-hover:text-accent transition-colors">
                &lt;
              </span>
              RK
              <span className="text-primary group-hover:text-accent transition-colors">
                /&gt;
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden items-center gap-8 md:flex">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-foreground/80 hover:text-primary font-space relative px-1 py-1 text-sm font-medium tracking-widest uppercase transition-colors"
                  onMouseEnter={() => setHoveredLink(link.name)}
                  onMouseLeave={() => setHoveredLink(null)}
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
                </Link>
              ))}
            </nav>

            {/* Mobile Toggle */}
            <div className="md:hidden">
              <button
                className="text-foreground hover:text-primary p-2 transition-colors"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Open Menu"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </motion.header>

          {/* Mobile Glitch Overlay */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                className="bg-deep-void fixed inset-0 z-50 flex h-screen w-screen flex-col items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Close Button */}
                <button
                  className="text-foreground hover:text-accent absolute top-8 right-8 p-2 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Close Menu"
                >
                  <X className="h-8 w-8" />
                </button>

                {/* Links with Glitch Effect */}
                <div className="flex flex-col items-center gap-8">
                  {NAV_LINKS.map((link, index) => (
                    <motion.div
                      key={link.name}
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: 50, opacity: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={link.href}
                        className="from-primary to-secondary hover:to-accent font-space glitch-hover relative bg-gradient-to-r bg-clip-text text-4xl font-black text-transparent transition-all"
                        onClick={() => setIsMobileMenuOpen(false)}
                        data-text={link.name}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Decorative Glitch Lines */}
                <div className="pointer-events-none absolute inset-0 opacity-20">
                  <div className="bg-primary absolute top-1/4 left-0 h-[1px] w-full animate-pulse" />
                  <div className="bg-secondary absolute bottom-1/3 left-0 h-[1px] w-full animate-pulse delay-75" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  );
}
