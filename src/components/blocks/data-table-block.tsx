"use client";

import { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  SortingState,
  ColumnDef,
} from "@tanstack/react-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TableBlockData, TableColumn } from "@/types";
import { cn } from "@/lib/utils";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";

interface DataTableBlockProps {
  data: TableBlockData;
}

export function DataTableBlock({ data }: DataTableBlockProps) {
  const { title, columns, rows } = data;
  const [sorting, setSorting] = useState<SortingState>([]);

  const tableColumns: ColumnDef<Record<string, string | number>>[] = columns.map((col: TableColumn) => ({
    accessorKey: col.key,
    header: ({ column }: { column: import("@tanstack/react-table").Column<Record<string, string | number>> }) => (
      <button
        className={cn(
          "flex items-center gap-1.5 text-xs font-medium text-zinc-400 hover:text-zinc-200 transition-colors group",
          col.align === "right" && "ml-auto",
          col.align === "center" && "mx-auto"
        )}
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        {col.label}
        {column.getIsSorted() === "asc" ? (
          <ArrowUp className="w-3 h-3 text-violet-400" />
        ) : column.getIsSorted() === "desc" ? (
          <ArrowDown className="w-3 h-3 text-violet-400" />
        ) : (
          <ArrowUpDown className="w-3 h-3 opacity-0 group-hover:opacity-50 transition-opacity" />
        )}
      </button>
    ),
    cell: ({ getValue }: { getValue: () => unknown }) => (
      <span
        className={cn(
          "text-sm text-zinc-300",
          col.align === "right" && "block text-right",
          col.align === "center" && "block text-center"
        )}
      >
        {String(getValue())}
      </span>
    ),
  }));

  const table = useReactTable({
    data: rows,
    columns: tableColumns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="border-b border-white/5">
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-4 py-2.5 text-left bg-white/[0.02] first:pl-6 last:pr-6"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row, idx) => (
                <tr
                  key={row.id}
                  className={cn(
                    "border-b border-white/[0.03] transition-colors hover:bg-white/[0.03]",
                    idx % 2 === 0 ? "bg-transparent" : "bg-white/[0.01]"
                  )}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-3 first:pl-6 last:pr-6">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
              {table.getRowModel().rows.length === 0 && (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-6 py-8 text-center text-sm text-zinc-500"
                  >
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
