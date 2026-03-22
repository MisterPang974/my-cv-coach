import { useRef, useEffect, useState, useCallback } from "react";

/**
 * Measures actual content height vs A4 container height and returns
 * CSS custom properties to dynamically adjust spacing, font sizes,
 * and line heights so the CV fills exactly one A4 page.
 *
 * Usage:
 *   const { containerRef, contentRef, style } = useA4AutoFit();
 *   <div ref={containerRef} style={style}>
 *     <div ref={contentRef}> ... </div>
 *   </div>
 */

export interface A4FitStyle {
  /** Multiplier applied to all spacings between sections (default 1) */
  "--cv-gap-scale": string;
  /** Multiplier applied to body font size (default 1) */
  "--cv-font-scale": string;
  /** Multiplier for section title font size */
  "--cv-title-scale": string;
  /** Effective line height */
  "--cv-line-height": string;
  /** Padding top/bottom for safe print margins (min 1cm ≈ 38px at A4) */
  "--cv-safe-margin": string;
}

const A4_RATIO = 297 / 210; // height / width

export function useA4AutoFit() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [fitVars, setFitVars] = useState<Record<string, string>>({});

  const recalc = useCallback(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    const containerH = container.clientHeight;
    const contentH = content.scrollHeight;

    if (containerH <= 0 || contentH <= 0) return;

    // Safe print margin: ~1cm = 38px at full A4 794px width, scale proportionally
    const safePx = Math.max(20, Math.round(container.clientWidth * 0.048));

    // Available height minus safe margins (top + bottom)
    const available = containerH - safePx * 2;
    const ratio = available / contentH;

    let gapScale = 1;
    let fontScale = 1;
    let titleScale = 1;
    let lineHeight = 1.3;

    if (ratio > 1.5) {
      // Very sparse — expand a lot
      gapScale = Math.min(2.5, ratio * 0.85);
      fontScale = Math.min(1.25, 1 + (ratio - 1) * 0.12);
      titleScale = Math.min(1.3, 1 + (ratio - 1) * 0.15);
      lineHeight = Math.min(1.8, 1.3 + (ratio - 1) * 0.2);
    } else if (ratio > 1.15) {
      // Slightly sparse — gentle expansion
      gapScale = 1 + (ratio - 1) * 0.7;
      fontScale = 1 + (ratio - 1) * 0.08;
      titleScale = 1 + (ratio - 1) * 0.1;
      lineHeight = 1.3 + (ratio - 1) * 0.15;
    } else if (ratio < 0.85) {
      // Overflowing — compress
      gapScale = Math.max(0.4, ratio * 0.9);
      fontScale = Math.max(0.82, 0.85 + (ratio - 0.5) * 0.2);
      titleScale = Math.max(0.85, ratio);
      lineHeight = Math.max(1.1, 1.3 - (1 - ratio) * 0.4);
    } else if (ratio < 1) {
      // Slightly over — mild compression
      gapScale = Math.max(0.7, ratio);
      fontScale = Math.max(0.92, 1 - (1 - ratio) * 0.3);
      titleScale = Math.max(0.92, ratio);
      lineHeight = Math.max(1.2, 1.3 - (1 - ratio) * 0.3);
    }
    // else ratio ≈ 1 → keep defaults

    setFitVars({
      "--cv-gap-scale": gapScale.toFixed(3),
      "--cv-font-scale": fontScale.toFixed(3),
      "--cv-title-scale": titleScale.toFixed(3),
      "--cv-line-height": lineHeight.toFixed(3),
      "--cv-safe-margin": `${safePx}px`,
    });
  }, []);

  useEffect(() => {
    recalc();
    const observer = new ResizeObserver(() => recalc());
    if (containerRef.current) observer.observe(containerRef.current);
    if (contentRef.current) observer.observe(contentRef.current);

    // Also recalc on mutation (content changes)
    const mutObs = new MutationObserver(() => requestAnimationFrame(recalc));
    if (contentRef.current) mutObs.observe(contentRef.current, { childList: true, subtree: true, characterData: true });

    return () => { observer.disconnect(); mutObs.disconnect(); };
  }, [recalc]);

  return { containerRef, contentRef, fitVars, recalc };
}
