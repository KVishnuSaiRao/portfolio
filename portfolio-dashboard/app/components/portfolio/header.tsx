import React from 'react';
import { RefreshCw } from 'lucide-react';
import { StatusBadge } from '@/app/components/portfolio/status-badge';

interface DashboardHeaderProps {
  isValidating: boolean;
  onRefresh: () => void;
}

export function DashboardHeader({ isValidating, onRefresh }: DashboardHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Portfolio Dashboard</h1>
        <p className="text-gray-500 text-sm">Real-time Yahoo & Google Finance Data</p>
      </div>
      
      <div className="flex items-center gap-4">
        <StatusBadge isValidating={isValidating} />
        
        <button
          onClick={onRefresh}
          className="p-2 bg-white border border-gray-200 rounded-full hover:bg-gray-100 transition shadow-sm"
          title="Refresh Data"
        >
          <RefreshCw 
            size={16} 
            className={isValidating ? 'animate-spin text-blue-600' : 'text-gray-600'} 
          />
        </button>
      </div>
    </div>
  );
}