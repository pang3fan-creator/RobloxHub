'use client';

import React from 'react';

/**
 * Custom table components for MDX
 * Ensures proper table rendering with responsive support
 */

export function Table({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto my-6">
      <table className="w-full border-collapse">
        {children}
      </table>
    </div>
  );
}

export function THead({ children }: { children: React.ReactNode }) {
  return (
    <thead className="border-t-2 border-slate-600 bg-slate-800/50">
      {children}
    </thead>
  );
}

export function TBody({ children }: { children: React.ReactNode }) {
  return <tbody>{children}</tbody>;
}

export function TR({ children }: { children: React.ReactNode }) {
  return (
    <tr className="hover:bg-slate-800/30 transition-colors">
      {children}
    </tr>
  );
}

export function TH({ children }: { children: React.ReactNode }) {
  return (
    <th className="border-b border-slate-700 py-3 px-4 text-left font-bold text-slate-100">
      {children}
    </th>
  );
}

export function TD({ children }: { children: React.ReactNode }) {
  return (
    <td className="border-b border-slate-800 py-3 px-4 text-slate-300">
      {children}
    </td>
  );
}
