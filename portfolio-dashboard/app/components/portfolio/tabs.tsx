import React from 'react';
import { Table2, PieChart } from 'lucide-react';

type TabType = 'table' | 'charts';

interface DashboardTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export function DashboardTabs({ activeTab, onTabChange }: DashboardTabsProps) {
  return (
    <div className="flex space-x-1 bg-gray-200 p-1 rounded-lg w-fit mb-6">
      <TabButton 
        isActive={activeTab === 'table'} 
        onClick={() => onTabChange('table')}
        icon={<Table2 size={16} />}
        label="Holdings Table"
      />
      <TabButton 
        isActive={activeTab === 'charts'} 
        onClick={() => onTabChange('charts')}
        icon={<PieChart size={16} />}
        label="Analytics & Charts"
      />
    </div>
  );
}

function TabButton({ 
  isActive, 
  onClick, 
  icon, 
  label 
}: { 
  isActive: boolean; 
  onClick: () => void; 
  icon: React.ReactNode; 
  label: string; 
}) {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all cursor-pointer
        ${isActive 
          ? 'bg-white text-gray-900 shadow-sm' 
          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/50'}
      `}
    >
      {icon}
      {label}
    </button>
  );
}