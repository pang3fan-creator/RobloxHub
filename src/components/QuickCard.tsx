'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

export type RiskLevel = 'low' | 'medium' | 'high' | 'extreme';

interface QuickCardProps {
  id: string;
  title: string;
  description?: string;
  riskLevel?: RiskLevel;
  location?: string;
  trigger?: string;
  details?: React.ReactNode;
  initialFound?: boolean;
  onFoundChange?: (id: string, found: boolean) => void;
  className?: string;
}

/**
 * QuickCard - Compact information display card
 *
 * Designed for anomaly lists, event tables, and quick reference content.
 *
 * Design tokens from system.md:
 * - Padding: 12px (spacing-3) - tighter than usual for density
 * - Border: 1px solid var(--border-default)
 * - Border-radius: var(--radius-md) - 8px
 * - Background: var(--surface-raised) - slate-900
 */
export function QuickCard({
  id,
  title,
  description,
  riskLevel = 'low',
  location,
  trigger,
  details,
  initialFound = false,
  onFoundChange,
  className = '',
}: QuickCardProps) {
  const t = useTranslations('components.quickCard');
  const [found, setFound] = useState(initialFound);
  const [isExpanded, setIsExpanded] = useState(false);

  // Risk level colors
  const riskConfig = {
    low: {
      color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      label: t('lowRisk'),
      dot: 'bg-emerald-500',
    },
    medium: {
      color: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
      label: t('mediumRisk'),
      dot: 'bg-amber-500',
    },
    high: {
      color: 'bg-red-500/20 text-red-400 border-red-500/30',
      label: t('highRisk'),
      dot: 'bg-red-500',
    },
    extreme: {
      color: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      label: t('extremeRisk'),
      dot: 'bg-purple-500',
    },
  };

  const currentRisk = riskConfig[riskLevel];

  // Handle found checkbox
  const handleFoundChange = (checked: boolean) => {
    setFound(checked);
    onFoundChange?.(id, checked);

    // Save to localStorage
    const key = `quickcard-found-${id}`;
    if (checked) {
      localStorage.setItem(key, 'true');
    } else {
      localStorage.removeItem(key);
    }
  };

  // Check localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const key = `quickcard-found-${id}`;
      const wasFound = localStorage.getItem(key) === 'true';
      if (wasFound && !found) {
        setFound(true);
        onFoundChange?.(id, true);
      }
    }
  }, []);

  // Toggle expand
  const toggleExpand = () => {
    if (details) {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <div
      className={`quick-card bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-lg overflow-hidden transition-all hover:border-slate-400 dark:hover:border-slate-700 ${className} ${
        found ? 'opacity-60' : ''
      }`}
    >
      {/* Main Card Content */}
      <div className="p-3">
        {/* Header Row */}
        <div className="flex items-start gap-3">
          {/* Found Checkbox */}
          <label className="flex items-center cursor-pointer group pt-0.5">
            <input
              type="checkbox"
              checked={found}
              onChange={(e) => handleFoundChange(e.target.checked)}
              className="sr-only peer focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
            />
            <div
              className={`w-5 h-5 rounded border-2 transition-all flex items-center justify-center ${
                found
                  ? 'bg-purple-500 border-purple-500'
                  : 'border-slate-400 dark:border-slate-600 group-hover:border-slate-500 dark:group-hover:border-slate-500 peer-focus-visible:ring-2 peer-focus-visible:ring-purple-500 peer-focus-visible:ring-offset-2 dark:peer-focus-visible:ring-offset-slate-900'
              }`}
            >
              {found && (
                <svg
                  className="w-3.5 h-3.5 text-white"
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
          </label>

          {/* Title and Description */}
          <div className="flex-1 min-w-0">
            <h3
              className={`font-semibold text-base leading-tight ${
                found
                  ? 'text-slate-400 dark:text-slate-500 line-through'
                  : 'text-slate-900 dark:text-slate-200'
              }`}
            >
              {title}
            </h3>
            {description && !isExpanded && (
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">
                {description}
              </p>
            )}
          </div>

          {/* Risk Level Badge */}
          {riskLevel && (
            <div
              className={`shrink-0 px-2.5 py-1 rounded-md border text-xs font-medium ${currentRisk.color}`}
            >
              <span className="flex items-center gap-1.5">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${currentRisk.dot}`}
                />
                {currentRisk.label}
              </span>
            </div>
          )}
        </div>

        {/* Metadata Row */}
        {(location || trigger) && !isExpanded && (
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 ml-8 text-xs text-slate-500 dark:text-slate-500">
            {location && (
              <span className="flex items-center gap-1.5">
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>{location}</span>
              </span>
            )}
            {trigger && (
              <span className="flex items-center gap-1.5">
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                <span>{trigger}</span>
              </span>
            )}
          </div>
        )}

        {/* Expand/Collapse Button */}
        {details && (
          <button
            onClick={toggleExpand}
            className="ml-8 mt-2 text-xs text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium transition-colors flex items-center gap-1"
          >
            <span>{isExpanded ? t('hideDetails') : t('showDetails')}</span>
            <svg
              className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Expanded Details */}
      {isExpanded && details && (
        <div className="px-3 pb-3 border-t border-slate-300 dark:border-slate-800 mt-2 pt-3">
          <div className="ml-8 text-sm text-slate-700 dark:text-slate-300 space-y-2">
            {details}
          </div>
        </div>
      )}
    </div>
  );
}
