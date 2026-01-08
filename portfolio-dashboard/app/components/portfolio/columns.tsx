'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { StockData } from '@/app/lib/types';

const formatCurrency = (val: number) => 
  `₹${val.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;

export const columns: ColumnDef<StockData>[] = [
  {
    header: 'Sector',
    accessorKey: 'sector',
    enableGrouping: true,
  },
  {
    header: 'Particulars',
    accessorKey: 'name',
    cell: ({ row, getValue }) => (
      <div>
        <div className="font-bold text-gray-900">{getValue<string>()}</div>
        <div className="text-[10px] text-gray-400">{row.original.ticker}</div>
      </div>
    ),
  },
  
  {
    header: 'Pur. Price',
    accessorKey: 'buyPrice',
    cell: (info) => formatCurrency(info.getValue<number>()),
  },
  {
    header: 'Qty',
    accessorKey: 'qty',
  },
  {
    header: 'Investment', 
    accessorKey: 'investment',
    aggregationFn: 'sum',
    cell: (info) => formatCurrency(info.getValue<number>()),
    aggregatedCell: (info) => (
      <span className="font-bold text-gray-800">
         {formatCurrency(info.getValue<number>())}
      </span>
    ),
  },
  {
    header: 'Port %',
    accessorKey: 'portfolioWeight',
    cell: (info) => (
      <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs font-medium">
        {info.getValue<string>()}%
      </span>
    ),
  },
  {
    header: 'NSE/BSE',
    accessorKey: 'exchangeCode',
    cell: (info) => (
      <span className="text-[10px] font-bold text-gray-500 tracking-wider border border-gray-200 px-1 rounded">
        {info.getValue<string>()}
      </span>
    ),
  },
  {
    header: 'CMP',
    accessorKey: 'cmp',
    cell: (info) => (
      <span className="font-mono text-blue-600 font-medium">
        {info.getValue<number>().toFixed(2)}
      </span>
    ),
    aggregatedCell: () => null,
  },
  {
    header: 'Present Value',
    accessorKey: 'presentValue', 
    aggregationFn: 'sum',
    cell: (info) => formatCurrency(info.getValue<number>()),
    aggregatedCell: (info) => (
      <span className="font-bold text-gray-800">
         {formatCurrency(info.getValue<number>())}
      </span>
    ),
  },
  {
    header: 'Gain/Loss',
    accessorKey: 'gainLoss', 
    aggregationFn: 'sum',
    cell: (info) => {
      const val = info.getValue<number>();
      const pct = info.row.original.gainLossPercent;

      return (
        <div className={`flex flex-col ${val >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          <div className="flex items-center gap-1 font-medium">
            {val >= 0 ? <ArrowUpRight size={14}/> : <ArrowDownRight size={14}/>}
            <span>{Math.abs(val).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
          </div>
          <span className="text-xs opacity-75">({pct.toFixed(1)}%)</span>
        </div>
      );
    },
    aggregatedCell: (info) => {
      const val = info.getValue<number>();
      return (
        <span className={val >= 0 ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>
           {val > 0 ? '+' : ''}{val.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
        </span>
      );
    },
  },
  {
    header: 'P/E Ratio',
    accessorKey: 'pe',
    cell: (info) => <span className="text-xs">{info.getValue<string>()}</span>,
    aggregatedCell: () => null,
  },
  {
    header: 'Earnings',
    accessorKey: 'earnings',
    cell: (info) => <span className="text-xs">{info.getValue<string>()}</span>,
  },
];



