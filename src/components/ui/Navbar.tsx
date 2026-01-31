"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLoader } from "@/context/LoaderContext";
import { useScroll } from "@/context/ScrollContext";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { name: "About", href: "#about", sectionId: "about-architecture" },
  { name: "Experience", href: "#experience", sectionId: "experience-tunnel" },
  { name: "Skills", href: "#skills", sectionId: "skills" },
  { name: "Contact", href: "#contact-terminal", sectionId: "contact-terminal" },
];

const ACTIVE_SECTION_THROTTLE_MS = 100;

export default function Navbar() {
  const { isLoading } = useLoader();
  const { lenis } = useScroll();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const [pendingScrollTarget, setPendingScrollTarget] = useState<string | null>(
    null
  );

  const lastUpdateTime = useRef(0);

  const computeActiveSection = useCallback(() => {
    const viewportHeight = window.innerHeight;
    const center = viewportHeight / 2;
    let currentActive: string | null = null;
    let minDistance = Infinity;

    for (const link of NAV_LINKS) {
      const domId = link.href.replace("#", "");
      const el = document.getElementById(domId);
      if (el) {
        const rect = el.getBoundingClientRect();
        const isInView = rect.top < center && rect.bottom > center;
        if (isInView) {
          currentActive = link.name;
          break;
        }
        const distance = Math.abs(rect.top + rect.height / 2 - center);
        if (
          distance < minDistance &&
          rect.top < viewportHeight &&
          rect.bottom > 0
        ) {
          minDistance = distance;
          currentActive = link.name;
        }
      }
    }
    if (window.scrollY < 200) currentActive = null;
    return currentActive;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (isLoading) return;

      const now = performance.now();
      if (now - lastUpdateTime.current > ACTIVE_SECTION_THROTTLE_MS) {
        lastUpdateTime.current = now;
        const newActive = computeActiveSection();
        setActiveLink((prev) => (prev === newActive ? prev : newActive));
      }

      const scrollY = window.scrollY;
      const threshold = 100;
      if (scrollY > threshold && !isScrolled) {
        setIsScrolled(true);
      } else if (scrollY <= threshold && isScrolled) {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Initial check in case we are already scrolled (e.g. reload or test)
    if (!isLoading) {
      handleScroll();
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading, isScrolled, computeActiveSection]);

  const scrollToTarget = useCallback(
    (targetId: string) => {
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
    },
    [lenis]
  );

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    if (isMobileMenuOpen) {
      setPendingScrollTarget(targetId);
      setIsMobileMenuOpen(false);
    } else {
      scrollToTarget(targetId);
    }
  };

  useEffect(() => {
    if (pendingScrollTarget && !isMobileMenuOpen) {
      scrollToTarget(pendingScrollTarget);
      const timer = setTimeout(() => setPendingScrollTarget(null), 0);
      return () => clearTimeout(timer);
    }
  }, [isMobileMenuOpen, pendingScrollTarget, scrollToTarget]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const trigger = ScrollTrigger.create({
      start: "top top",
      end: 99999,
      onUpdate: (self) => {
        if (self.scroll() < 100) {
          setIsVisible(true);
        } else if (self.direction === 1) {
          setIsVisible(false);
        } else if (self.direction === -1) {
          setIsVisible(true);
        }
      },
    });
    return () => trigger.kill();
  }, []);

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

  const shouldShow = !isLoading && isVisible;

  // Base navbar classes
  const navContainerClasses = cn(
    "font-space pointer-events-auto relative mx-auto items-center grid grid-cols-[1fr_auto_1fr] md:flex md:justify-between transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
    isScrolled
      ? "bg-deep-void/80 rounded-full backdrop-blur-md border border-white/5 shadow-2xl mt-8 w-[calc(100%-2rem)] max-w-4xl px-6 py-3"
      : "bg-transparent border-transparent border-0 w-full px-8 py-6 mt-0",
    shouldShow
      ? "translate-y-0 opacity-100 scale-x-100 blur-none"
      : "-translate-y-24 opacity-0 scale-x-105 blur-sm"
  );

  return (
    <>
      <header className="pointer-events-none fixed top-0 left-0 z-50 w-full">
        <div className={navContainerClasses}>
          {isScrolled && (
            <div className="moving-border-overlay z-0 rounded-full" />
          )}

          <Link
            href="/"
            className="text-foreground group relative z-50 col-start-2 justify-self-center font-mono text-xl font-bold tracking-tighter md:col-auto md:justify-self-start"
            onClick={(e) => handleLinkClick(e, "#hero-title")}
          >
            <span className="text-primary group-hover:text-accent transition-colors">
              &lt;
            </span>
            RK
            <span className="text-primary group-hover:text-accent transition-colors">
              /&gt;
            </span>
          </Link>

          <nav
            className="hidden items-center gap-8 md:flex"
            onMouseLeave={() => setHoveredLink(null)}
          >
            {NAV_LINKS.map((link) => {
              const isActive = activeLink === link.name;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "font-space relative z-50 cursor-pointer px-1 py-1 text-sm font-medium tracking-widest uppercase transition-all duration-300",
                    isActive
                      ? "text-primary drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]"
                      : "text-foreground/80 hover:text-primary"
                  )}
                  onMouseEnter={() => setHoveredLink(link.name)}
                  onClick={(e) => handleLinkClick(e, link.href)}
                >
                  <span className="relative z-10">{link.name}</span>
                  <span
                    className={cn(
                      "bg-secondary absolute bottom-0 left-0 block h-[3px] w-full origin-left transition-all duration-300",
                      hoveredLink === link.name
                        ? "scale-x-100 opacity-100"
                        : "scale-x-0 opacity-0"
                    )}
                  />
                </a>
              );
            })}
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
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "bg-deep-void cyber-grid fixed inset-0 z-[100] flex flex-col items-center justify-between overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]",
          isMobileMenuOpen
            ? "visible translate-y-0 opacity-100"
            : "pointer-events-none invisible translate-y-full opacity-0"
        )}
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
          {NAV_LINKS.map((link, index) => {
            const isActive = activeLink === link.name;
            return (
              <div
                key={link.name}
                className={cn(
                  "transition-all delay-[100ms] duration-500",
                  isMobileMenuOpen
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-12 opacity-0"
                )}
                style={{ transitionDelay: `${100 + index * 50}ms` }}
              >
                <a
                  href={link.href}
                  className="group flex cursor-pointer items-baseline gap-4"
                  onClick={(e) => handleLinkClick(e, link.href)}
                >
                  <span
                    className={cn(
                      "font-mono text-sm transition-colors",
                      isActive
                        ? "text-primary"
                        : "group-hover:text-primary text-white/40"
                    )}
                  >
                    0{index + 1}
                  </span>
                  <span
                    className="font-space relative text-5xl font-bold tracking-tighter text-transparent uppercase transition-all"
                    style={{
                      WebkitTextStroke: isActive
                        ? "1px var(--color-primary)"
                        : "1px rgba(255,255,255,0.5)",
                    }}
                  >
                    <span
                      className={cn(
                        "absolute inset-0 blur-sm transition-opacity",
                        isActive
                          ? "text-primary opacity-100"
                          : "text-foreground group-hover:text-primary opacity-0 group-hover:opacity-100"
                      )}
                    >
                      {link.name}
                    </span>
                    {link.name}
                  </span>
                </a>
              </div>
            );
          })}
        </nav>

        <div
          className={cn(
            "w-full border-t border-white/10 bg-black/20 p-8 transition-all delay-300 duration-500",
            isMobileMenuOpen
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          )}
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
        </div>
      </div>
    </>
  );
}
