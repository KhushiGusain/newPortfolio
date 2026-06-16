"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";

const DEFAULT_THRESHOLD = 0.12;
const DEFAULT_ROOT_MARGIN = "0px 0px -8% 0px";

function useInViewOnce(
  ref: RefObject<Element | null>,
  options?: IntersectionObserverInit
) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || visible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: DEFAULT_THRESHOLD,
        rootMargin: DEFAULT_ROOT_MARGIN,
        ...options,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, visible, options]);

  return visible;
}

type GroupContextValue = {
  visible: boolean;
  staggerMs: number;
};

const ScrollRevealGroupContext = createContext<GroupContextValue | null>(null);

export function ScrollRevealGroup({
  children,
  className = "",
  staggerMs = 80,
}: {
  children: ReactNode;
  className?: string;
  staggerMs?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInViewOnce(ref);

  return (
    <ScrollRevealGroupContext.Provider value={{ visible, staggerMs }}>
      <div ref={ref} className={className}>
        {children}
      </div>
    </ScrollRevealGroupContext.Provider>
  );
}

export function ScrollRevealItem({
  children,
  className = "",
  index = 0,
}: {
  children: ReactNode;
  className?: string;
  index?: number;
}) {
  const group = useContext(ScrollRevealGroupContext);
  const ref = useRef<HTMLDivElement>(null);
  const soloVisible = useInViewOnce(ref);
  const visible = group ? group.visible : soloVisible;
  const delay = group ? index * group.staggerMs : 0;

  return (
    <div
      ref={group ? undefined : ref}
      className={`scroll-reveal ${visible ? "is-visible" : ""} ${className}`.trim()}
      style={visible && delay > 0 ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInViewOnce(ref);

  return (
    <div
      ref={ref}
      className={`scroll-reveal ${visible ? "is-visible" : ""} ${className}`.trim()}
      style={visible && delay > 0 ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
