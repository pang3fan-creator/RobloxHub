'use client';

import { useState, useEffect, useRef, MouseEvent, TouchEvent } from 'react';
import { useTranslations } from 'next-intl';

interface AnomalySliderProps {
  beforeImage: string;
  afterImage: string;
  beforeAlt?: string;
  afterAlt?: string;
  initialFound?: boolean;
  onFoundChange?: (found: boolean) => void;
  anomalyId?: string;
  className?: string;
}

/**
 * AnomalySlider - Split View Comparison
 *
 * Implements a side-by-side resizing layout using absolute positioning
 * to ensure zero gaps and perfect height filling.
 */
export function AnomalySlider({
  beforeImage,
  afterImage,
  beforeAlt,
  afterAlt,
  initialFound = false,
  onFoundChange,
  anomalyId,
  className = '',
}: AnomalySliderProps) {
  const t = useTranslations('components.anomalySlider');
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [found, setFound] = useState(initialFound);

  const containerRef = useRef<HTMLDivElement>(null);

  // Handle slider position change
  const updateSliderPosition = (clientX: number) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));

    setSliderPosition(percentage);
  };

  // Start dragging
  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    e.preventDefault();
  };

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    setIsDragging(true);
  };

  // Global drag handling
  useEffect(() => {
    if (!isDragging) return;

    const handleGlobalMouseMove = (e: globalThis.MouseEvent) => {
      updateSliderPosition(e.clientX);
    };

    const handleGlobalMouseUp = () => {
      setIsDragging(false);
    };

    const handleGlobalTouchMove = (e: globalThis.TouchEvent) => {
      const touch = e.touches[0];
      updateSliderPosition(touch.clientX);
    };

    window.addEventListener('mousemove', handleGlobalMouseMove);
    window.addEventListener('mouseup', handleGlobalMouseUp);
    window.addEventListener('touchmove', handleGlobalTouchMove);
    window.addEventListener('touchend', handleGlobalMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('mouseup', handleGlobalMouseUp);
      window.removeEventListener('touchmove', handleGlobalTouchMove);
      window.removeEventListener('touchend', handleGlobalMouseUp);
    };
  }, [isDragging]);

  // Handle found state
  const handleFoundChange = (checked: boolean) => {
    setFound(checked);
    onFoundChange?.(checked);
    if (anomalyId) {
      const key = `anomaly-found-${anomalyId}`;
      if (checked) {
        localStorage.setItem(key, 'true');
      } else {
        localStorage.removeItem(key);
      }
    }
  };

  // Initialize found state
  useEffect(() => {
    if (typeof window !== 'undefined' && anomalyId) {
      const key = `anomaly-found-${anomalyId}`;
      const wasFound = localStorage.getItem(key) === 'true';
      if (wasFound && !found) {
        setFound(true);
        onFoundChange?.(true);
      }
    }
  }, []);

  return (
    <div className={`anomaly-slider-wrapper ${className}`}>
      {/* Labels */}
      <div className="flex justify-between text-sm mb-2 text-slate-600 dark:text-slate-400">
        <span className="font-medium">{t('before')}</span>
        <span className="font-medium text-purple-600 dark:text-purple-400">
          {t('after')}
        </span>
      </div>

      {/* Main Container - Absolute Positioning Layout */}
      <div
        ref={containerRef}
        className="relative aspect-video w-full overflow-hidden rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950 select-none touch-none"
      >
        {/* Left Pane (Before) - Anchored Left */}
        <div
          className="absolute left-0 top-0 bottom-0 overflow-hidden bg-black/20 z-10"
          style={{ width: `${sliderPosition}%` }}
        >
          <img
            src={beforeImage}
            alt={beforeAlt || t('before')}
            className="w-full h-full object-cover pointer-events-none"
            draggable={false}
          />
        </div>

        {/* Right Pane (After) - Anchored Right */}
        <div
          className="absolute right-0 top-0 bottom-0 overflow-hidden bg-black/20"
          style={{ width: `${100 - sliderPosition}%` }}
        >
          <img
            src={afterImage}
            alt={afterAlt || t('after')}
            className="w-full h-full object-cover pointer-events-none"
            draggable={false}
          />
        </div>

        {/* Drag Handle (Divider) */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-purple-500 hover:bg-purple-400 cursor-ew-resize z-20 flex items-center justify-center group transition-colors -translate-x-1/2"
          style={{ left: `${sliderPosition}%` }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          {/* Touch target (invisible wider area) */}
          <div className="absolute inset-y-0 -left-4 -right-4 z-30 cursor-ew-resize" />

          {/* Visible Handle Button */}
          <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M8 9l4-4 4 4m0 6l-4 4-4-4"
              />
            </svg>
          </div>
        </div>

        {/* Hint Overlay (only when centered and idle) */}
        {sliderPosition === 50 && !isDragging && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
            <span className="text-white/90 text-sm font-medium px-4 py-2 bg-black/60 rounded-full backdrop-blur-sm shadow-xl translate-y-12">
              {t('dragHint')}
            </span>
          </div>
        )}
      </div>

      {/* Found checkbox */}
      <label className="flex items-center gap-3 mt-3 cursor-pointer group">
        <div className="relative">
          <input
            type="checkbox"
            checked={found}
            onChange={(e) => handleFoundChange(e.target.checked)}
            className="sr-only peer focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
          />
          <div
            className={`w-5 h-5 rounded border-2 transition-all ${
              found
                ? 'bg-purple-500 border-purple-500'
                : 'border-slate-300 dark:border-slate-600 group-hover:border-slate-400 dark:group-hover:border-slate-500 peer-focus-visible:ring-2 peer-focus-visible:ring-purple-500 peer-focus-visible:ring-offset-2 dark:peer-focus-visible:ring-offset-slate-900'
            }`}
          >
            {found && (
              <svg
                className="w-full h-full text-white p-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
          </div>
        </div>
        <span
          className={`text-sm ${found ? 'text-purple-600 dark:text-purple-400 line-through' : 'text-slate-700 dark:text-slate-300'}`}
        >
          {found ? t('markedAsFound') : t('markAsFound')}
        </span>
      </label>
    </div>
  );
}
