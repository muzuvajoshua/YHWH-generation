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
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";

interface DataTableBlockProps {
  data: TableBlockData;
}

export function DataTableBlock({ data }: DataTableBlockProps) {
  const { title, columns, rows } = data;
  const [sorting, setSorting] = useState<SortingState>([]);

  const tableColumns: ColumnDef<Record<string, string | number>>[] = columns.map(
    (col: TableColumn) => ({
      accessorKey: col.key,
      header: ({
        column,
      }: {
        column: import("@tanstack/react-table").Column<Record<string, string | number>>;
      }) => (
        <button
          className={cn(
            "group/sort inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-zinc-500 hover:text-zinc-200 transition-colors",
            col.align === "right" && "w-full justify-end",
            col.align === "center" && "w-full justify-center"
          )}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {col.label}
          {column.getIsSorted() === "asc" ? (
            <ArrowUp className="w-3 h-3 text-violet-300" />
          ) : column.getIsSorted() === "desc" ? (
            <ArrowDown className="w-3 h-3 text-violet-300" />
          ) : (
            <ArrowUpDown className="w-3 h-3 opacity-0 group-hover/sort:opacity-50 transition-opacity" />
          )}
        </button>
      ),
      cell: ({ getValue }: { getValue: () => unknown }) => (
        <span
          className={cn(
            "text-[13px] text-zinc-300 numeric",
            col.align === "right" && "block text-right",
            col.align === "center" && "block text-center"
          )}
        >
          {String(getValue())}
        </span>
      ),
    })
  );

  const table = useReactTable({
    data: rows,
    columns: tableColumns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="px-0 pb-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr
                  key={headerGroup.id}
                  className="border-y border-white/[0.06] bg-white/[0.015]"
                >
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-4 py-2.5 text-left first:pl-5 last:pr-5"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-white/[0.04] last:border-0 transition-colors hover:bg-white/[0.025]"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-4 py-3 first:pl-5 last:pr-5"
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
              {table.getRowModel().rows.length === 0 && (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-5 py-10 text-center text-[13px] text-zinc-500"
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
