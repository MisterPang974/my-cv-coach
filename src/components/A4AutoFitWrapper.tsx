import React, { useRef, useEffect, useState, useCallback } from "react";

/**
 * Wraps CV template content and dynamically adjusts spacing/sizing
 * so the CV fills exactly one A4 page — no empty bottom, no overflow.
 *
 * Applies CSS custom properties that cascade to all children:
 *   --cv-gap-scale, --cv-font-scale, --cv-title-scale, --cv-line-height, --cv-safe-margin
 */
export const A4AutoFitWrapper = ({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [vars, setVars] = useState<Record<string, string>>({});

  const recalc = useCallback(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    const containerH = container.clientHeight;
    const contentH = content.scrollHeight;
    if (containerH <= 0 || contentH <= 0) return;

    // Safe print margin: ~1cm = 3.8% of width
    const safePx = Math.max(16, Math.round(container.clientWidth * 0.038));
    const available = containerH - safePx * 0.5; // templates already have their own padding
    const ratio = available / contentH;

    let gapScale = 1;
    let fontScale = 1;
    let titleScale = 1;
    let lineHeight = 1.3;

    if (ratio > 1.6) {
      // Very sparse content — expand generously
      gapScale = Math.min(3, ratio * 0.8);
      fontScale = Math.min(1.2, 1 + (ratio - 1) * 0.1);
      titleScale = Math.min(1.35, 1 + (ratio - 1) * 0.15);
      lineHeight = Math.min(1.9, 1.3 + (ratio - 1) * 0.25);
    } else if (ratio > 1.2) {
      // Somewhat sparse — moderate expansion
      gapScale = 1 + (ratio - 1) * 0.8;
      fontScale = 1 + (ratio - 1) * 0.06;
      titleScale = 1 + (ratio - 1) * 0.1;
      lineHeight = 1.3 + (ratio - 1) * 0.15;
    } else if (ratio > 1.05) {
      // Slightly sparse — subtle expansion
      gapScale = 1 + (ratio - 1) * 0.5;
      lineHeight = 1.3 + (ratio - 1) * 0.1;
    } else if (ratio < 0.8) {
      // Heavy overflow — aggressive compression
      gapScale = Math.max(0.3, ratio * 0.85);
      fontScale = Math.max(0.78, 0.82 + (ratio - 0.5) * 0.25);
      titleScale = Math.max(0.8, ratio * 0.95);
      lineHeight = Math.max(1.05, 1.3 - (1 - ratio) * 0.5);
    } else if (ratio < 0.95) {
      // Mild overflow — gentle compression
      gapScale = Math.max(0.6, ratio);
      fontScale = Math.max(0.9, 1 - (1 - ratio) * 0.4);
      titleScale = Math.max(0.9, ratio);
      lineHeight = Math.max(1.15, 1.3 - (1 - ratio) * 0.3);
    }
    // else ratio ≈ 1 → perfect, keep defaults

    setVars({
      "--cv-gap-scale": gapScale.toFixed(3),
      "--cv-font-scale": fontScale.toFixed(3),
      "--cv-title-scale": titleScale.toFixed(3),
      "--cv-line-height": lineHeight.toFixed(3),
      "--cv-safe-margin": `${safePx}px`,
    });
  }, []);

  useEffect(() => {
    recalc();
    const ro = new ResizeObserver(() => recalc());
    if (containerRef.current) ro.observe(containerRef.current);
    if (contentRef.current) ro.observe(contentRef.current);

    const mo = new MutationObserver(() => requestAnimationFrame(recalc));
    if (contentRef.current)
      mo.observe(contentRef.current, {
        childList: true,
        subtree: true,
        characterData: true,
      });

    return () => {
      ro.disconnect();
      mo.disconnect();
    };
  }, [recalc]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        ...style,
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        ...(vars as any),
      }}
    >
      <div
        ref={contentRef}
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default A4AutoFitWrapper;
