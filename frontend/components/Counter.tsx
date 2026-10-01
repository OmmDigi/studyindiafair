"use client";

import React, { useEffect, useState, useRef } from "react";

interface CounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}

export default function Counter({ end, duration = 2000, suffix = "", prefix = "" }: CounterProps) {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let startTimestamp: number | null = null;
          const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            // easeOutQuart
            const easeOut = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(easeOut * end));
            if (progress < 1) {
              window.requestAnimationFrame(step);
            } else {
              setCount(end);
            }
          };
          window.requestAnimationFrame(step);
        }
      },
      { threshold: 0.1 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  return (
    <span ref={countRef}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}
