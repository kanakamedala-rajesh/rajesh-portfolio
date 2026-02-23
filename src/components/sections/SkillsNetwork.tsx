"use client";

import React, { useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useInView,
  useScroll,
  MotionValue,
  useReducedMotion,
} from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useSectionContext } from "@/context/SectionContext";
import { resumeData } from "@/data/resume";

gsap.registerPlugin(ScrollTrigger);

// --- Types ---
type NodeType = "category" | "skill";

interface Node {
  id: string;
  label: string;
  type: NodeType;
  x: number; // Percentage (0-100)
  y: number; // Percentage (0-100)
  color: string;
  size: number;
  connections: string[]; // IDs of connected nodes
}

interface Link {
  source: string;
  target: string;
}

// --- Configuration ---
// Define explicit centers for categories to ensure a balanced layout
const CATEGORY_CENTERS = [
  { x: 50, y: 50 }, // Center (e.g., Languages - Core)
  { x: 20, y: 30 }, // Top Left (Frameworks)
  { x: 80, y: 30 }, // Top Right (Embedded)
  { x: 20, y: 70 }, // Bottom Left (Cloud)
  { x: 80, y: 70 }, // Bottom Right (Methodologies)
];

const COLORS = [
  "var(--color-primary)",
  "var(--color-secondary)",
  "var(--color-accent)",
  "#a855f7",
  "#ef4444",
];

// --- Helper: Generate Graph Data Deterministically ---
const generateGraphData = () => {
  const nodes: Node[] = [];
  const links: Link[] = [];

  // Helper to round coordinates to prevent hydration mismatches
  const round = (val: number) => Math.round(val * 10000) / 10000;

  // 1. Create Category Nodes
  resumeData.skills.forEach((cat, index) => {
    const center = CATEGORY_CENTERS[index % CATEGORY_CENTERS.length];
    const catId = `cat-${cat.category}`;

    nodes.push({
      id: catId,
      label: cat.category,
      type: "category",
      x: round(center.x),
      y: round(center.y),
      color: COLORS[index % COLORS.length],
      size: 60,
      connections: [],
    });

    // 2. Create Skill Nodes for this Category
    const radius = 15; // Radius around category
    const angleStep = (2 * Math.PI) / cat.items.length;

    cat.items.forEach((skill, skillIndex) => {
      const skillId = `skill-${skill}`;
      // Calculate position in a circle around the category
      // Add slight randomness to 'r' and 'angle' for "organic" look
      const angle = skillIndex * angleStep + index * 0.5; // Offset rotation per category
      const r = radius + (skillIndex % 2 === 0 ? 5 : 0); // Zig-zag radius

      const skillX = center.x + r * Math.cos(angle) * 1.8; // Stretch X for aspect ratio
      const skillY = center.y + r * Math.sin(angle);

      nodes.push({
        id: skillId,
        label: skill,
        type: "skill",
        x: round(Math.max(5, Math.min(95, skillX))), // Clamp to viewport
        y: round(Math.max(5, Math.min(95, skillY))),
        color: COLORS[index % COLORS.length], // Inherit category color
        size: 30, // Smaller skill nodes
        connections: [catId], // Connect to parent category
      });

      links.push({ source: catId, target: skillId });

      // Update connections on parent
      const parentNode = nodes.find((n) => n.id === catId);
      if (parentNode) parentNode.connections.push(skillId);
    });
  });

  // 3. Create Cross-Category Links (Manual "Smart" Connections)
  // This simulates the "Neural Network" complexity
  const crossLinks = [
    { from: "Java", to: "Android SDK/NDK" },
    { from: "Java", to: "Spring Boot" }, // Example if exists
    { from: "Kotlin", to: "Android SDK/NDK" },
    { from: "C++", to: "Embedded Linux" },
    { from: "C++", to: "JNI" }, // if exists
    { from: "Linux Daemons", to: "Embedded Linux" },
    { from: "React", to: "Next.js" },
    { from: "TypeScript", to: "React" },
    { from: "SQL", to: "PostgreSQL" },
    { from: "SQL", to: "MySQL" },
    { from: "Docker", to: "AWS" },
  ];

  crossLinks.forEach((link) => {
    const sourceNode = nodes.find(
      (n) => n.label === link.from || n.label.includes(link.from)
    );
    const targetNode = nodes.find(
      (n) => n.label === link.to || n.label.includes(link.to)
    );

    if (sourceNode && targetNode) {
      links.push({ source: sourceNode.id, target: targetNode.id });
      sourceNode.connections.push(targetNode.id);
      targetNode.connections.push(sourceNode.id);
    } else {
      if (process.env.NODE_ENV === "development") {
        console.warn(
          `[SkillsNetwork] Link target missing: ${link.from} -> ${link.to}`
        );
      }
    }
  });

  return { nodes, links };
};

export default function SkillsNetwork() {
  const [data] = useState(() => generateGraphData());
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [activeNode, setActiveNode] = useState<string | null>(null); // New State for Click-to-Lock
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0); // For Mobile Scrolly-telling
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: "-30% 0px -30% 0px" });
  const shouldReduceMotion = useReducedMotion();
  const { registerSection, updateSectionStatus } = useSectionContext();

  // Scroll Parallax Hooks
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax Values
  const yBg = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]); // Background moves slower/inverted
  const opacityGraph = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0]
  ); // Fade in/out
  const scaleGraph = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.8, 1, 1, 0.8]
  ); // Zoom in/out

  useGSAP(
    () => {
      registerSection("skills");

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 80%",
        end: "bottom 20%",
        onToggle: (self) => {
          updateSectionStatus(
            "skills",
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

  // Mouse Tracking for Magnetic Effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth out the mouse movement
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current || shouldReduceMotion) return;
    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - top) / height - 0.5;
    mouseX.set(x * 50); // Multiplier determines max parallax shift
    mouseY.set(y * 50);
  };

  // Handle Node Click (Toggle Lock)
  const handleNodeClick = (nodeId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent background click
    setActiveNode((prev) => (prev === nodeId ? null : nodeId));
  };

  // Handle Background Click (Unlock)
  const handleBackgroundClick = () => {
    setActiveNode(null);
  };

  // Determine which node is driving the visualization
  const focusNode = activeNode || hoveredNode;

  // --- Render Components ---

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onClick={handleBackgroundClick} // Unlock on background click
      className="bg-deep-void relative z-20 flex min-h-screen w-full flex-col items-center justify-center overflow-x-clip py-20 md:overflow-hidden"
      id="skills"
    >
      <h2 className="sr-only">Technical Skills Network</h2>
      {/* 
        HUD INTERFACE (VERTICAL SIDEBARS)
        Symmetrical "Bracket" Design with Line Indicators
      */}

      {/* LEFT SIDEBAR (Desktop Only) */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{
          opacity: isInView ? 1 : 0,
          x: isInView ? 0 : -30,
        }}
        transition={{ duration: 0.6, ease: "circOut" }}
        className="pointer-events-none fixed top-1/2 left-4 z-40 hidden -translate-y-1/2 flex-col items-center justify-center gap-2 md:flex lg:left-8"
      >
        {/* Top Line */}
        <div
          className={`h-32 w-[1px] bg-gradient-to-b from-transparent transition-all duration-300 ${
            focusNode
              ? "via-secondary/50 to-secondary/80"
              : "via-primary/50 to-primary/80"
          }`}
        />

        {/* Text */}
        <div className="rotate-180 py-4 [writing-mode:vertical-lr]">
          <span
            className={`font-mono text-xs font-bold tracking-[0.3em] uppercase transition-all duration-300 ${
              focusNode
                ? "text-2xl text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                : "text-gray-500"
            }`}
          >
            {focusNode
              ? data.nodes.find((n) => n.id === focusNode)?.label
              : "HOVER TO DECRYPT"}
          </span>
        </div>

        {/* Bottom Line */}
        <div
          className={`h-32 w-[1px] bg-gradient-to-t from-transparent transition-all duration-300 ${
            focusNode
              ? "via-secondary/50 to-secondary/80"
              : "via-primary/50 to-primary/80"
          }`}
        />
      </motion.div>

      {/* RIGHT SIDEBAR */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{
          opacity: isInView ? 1 : 0,
          x: isInView ? 0 : 30,
        }}
        transition={{ duration: 0.6, ease: "circOut" }}
        className="pointer-events-none fixed top-1/2 right-4 z-40 flex -translate-y-1/2 flex-col items-center justify-center gap-2 lg:right-8"
      >
        {/* Top Line */}
        <div
          className={`h-32 w-[1px] bg-gradient-to-b from-transparent transition-all duration-300 ${
            focusNode
              ? "via-secondary/50 to-secondary/80"
              : "via-primary/50 to-primary/80"
          }`}
        />

        {/* Text */}
        <div className="py-4 [writing-mode:vertical-rl]">
          <span
            className={`font-mono text-xs font-bold tracking-[0.3em] uppercase transition-all duration-300 ${
              focusNode ? "text-accent animate-pulse" : "text-gray-500"
            }`}
          >
            {focusNode ? (
              "CLICK BACKGROUND TO RESET"
            ) : (
              <>
                {/* Mobile Text Removed per request */}
                <span className="hidden md:inline">HOVER TO DECRYPT</span>
              </>
            )}
          </span>
        </div>

        {/* Bottom Line */}
        <div
          className={`h-32 w-[1px] bg-gradient-to-t from-transparent transition-all duration-300 ${
            focusNode
              ? "via-secondary/50 to-secondary/80"
              : "via-primary/50 to-primary/80"
          }`}
        />
      </motion.div>

      {/* Background Decor */}
      <div className="cyber-grid absolute inset-0 opacity-20" />
      <div className="pointer-events-none absolute inset-0 bg-radial-[circle_at_center_var(--color-deep-void)_0%,transparent_100%]" />

      <div className="pointer-events-none absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-white/10 to-transparent" />
      </div>

      {/* Desktop Large Background Heading (decorative, uses aria-hidden) */}
      <motion.div
        style={{ y: yBg }}
        className="pointer-events-none absolute top-1/2 left-1/2 z-0 hidden -translate-x-1/2 -translate-y-1/2 opacity-10 select-none md:block"
      >
        <span
          aria-hidden="true"
          className="font-heading text-gradient text-[12rem] leading-none font-bold whitespace-nowrap"
        >
          SKILLS
        </span>
      </motion.div>

      <div className="pointer-events-none relative z-10 mt-4 w-full text-center md:hidden">
        {/* Mobile "SKILLS" Header with Cyber Effect */}
        <div className="relative z-10 flex w-full flex-col items-center justify-center">
          <h2 className="font-heading from-primary to-secondary animate-background-shine bg-gradient-to-r via-white bg-[length:200%_auto] bg-clip-text text-6xl font-black tracking-tighter text-transparent drop-shadow-[0_0_10px_rgba(6,182,212,0.3)]">
            SKILLS
          </h2>
          {/* Cyber Underline */}
          <div className="mt-2 flex items-center gap-2 opacity-80">
            <div className="to-primary h-[1px] w-8 bg-gradient-to-r from-transparent" />
            <div className="bg-accent animate-composited-pulse h-1.5 w-1.5 rounded-full" />
            <div className="to-primary h-[1px] w-8 bg-gradient-to-l from-transparent" />
          </div>
        </div>
      </div>

      {/* Graph Container (Desktop Only) */}
      <motion.div
        style={{ opacity: opacityGraph, scale: scaleGraph }}
        className="relative mx-auto hidden aspect-video w-full max-w-7xl md:block"
      >
        {/* SVG Layer for Links */}
        <svg className="pointer-events-none absolute inset-0 z-0 h-full w-full">
          {data.links.map((link, i) => {
            const source = data.nodes.find((n) => n.id === link.source);
            const target = data.nodes.find((n) => n.id === link.target);
            if (!source || !target) return null;

            return (
              <GraphLink
                key={`${link.source}-${link.target}-${i}`}
                link={link}
                source={source}
                target={target}
                focusNode={focusNode}
                index={i}
                smoothX={smoothX}
                smoothY={smoothY}
              />
            );
          })}
        </svg>

        {/* Nodes Layer */}
        {data.nodes.map((node, i) => {
          const isFocused = focusNode === node.id;
          const isConnected =
            focusNode && node.connections.includes(focusNode || "");
          const isDimmed = focusNode && !isFocused && !isConnected;

          return (
            <SkillNode
              key={node.id}
              node={node}
              index={i}
              isHovered={isFocused} // Pass focused state as "isHovered" for visual compatibility
              isActive={activeNode === node.id} // Pass explicit active state for pulsing
              isConnected={!!isConnected}
              isDimmed={!!isDimmed}
              setHoveredNode={setHoveredNode}
              onNodeClick={handleNodeClick}
              smoothX={smoothX}
              smoothY={smoothY}
            />
          );
        })}
      </motion.div>

      {/* 
        MOBILE SCROLLY-TELLING: THE DATA CENTRIFUGE 
        - Layout: Sticky HUD Background + Scrollable Overlay
      */}
      <div className="relative min-h-screen w-full md:hidden">
        {/* Sticky Background Layer (HUD + Indicators) */}
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* 1. The Neural HUD (Fixed Visual Anchor) */}
          <motion.div
            animate={{ opacity: isInView ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-0 flex h-full w-full items-center justify-center overflow-hidden"
          >
            {/* Ambient Background Glow */}
            <motion.div
              animate={{
                backgroundColor: COLORS[activeCategoryIndex % COLORS.length],
              }}
              className="absolute h-[150vw] w-[150vw] rounded-full opacity-10 blur-[100px] transition-colors duration-1000"
            />

            {/* The Core Interface */}
            <div className="relative mt-[-20vh] flex h-[300px] w-[300px] items-center justify-center">
              {/* Ring 1: Outer Data Track (Slow Spin) */}
              <motion.div
                animate={{ rotate: shouldReduceMotion ? 0 : 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-dashed border-white/10"
              />

              {/* Ring 2: Active Sector Ring (Reacts to Index) */}
              <motion.div
                animate={{
                  rotate: activeCategoryIndex * 72, // 5 categories * 72deg
                  borderColor: COLORS[activeCategoryIndex % COLORS.length],
                }}
                className="absolute inset-4 rounded-full border-t-2 border-r-2 border-transparent transition-colors duration-500"
                style={{
                  borderTopColor: "currentColor",
                  borderRightColor: "currentColor",
                }}
              />

              {/* Ring 3: Counter-Rotating Tech Ring */}
              <motion.div
                animate={{ rotate: shouldReduceMotion ? 0 : -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute inset-12 rounded-full border border-white/5"
              >
                <div className="absolute top-0 left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/20" />
              </motion.div>

              {/* Central Processor */}
              <div className="bg-deep-void/80 absolute inset-0 z-10 m-20 flex flex-col items-center justify-center rounded-full border border-white/10 backdrop-blur-sm">
                <motion.span
                  key={activeCategoryIndex}
                  initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  className="mb-1 font-mono text-xs text-gray-500"
                >
                  0{activeCategoryIndex + 1} {/* // LOADED */}
                  {` // LOADED`}
                </motion.span>
                <motion.h3
                  key={`title-${activeCategoryIndex}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="font-space px-2 text-center text-lg leading-none font-bold"
                  style={{ color: COLORS[activeCategoryIndex % COLORS.length] }}
                >
                  {
                    resumeData.skills[activeCategoryIndex].category.split(
                      "/"
                    )[0]
                  }
                </motion.h3>
              </div>
            </div>
          </motion.div>

          {/* 3. Progress Track (Right Edge) - Now inside Sticky Container */}
          <motion.div
            animate={{ opacity: isInView ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            className="absolute top-1/2 right-2 z-50 flex -translate-y-1/2 flex-col gap-2 mix-blend-difference"
          >
            {resumeData.skills.map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  height: activeCategoryIndex === i ? 24 : 4,
                  opacity: activeCategoryIndex === i ? 1 : 0.3,
                  backgroundColor:
                    activeCategoryIndex === i
                      ? COLORS[i % COLORS.length]
                      : "#ffffff",
                }}
                className="w-1 rounded-full transition-all duration-300"
              />
            ))}
          </motion.div>
        </div>

        {/* 2. Scrollable Data Streams (The Trigger Zones) - Foreground Layer */}
        {/* Negative margin pulls this up to overlap the sticky background */}
        <div className="relative z-10 -mt-[100vh] w-full pt-[10vh] pb-[20vh]">
          {resumeData.skills.map((cat, i) => {
            const color = COLORS[i % COLORS.length];

            return (
              <motion.div
                key={cat.category}
                className="pointer-events-none relative flex min-h-[70vh] flex-col items-center justify-end p-6 pb-20"
                onViewportEnter={() => setActiveCategoryIndex(i)}
                viewport={{ margin: "-30% 0px -30% 0px" }} // Trigger in middle 40%
              >
                {/* Only show content when active or close to active */}
                <motion.div
                  initial={{ opacity: 0, y: 100 }} // Start lower for parallax feel
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ margin: "-10% 0px" }} // Visible when enters bottom
                  transition={{
                    staggerChildren: 0.05,
                    duration: 0.8,
                    ease: "easeOut",
                  }}
                  className="pointer-events-auto w-full max-w-sm"
                >
                  {/* Glass Panel for Skills */}
                  <div className="grid grid-cols-2 gap-3">
                    {cat.items.map((skill) => (
                      <motion.div
                        key={skill}
                        variants={{
                          hidden: { opacity: 0, y: 20 },
                          visible: { opacity: 1, y: 0 },
                        }}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="group flex items-center gap-2 rounded-lg border border-white/10 bg-black/80 p-3 shadow-lg backdrop-blur-xl transition-colors hover:border-white/30"
                        style={{ borderLeftColor: color, borderLeftWidth: 2 }}
                      >
                        <div className="h-1.5 w-1.5 rounded-full bg-white/20 transition-colors group-hover:bg-white" />
                        <span className="font-mono text-xs tracking-tight break-words text-gray-200 uppercase">
                          {skill}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// --- Sub-Component: Link ---
const GraphLink = ({
  source,
  target,
  focusNode,
  index,
  smoothX,
  smoothY,
}: {
  link: Link;
  source: Node;
  target: Node;
  focusNode: string | null;
  index: number;
  smoothX: MotionValue<number>;
  smoothY: MotionValue<number>;
}) => {
  // Determine if this link should be highlighted
  const isConnected =
    focusNode && (source.id === focusNode || target.id === focusNode);
  const isDimmed = focusNode && !isConnected;

  // Parallax Effect on Lines
  const x = useTransform(
    smoothX,
    (val: number) => val * (source.type === "category" ? 0.5 : 1)
  );
  const y = useTransform(
    smoothY,
    (val: number) => val * (source.type === "category" ? 0.5 : 1)
  );

  return (
    <motion.line
      x1={`${source.x}%`}
      y1={`${source.y}%`}
      x2={`${target.x}%`}
      y2={`${target.y}%`}
      stroke={isConnected ? source.color : "rgba(255,255,255,0.1)"}
      strokeWidth={isConnected ? 2 : 1}
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{
        pathLength: 1,
        opacity: isDimmed ? 0.05 : isConnected ? 0.8 : 0.2,
      }}
      transition={{ duration: 1.5, delay: index * 0.01 }}
      style={{
        translateX: x,
        translateY: y,
      }}
    />
  );
};

// --- Sub-Component: Individual Node ---
const SkillNode = ({
  node,
  index,
  isHovered,
  isActive,
  isConnected,
  isDimmed,
  setHoveredNode,
  onNodeClick,
  smoothX,
  smoothY,
}: {
  node: Node;
  index: number;
  isHovered: boolean;
  isActive: boolean;
  isConnected: boolean;
  isDimmed: boolean;
  setHoveredNode: (id: string | null) => void;
  onNodeClick: (id: string, e: React.MouseEvent) => void;
  smoothX: MotionValue<number>;
  smoothY: MotionValue<number>;
}) => {
  // Deterministic "Random" based on index
  // (index * large_prime) % range
  const randomDelay = (index * 0.3) % 2;
  const randomDuration = 3 + ((index * 0.7) % 2);

  // Parallax Depth: Categories move slower (background), Skills move faster (foreground)
  const depth = node.type === "category" ? 0.5 : 1.0;
  const x = useTransform(smoothX, (val: number) => val * depth);
  const y = useTransform(smoothY, (val: number) => val * depth);

  const size = node.type === "category" ? 80 : 40;
  const halfSize = size / 2;
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className="absolute z-10 flex cursor-pointer items-center justify-center outline-none"
      style={{
        left: `${node.x}%`,
        top: `${node.y}%`,
        marginLeft: -halfSize,
        marginTop: -halfSize,
        x, // Parallax x
        y, // Parallax y
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: isHovered ? 1.3 : isConnected ? 1.1 : isDimmed ? 0.8 : 1,
        opacity: isDimmed ? 0.2 : 1,
      }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setHoveredNode(node.id)}
      onMouseLeave={() => setHoveredNode(null)}
      onClick={(e) => onNodeClick(node.id, e)}
      role="button"
      tabIndex={0}
      aria-label={`${node.type === "category" ? "Category" : "Skill"}: ${node.label}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onNodeClick(node.id, e as unknown as React.MouseEvent);
        }
      }}
    >
      {/* Active State Pulsing Ring */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ scale: 1, opacity: 1 }}
            animate={{ scale: 2, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute inset-0 rounded-full border-2"
            style={{ borderColor: node.color }}
          />
        )}
      </AnimatePresence>

      {/* Floating Animation Wrapper */}
      <motion.div
        animate={{
          y: shouldReduceMotion ? 0 : [-5, 5, -5],
        }}
        transition={{
          repeat: Infinity,
          duration: randomDuration,
          delay: randomDelay,
          ease: "easeInOut",
        }}
        className="relative flex items-center justify-center"
      >
        {/* Node Visual */}
        <div
          className={`relative flex items-center justify-center rounded-full border transition-all duration-300 ${
            node.type === "category"
              ? "bg-deep-void/90 border-2"
              : "border border-white/20 bg-black/50 backdrop-blur-sm"
          } `}
          style={{
            width: size,
            height: size,
            borderColor:
              isHovered || isConnected ? node.color : "rgba(255,255,255,0.1)",
            boxShadow:
              isHovered || isConnected ? `0 0 20px ${node.color}` : "none",
          }}
        >
          {/* Inner Core */}
          <div
            className="rounded-full bg-white/10"
            style={{
              width: "40%",
              height: "40%",
              backgroundColor: node.color,
            }}
          />
        </div>

        {/* Label - Only show if category, hovered, or connected (for cleaner look) */}
        <AnimatePresence>
          {(node.type === "category" || isHovered || isConnected) && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              className={`pointer-events-none absolute top-full mt-2 rounded-md border px-3 py-1 font-mono text-xs tracking-wider whitespace-nowrap ${
                node.type === "category"
                  ? "border-white/20 bg-white/10 font-bold text-white"
                  : "border-white/10 bg-black/80 text-gray-200"
              } `}
              style={{
                zIndex: isHovered ? 50 : 10,
              }}
            >
              {node.label}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

/* 
  DESIGN MANIFESTO:
  1. Aesthetic Direction: "Cyber-Organic Construct". We moved away from chaotic physics to a "Curated Constellation" layout. 
     This ensures legibility while maintaining the "tech" vibe through neon accents, glassmorphism, and smooth floating animations.
  2. Key Interaction: "The Parallax Drift". Moving the mouse gently shifts the entire network in 3D space (using different depths for categories vs skills), 
     giving a feeling of looking through a window at a floating data structure.
*/
