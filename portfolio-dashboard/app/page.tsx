'use client';

import React, { useState } from 'react';
import useSWR from 'swr';
import { Loader2, RefreshCw, Table2, PieChart } from 'lucide-react';
import { StockData } from '@/app/lib/types';
import { columns } from '@/app/components/portfolio/columns';
import { PortfolioDataTable } from '@/app/components/portfolio/data-table';
import { StatusBadge } from '@/app/components/portfolio/status-badge';
import { PortfolioCharts } from '@/app/components/portfolio/portfolio-charts';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function PortfolioDashboard() {
  const { data, error, isLoading, isValidating, mutate } = useSWR<StockData[]>(
    '/api/portfolio',
    fetcher,
    { refreshInterval: 15000, revalidateOnFocus: false }
  );

  const [activeTab, setActiveTab] = useState<'table' | 'charts'>('table');

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      <div className="max-w-1600px mx-auto">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Portfolio Dashboard</h1>
            <p className="text-gray-500 text-sm">Real-time Yahoo & Google Finance Data</p>
          </div>
          
          <div className="flex items-center gap-4">
            <StatusBadge isValidating={isValidating} />
            
            <button
              onClick={() => mutate()}
              className="p-2 bg-white border border-gray-200 rounded-full hover:bg-gray-100 transition shadow-sm"
              title="Refresh Data"
            >
              <RefreshCw size={16} className={isValidating ? 'animate-spin text-blue-600' : 'text-gray-600'} />
            </button>
          </div>
        </div>

        <div className="flex space-x-1 bg-gray-200 p-1 rounded-lg w-fit mb-6">
          <button
            onClick={() => setActiveTab('table')}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all cursor-pointer
              ${activeTab === 'table' 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/50'}
            `}
          >
            <Table2 size={16} />
            Holdings Table
          </button>
          <button
            onClick={() => setActiveTab('charts')}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all cursor-pointer
              ${activeTab === 'charts' 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/50'}
            `}
          >
            <PieChart size={16} />
            Analytics & Charts
          </button>
        </div>

        {isLoading && !data ? (
          <div className="flex justify-center py-20 text-gray-400">
            <Loader2 className="animate-spin w-8 h-8 mr-2" /> Loading Portfolio Data...
          </div>
        ) : error ? (
           <div className="p-4 bg-red-50 text-red-600 rounded border border-red-100">
             Error loading data. Please check your API connection.
           </div>
        ) : (
          <div className="animate-in fade-in zoom-in duration-300">
            {activeTab === 'table' ? (
              <PortfolioDataTable columns={columns} data={data || []} />
            ) : (
              <PortfolioCharts data={data || []} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}