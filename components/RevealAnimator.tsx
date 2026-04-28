"use client";

import { useReveal } from "@/hooks/useReveal";

type RevealVariant = "fade-up" | "scale-forward" | "slide-left" | "slide-right";
type RevealDelay = 100 | 200 | 300 | 400 | 500;

interface RevealAnimatorProps {
  variant?: RevealVariant;
  delay?: RevealDelay;
  className?: string;
  children: React.ReactNode;
}

const variantClassMap: Record<RevealVariant, string> = {
  "fade-up": "reveal",
  "scale-forward": "reveal-forward",
  "slide-left": "reveal-left",
  "slide-right": "reveal-right",
};

const delayClassMap: Record<RevealDelay, string> = {
  100: "delay-100",
  200: "delay-200",
  300: "delay-300",
  400: "delay-400",
  500: "delay-500",
};

export default function RevealAnimator({
  variant = "fade-up",
  delay,
  className = "",
  children,
}: RevealAnimatorProps) {
  const { ref, isVisible } = useReveal();

  const variantClass = variantClassMap[variant];
  const delayClass = delay ? delayClassMap[delay] : "";
  const activeClass = isVisible ? "active" : "";

  const classes = [variantClass, delayClass, activeClass, className]
    .filter(Boolean)
    .join(" ");

  return (
    <div ref={ref} className={classes}>
      {children}
    </div>
  );
}
