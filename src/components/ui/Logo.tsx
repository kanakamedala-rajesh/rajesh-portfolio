"use client";

import { cn } from "@/lib/utils";

/**
 * @interface LogoProps
 * @description Configuration for the lightweight CSS-powered logo.
 */
interface LogoProps {
  /** Optional sizing class (e.g., 'h-8', 'w-auto') */
  className?: string;
  /** Whether to trigger the entrance 'draw' animation */
  animateEntrance?: boolean;
}

/**
 * @component Logo
 * @description Ultra-high performance logo component using pure CSS animations.
 * Features GPU-accelerated drawing, pulsing, and parallax hover effects.
 * Eliminates JS overhead and styled-jsx hydration issues.
 */
export default function Logo({
  className,
  animateEntrance = false,
}: LogoProps) {
  return (
    <div className={cn("group relative inline-block", className)}>
      <svg
        viewBox="0 0 923 502"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="pointer-events-none h-full w-full overflow-visible"
        style={{ isolation: "isolate" }}
      >
        {/* Group R - Primary Cloud/Web (Cyan) */}
        <g
          className={cn(
            "gpu-accelerated transition-transform duration-500 ease-out group-hover:translate-x-1 group-hover:-translate-y-1",
            animateEntrance && "animate-logo-pulse"
          )}
        >
          <path
            pathLength="1"
            className={cn(
              "gpu-accelerated",
              animateEntrance && "animate-logo-draw"
            )}
            style={{ animationDelay: "0.1s" }}
            d="M10.889,454.348l0,-399.573l290.092,0l71.729,71.729l0,122.088l-28.921,28.921l-208.149,0l0,-43.618l179.119,0c0,0 15.399,-11.347 15.399,-15.399l0,-80.239l-40.119,-40.119l-230.585,0l0,356.212l-21.349,21.349"
            stroke="var(--color-primary)"
            strokeWidth="11.11"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            pathLength="1"
            className={cn(
              "gpu-accelerated",
              animateEntrance && "animate-logo-draw"
            )}
            style={{ animationDelay: "0.2s" }}
            d="M99.796,126.503l-1.571,327.844"
            stroke="var(--color-primary)"
            strokeWidth="11.11"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            pathLength="1"
            className={cn(
              "gpu-accelerated",
              animateEntrance && "animate-logo-draw"
            )}
            style={{ animationDelay: "0.3s" }}
            d="M25.229,16.421l283.596,0l100.321,91.119l0,149.4l-30.925,31.517"
            stroke="var(--color-primary)"
            strokeWidth="11.11"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            pathLength="1"
            className={cn(
              "gpu-accelerated",
              animateEntrance && "animate-logo-draw"
            )}
            style={{ animationDelay: "0.4s" }}
            d="M152.66,320.068l142.517,142.517l155.744,0"
            stroke="var(--color-primary)"
            strokeWidth="11.11"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            pathLength="1"
            className={cn(
              "gpu-accelerated",
              animateEntrance && "animate-logo-draw"
            )}
            style={{ animationDelay: "0.5s" }}
            d="M169.694,303.708l132.649,132.649l137.245,0"
            stroke="var(--color-primary)"
            strokeWidth="11.11"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            pathLength="1"
            className={cn(
              "gpu-accelerated",
              animateEntrance && "animate-logo-draw"
            )}
            style={{ animationDelay: "0.6s" }}
            d="M228.299,321.708l86.046,86.046l60.653,0l-89.355,-89.355"
            stroke="var(--color-primary)"
            strokeWidth="11.11"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle
            cx="30.023"
            cy="483.895"
            r="8.199"
            stroke="var(--color-primary)"
            strokeWidth="11.11"
            className="gpu-accelerated"
          />
          <circle
            cx="13.754"
            cy="15.754"
            r="8.199"
            stroke="var(--color-primary)"
            strokeWidth="11.11"
            className="gpu-accelerated"
          />
        </g>

        {/* Group k - Secondary Hardware/Kernel (Amber) */}
        <g className="gpu-accelerated transition-transform duration-700 ease-out group-hover:-translate-x-1 group-hover:translate-y-1">
          <path
            pathLength="1"
            className={cn(
              "gpu-accelerated",
              animateEntrance && "animate-logo-draw"
            )}
            style={{ animationDelay: "0.7s" }}
            d="M479.587,13.088l0,475.004"
            stroke="var(--color-secondary)"
            strokeWidth="11.11"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            pathLength="1"
            className={cn(
              "gpu-accelerated",
              animateEntrance && "animate-logo-draw"
            )}
            style={{ animationDelay: "0.8s" }}
            d="M512.013,13.088l0,475.004l0,-475.004"
            stroke="var(--color-secondary)"
            strokeWidth="11.11"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            pathLength="1"
            className={cn(
              "gpu-accelerated",
              animateEntrance && "animate-logo-draw"
            )}
            style={{ animationDelay: "0.9s" }}
            d="M543.906,13.088l0,475.004"
            stroke="var(--color-secondary)"
            strokeWidth="11.11"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            pathLength="1"
            className={cn(
              "gpu-accelerated",
              animateEntrance && "animate-logo-draw"
            )}
            style={{ animationDelay: "1.0s" }}
            d="M581.796,251.801l238.658,-238.658l43.979,0"
            stroke="var(--color-secondary)"
            strokeWidth="11.11"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            pathLength="1"
            className={cn(
              "gpu-accelerated",
              animateEntrance && "animate-logo-draw"
            )}
            style={{ animationDelay: "1.1s" }}
            d="M554.146,336.687l296.974,-296.974"
            stroke="var(--color-secondary)"
            strokeWidth="11.11"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            pathLength="1"
            className={cn(
              "gpu-accelerated",
              animateEntrance && "animate-logo-draw"
            )}
            style={{ animationDelay: "1.2s" }}
            d="M884.653,67.218l-202.25,202.25l169.002,167.55c19.653,19.093 2.153,38.867 -17.222,19.492l-171.846,-167.489"
            stroke="var(--color-secondary)"
            strokeWidth="11.11"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            pathLength="1"
            className={cn(
              "gpu-accelerated",
              animateEntrance && "animate-logo-draw"
            )}
            style={{ animationDelay: "1.3s" }}
            d="M670.342,344.02l150.894,144.738l54.531,0"
            stroke="var(--color-secondary)"
            strokeWidth="11.11"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            pathLength="1"
            className={cn(
              "gpu-accelerated",
              animateEntrance && "animate-logo-draw"
            )}
            style={{ animationDelay: "1.4s" }}
            d="M753.206,292.513l164.11,153.823"
            stroke="var(--color-secondary)"
            strokeWidth="11.11"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle
            cx="892.712"
            cy="487.919"
            r="8.199"
            stroke="var(--color-secondary)"
            strokeWidth="11.11"
            className="gpu-accelerated"
          />
          <circle
            cx="879.378"
            cy="13.754"
            r="8.199"
            stroke="var(--color-secondary)"
            strokeWidth="11.11"
            className="gpu-accelerated"
          />
        </g>
      </svg>
    </div>
  );
}
