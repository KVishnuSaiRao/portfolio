'use client';

import React, { useState } from 'react';
import useSWR from 'swr';
import { Loader2 } from 'lucide-react';
import { StockData } from '@/app/lib/types';
import { columns } from '@/app/components/portfolio/columns';
import { PortfolioDataTable } from '@/app/components/portfolio/data-table';
import { PortfolioCharts } from '@/app/components/portfolio/portfolio-charts';
import { DashboardHeader } from './components/portfolio/header';
import { DashboardTabs } from './components/portfolio/tabs';


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
        
        <DashboardHeader 
          isValidating={isValidating} 
          onRefresh={() => mutate()} 
        />

        <DashboardTabs 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
        />

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