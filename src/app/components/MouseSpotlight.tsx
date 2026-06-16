"use client";

import { useEffect, useRef } from "react";

const LERP = 0.075;

function lerp(start: number, end: number, factor: number) {
  return start + (end - start) * factor;
}

export default function MouseSpotlight() {
  const glowRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);
  const hasMovedRef = useRef(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const glow = glowRef.current;
    if (!glow) return;

    const setToCenter = () => {
      const x = window.innerWidth * 0.5;
      const y = window.innerHeight * 0.5;
      targetRef.current = { x, y };
      currentRef.current = { x, y };
      glow.style.transform = `translate3d(${x}px, ${y}px, 0) translate3d(-50%, -50%, 0)`;
    };

    setToCenter();

    const animate = () => {
      currentRef.current.x = lerp(currentRef.current.x, targetRef.current.x, LERP);
      currentRef.current.y = lerp(currentRef.current.y, targetRef.current.y, LERP);
      glow.style.transform = `translate3d(${currentRef.current.x}px, ${currentRef.current.y}px, 0) translate3d(-50%, -50%, 0)`;
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    const onMove = (event: MouseEvent) => {
      targetRef.current = { x: event.clientX, y: event.clientY };

      if (!hasMovedRef.current) {
        hasMovedRef.current = true;
        glow.classList.remove("mouse-spotlight-glow--idle");
      }
    };

    const onLeave = () => {
      glow.classList.add("mouse-spotlight-glow--idle");
      targetRef.current = {
        x: window.innerWidth * 0.5,
        y: window.innerHeight * 0.5,
      };
    };

    const onEnter = () => {
      if (hasMovedRef.current) {
        glow.classList.remove("mouse-spotlight-glow--idle");
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    window.addEventListener("resize", setToCenter);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      window.removeEventListener("resize", setToCenter);
    };
  }, []);

  return (
    <div className="mouse-spotlight" aria-hidden="true">
      <div ref={glowRef} className="mouse-spotlight-glow mouse-spotlight-glow--idle" />
    </div>
  );
}
