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
 * AnomalySlider - Interactive before/after comparison component
 *
 * Signature component for Roblox horror game guides.
 * Features touch-optimized drag handle for mobile one-hand use.
 *
 * Design tokens from system.md:
 * - Container height: 200px (mobile), 300px (desktop)
 * - Handle size: 44px (touch target minimum)
 * - Border: 1px solid var(--border-default)
 * - Border-radius: var(--radius-md)
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

  // Mouse events
  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    updateSliderPosition(e.clientX);
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    updateSliderPosition(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch events
  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    updateSliderPosition(touch.clientX);
  };

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    setIsDragging(true);
    const touch = e.touches[0];
    updateSliderPosition(touch.clientX);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Handle found checkbox
  const handleFoundChange = (checked: boolean) => {
    setFound(checked);
    onFoundChange?.(checked);

    // Save to localStorage for persistence
    if (anomalyId) {
      const key = `anomaly-found-${anomalyId}`;
      if (checked) {
        localStorage.setItem(key, 'true');
      } else {
        localStorage.removeItem(key);
      }
    }
  };

  // Check localStorage on mount
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
      <div className="flex justify-between text-sm mb-2 text-slate-400">
        <span className="font-medium">{t('before')}</span>
        <span className="font-medium text-purple-400">{t('after')}</span>
      </div>

      {/* Slider Container */}
      <div
        ref={containerRef}
        className="relative overflow-hidden rounded-lg border border-slate-800 bg-slate-950 select-none h-[200px] md:h-[300px]"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchStart={handleTouchStart}
      >
        {/* After Image (Background) */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${afterImage})` }}
        >
          <img
            src={afterImage}
            alt={afterAlt || t('after')}
            className="w-full h-full object-cover"
            style={{ visibility: 'hidden' }}
          />
        </div>

        {/* Before Image (Foreground, clipped) */}
        <div
          className="absolute inset-0 overflow-hidden bg-cover bg-center"
          style={{
            width: `${sliderPosition}%`,
            backgroundImage: `url(${beforeImage})`,
          }}
        >
          <img
            src={beforeImage}
            alt={beforeAlt || t('before')}
            className="w-full h-full object-cover"
            style={{ visibility: 'hidden' }}
          />
        </div>

        {/* Slider Handle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-purple-500 cursor-ew-resize hover:bg-purple-400 transition-colors"
          style={{ left: `${sliderPosition}%` }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          {/* Touch-optimized drag handle */}
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 bg-purple-500 hover:bg-purple-400 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 active:scale-95"
            style={{
              width: '44px',
              height: '44px',
            }}
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 9l4-4 4 4m0 6l-4 4-4-4"
              />
            </svg>
          </div>
        </div>

        {/* Drag hint overlay (fades out on interaction) */}
        {sliderPosition === 50 && !isDragging && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 pointer-events-none">
            <span className="text-white/80 text-sm font-medium px-4 py-2 bg-black/50 rounded-full backdrop-blur-sm">
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
            className="sr-only"
          />
          <div
            className={`w-5 h-5 rounded border-2 transition-all ${
              found
                ? 'bg-purple-500 border-purple-500'
                : 'border-slate-600 group-hover:border-slate-500'
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
        <span className={`text-sm ${found ? 'text-purple-400 line-through' : 'text-slate-300'}`}>
          {found ? t('markedAsFound') : t('markAsFound')}
        </span>
      </label>
    </div>
  );
}
