"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useSectionContext } from "@/context/SectionContext";
import { resumeData } from "@/data/resume";
import {
  Terminal as TerminalIcon,
  Mail,
  Linkedin,
  FileText,
  ChevronRight,
  Download,
  Minus,
  Square,
  X,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface CommandHistory {
  command: string;
  output: React.ReactNode;
}

const ContactTerminal = () => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<CommandHistory[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  const { registerSection, updateSectionStatus } = useSectionContext();

  useGSAP(
    () => {
      registerSection("contact-terminal");

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 80%",
        end: "bottom bottom",
        onToggle: (self) => {
          updateSectionStatus(
            "contact-terminal",
            self.isActive ? "active" : "idle",
            self.progress
          );
        },
      });
    },
    {
      scope: containerRef,
      dependencies: [registerSection, updateSectionStatus],
    }
  );

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    let output: React.ReactNode = "";

    switch (trimmedCmd) {
      case "help":
        output = (
          <div className="text-accent/80 space-y-1">
            <p>Available commands:</p>
            <ul className="list-none space-y-1 pl-4">
              <li>
                <span className="text-primary font-bold">email</span> - Send an
                email
              </li>
              <li>
                <span className="text-primary font-bold">linkedin</span> - Open
                LinkedIn profile
              </li>
              <li>
                <span className="text-primary font-bold">resume</span> -
                Download/View resume
              </li>
              <li>
                <span className="text-primary font-bold">clear</span> - Clear
                terminal
              </li>
              <li>
                <span className="text-primary font-bold">whoami</span> - Display
                current user
              </li>
            </ul>
          </div>
        );
        break;
      case "email":
        output = (
          <span className="text-secondary">
            Opening mail client... ({resumeData.contact.email})
          </span>
        );
        window.location.href = `mailto:${resumeData.contact.email}`;
        break;
      case "linkedin":
        output = (
          <span className="text-primary">Opening LinkedIn profile...</span>
        );
        window.open(
          `https://${resumeData.contact.linkedin}`,
          "_blank",
          "noopener,noreferrer"
        );
        break;
      case "resume":
        output = (
          <span className="text-primary">
            Initiating download sequence... (Profile.pdf)
          </span>
        );
        window.open("/docs/profile.pdf", "_blank", "noopener,noreferrer");
        break;
      case "whoami":
        output = "guest@rk-portfolio";
        break;
      case "clear":
        setHistory([]);
        return;
      case "":
        output = "";
        break;
      default:
        output = (
          <span className="text-red-400">
            Command not found: {trimmedCmd}. Type &apos;help&apos; for available
            commands.
          </span>
        );
    }

    setHistory((prev) => [...prev, { command: cmd, output }]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input);
      setInput("");
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  // Focus input when clicking anywhere in the terminal
  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  return (
    <section
      ref={containerRef}
      id="contact-terminal"
      className="bg-deep-void text-foreground relative z-10 flex min-h-screen w-full flex-col justify-end overflow-hidden p-6 lg:min-h-[80vh] lg:p-20"
      style={{ contain: "layout style paint" }}
    >
      {/* Background Effects */}
      <div className="cyber-grid pointer-events-none absolute inset-0 opacity-20" />
      <div className="pointer-events-none absolute top-0 left-0 h-32 w-full bg-gradient-to-b from-black/50 to-transparent" />

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 pt-20 lg:grid-cols-2 lg:gap-16 lg:pt-0">
        {/* Left Column: Contact Info */}
        <div className="order-2 space-y-8 lg:order-1 lg:space-y-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div className="text-secondary flex items-center gap-2 font-mono text-sm tracking-wider uppercase opacity-80">
              <TerminalIcon className="h-4 w-4" />
              <span>End of Line</span>
            </div>

            <h2 className="font-space text-5xl leading-[0.9] font-bold tracking-tighter sm:text-6xl md:text-8xl">
              <span className="text-gradient">LET&apos;S</span> <br />
              <span className="text-white">CONNECT</span>
            </h2>

            <p className="font-inter max-w-md text-base leading-relaxed text-gray-400 lg:text-lg">
              Ready to architect the next generation of embedded systems or
              immersive digital experiences? Initialize the handshake protocol.
            </p>
          </motion.div>

          <div className="space-y-4 lg:space-y-6">
            <a
              href={`mailto:${resumeData.contact.email}`}
              className="group -ml-3 flex items-center gap-4 rounded-xl border border-transparent p-3 text-lg transition-all duration-300 hover:border-white/10 hover:bg-white/5 lg:-ml-4 lg:p-4 lg:text-xl"
            >
              <div className="bg-secondary/10 group-hover:bg-secondary/20 flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors lg:h-12 lg:w-12">
                <Mail className="text-secondary h-5 w-5 lg:h-6 lg:w-6" />
              </div>
              <div className="flex min-w-0 flex-col">
                <span className="font-mono text-xs text-gray-500 lg:text-sm">
                  Email Protocol
                </span>
                <span className="font-inter group-hover:text-primary truncate text-white transition-colors">
                  {resumeData.contact.email}
                </span>
              </div>
              <ChevronRight className="group-hover:text-secondary ml-auto h-5 w-5 text-gray-600 transition-all group-hover:translate-x-1" />
            </a>

            <a
              href={`https://${resumeData.contact.linkedin}`}
              target="_blank"
              rel="noreferrer"
              className="group -ml-3 flex items-center gap-4 rounded-xl border border-transparent p-3 text-lg transition-all duration-300 hover:border-white/10 hover:bg-white/5 lg:-ml-4 lg:p-4 lg:text-xl"
            >
              <div className="bg-primary/10 group-hover:bg-primary/20 flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors lg:h-12 lg:w-12">
                <Linkedin className="text-primary h-5 w-5 lg:h-6 lg:w-6" />
              </div>
              <div className="flex min-w-0 flex-col">
                <span className="font-mono text-xs text-gray-500 lg:text-sm">
                  Professional Network
                </span>
                <span className="font-inter group-hover:text-primary text-white transition-colors">
                  LinkedIn Profile
                </span>
              </div>
              <ChevronRight className="group-hover:text-secondary ml-auto h-5 w-5 text-gray-600 transition-all group-hover:translate-x-1" />
            </a>

            <a
              href="/docs/profile.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group -ml-3 flex items-center gap-4 rounded-xl border border-transparent p-3 text-lg transition-all duration-300 hover:border-white/10 hover:bg-white/5 lg:-ml-4 lg:p-4 lg:text-xl"
            >
              <div className="bg-accent/10 group-hover:bg-accent/20 flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors lg:h-12 lg:w-12">
                <FileText className="text-accent h-5 w-5 lg:h-6 lg:w-6" />
              </div>
              <div className="flex min-w-0 flex-col">
                <span className="font-mono text-xs text-gray-500 lg:text-sm">
                  System Data
                </span>
                <span className="font-inter group-hover:text-primary text-white transition-colors">
                  Download Resume
                </span>
              </div>
              <Download className="group-hover:text-secondary ml-auto h-5 w-5 text-gray-600 transition-all group-hover:-translate-y-1" />
            </a>
          </div>
        </div>

        {/* Right Column: Interactive Terminal */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          onViewportEnter={() => {
            // Only autofocus on desktop to prevent keyboard popping up on mobile
            if (typeof window !== "undefined" && window.innerWidth >= 1024) {
              inputRef.current?.focus({ preventScroll: true });
            }
          }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="order-1 w-full lg:order-2"
        >
          <div
            className="border-primary/20 flex h-[400px] w-full flex-col overflow-hidden rounded-lg border bg-black/80 font-mono text-sm shadow-[0_0_50px_rgba(6,182,212,0.1)] backdrop-blur-xl md:text-base lg:h-[500px]"
            onClick={handleTerminalClick}
          >
            {/* Terminal Header */}
            <div className="flex items-center justify-between border-b border-white/5 bg-white/5 px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500/80 transition-colors hover:bg-red-500" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/80 transition-colors hover:bg-yellow-500" />
                <div className="h-3 w-3 rounded-full bg-green-500/80 transition-colors hover:bg-green-500" />
              </div>
              <div className="flex items-center gap-2 font-mono text-xs text-gray-500">
                <TerminalIcon className="h-3 w-3" />
                <span>guest@rk-portfolio:~</span>
              </div>
              <div className="flex items-center gap-3 opacity-50">
                <Minus className="h-3 w-3" />
                <Square className="h-3 w-3" />
                <X className="h-3 w-3" />
              </div>
            </div>

            {/* Terminal Body */}
            <div
              className="scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent flex-1 overflow-y-auto p-4 lg:p-6"
              ref={scrollRef}
            >
              <div className="mb-6 font-mono text-xs leading-relaxed text-gray-400 md:text-sm">
                <span className="text-primary">
                  Welcome to RK-OS v1.0.0 LTS
                </span>
                <br />
                <span className="text-gray-600">
                  Kernel: Linux 6.8.0-generic-rk x86_64
                </span>
                <br />
                <span className="text-gray-600">System Uptime: 100%</span>
                <br />
                <br />
                Type <span className="text-white">&apos;help&apos;</span> to
                view available commands.
                <br />
              </div>

              {history.map((item, idx) => (
                <div key={idx} className="mb-2 break-all">
                  <div className="flex gap-2">
                    <span className="text-accent shrink-0">
                      guest@rk-portfolio:~$
                    </span>
                    <span className="text-white">{item.command}</span>
                  </div>
                  {item.output && (
                    <div className="mt-1 ml-0 text-gray-300 md:ml-4">
                      {item.output}
                    </div>
                  )}
                </div>
              ))}

              <div className="mt-2 flex items-center gap-2">
                <span className="text-accent whitespace-nowrap">
                  guest@rk-portfolio:~$
                </span>
                <div className="relative flex-1">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full border-none bg-transparent p-0 font-mono text-base text-white outline-none focus:ring-0 lg:text-sm"
                    aria-label="Terminal Input"
                    autoComplete="off"
                  />
                  {/* Blinking cursor effect could go here if we wanted a custom one, but native caret is fine */}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer copyright */}
      <div className="relative left-0 mt-10 flex w-full flex-col items-center justify-between gap-4 px-6 pb-6 font-mono text-[10px] tracking-widest text-gray-600 uppercase opacity-60 md:flex-row md:text-xs lg:absolute lg:bottom-4 lg:mt-0 lg:px-20 lg:pb-0">
        <span>© {new Date().getFullYear()} Rajesh Kanakamedala</span>

        {/* Centered Designer Credit */}
        <a
          href="https://venkatasudha.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary hidden transition-colors md:block"
        >
          Designed by VenkataSudha
        </a>
        <a
          href="https://venkatasudha.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary transition-colors md:hidden"
        >
          Designed by VenkataSudha
        </a>

        <span className="flex items-center gap-2">
          <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
          All systems nominal
        </span>
      </div>
    </section>
  );
};

export default ContactTerminal;
