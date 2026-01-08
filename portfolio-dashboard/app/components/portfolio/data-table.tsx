'use client';

import React, { useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getGroupedRowModel,
  getExpandedRowModel,
  flexRender,
  ColumnDef,
  GroupingState,
} from '@tanstack/react-table';
import { ChevronRight, ChevronDown } from 'lucide-react';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function PortfolioDataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [grouping, setGrouping] = useState<GroupingState>(['sector']);
  const [expanded, setExpanded] = useState({});

  const table = useReactTable({
    data,
    columns,
    state: { grouping, expanded },
    onGroupingChange: setGrouping,
    onExpandedChange: setExpanded,
    getCoreRowModel: getCoreRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  });
console.log('table==',table);

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col">
      <div className="overflow-auto max-h-[70vh] w-full">
        <table className="w-full text-left text-sm border-collapse min-w-250">
          <thead className="bg-gray-100 text-gray-500 text-xs uppercase font-semibold sticky top-0 z-10 shadow-sm">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th 
                    key={header.id} 
                    className="px-4 py-3 border-b whitespace-nowrap bg-gray-100"
                  >
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody className="divide-y divide-gray-100">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className={`hover:bg-gray-50 transition ${row.getIsGrouped() ? 'bg-gray-50' : 'bg-white'}`}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td key={cell.id} className="px-4 py-3 whitespace-nowrap">
                      {cell.getIsGrouped() ? (
                        <button
                          onClick={row.getToggleExpandedHandler()}
                          className="flex items-center gap-2 font-bold text-gray-800 hover:text-blue-600"
                        >
                          {row.getIsExpanded() ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          <span className="text-gray-400 font-normal text-xs ml-2">({row.subRows.length})</span>
                        </button>
                      ) : cell.getIsAggregated() ? (
                        flexRender(cell.column.columnDef.aggregatedCell ?? cell.column.columnDef.cell, cell.getContext())
                      ) : cell.getIsPlaceholder() ? null : (
                        flexRender(cell.column.columnDef.cell, cell.getContext())
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}