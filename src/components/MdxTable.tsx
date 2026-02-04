"use client";

import React from "react";

/**
 * Custom table components for MDX
 * Ensures proper table rendering with responsive support
 */

export function Table({
  children,
  ...props
}: React.TableHTMLAttributes<HTMLTableElement>) {
  return (
    <div className="overflow-x-auto my-6">
      <table className="w-full border-collapse" {...props}>
        {children}
      </table>
    </div>
  );
}

export function THead({
  children,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead className="border-t-2 border-slate-600 bg-slate-800/50" {...props}>
      {children}
    </thead>
  );
}

export function TBody({
  children,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody {...props}>{children}</tbody>;
}

export function TR({
  children,
  ...props
}: React.HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr className="hover:bg-slate-800/30 transition-colors" {...props}>
      {children}
    </tr>
  );
}

export function TH({
  children,
  ...props
}: React.ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      className="border-b border-slate-700 py-3 px-4 text-left font-bold text-slate-100"
      {...props}
    >
      {children}
    </th>
  );
}

export function TD({
  children,
  ...props
}: React.TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td
      className="border-b border-slate-800 py-3 px-4 text-slate-300"
      {...props}
    >
      {children}
    </td>
  );
}
