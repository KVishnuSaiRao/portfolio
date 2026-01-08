'use client';

import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend
} from 'recharts';
import { StockData } from '@/app/lib/types';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

interface PortfolioChartsProps {
  data: StockData[];
}

export function PortfolioCharts({ data }: PortfolioChartsProps) {
  
  const sectorData = React.useMemo(() => {
    const sectors: Record<string, number> = {};
    data.forEach(stock => {
      sectors[stock.sector] = (sectors[stock.sector] || 0) + stock.presentValue;
    });
    
    return Object.keys(sectors).map(sector => ({
      name: sector,
      value: sectors[sector],
    }));
  }, [data]);
  const performanceData = React.useMemo(() => {
    return [...data]
      .sort((a, b) => b.gainLoss - a.gainLoss)
      .map(stock => ({
        name: stock.ticker.split('.')[0], 
        gainLoss: stock.gainLoss,
        investment: stock.investment
      }));
  }, [data]);

  const formatCurrency = (val: number | string | undefined) => {
    if (val === undefined || val === null || typeof val !== 'number') return '';
    return `₹${val.toLocaleString('en-IN')}`;
  };

  if (!data || data.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Sector Allocation (Current Value)</h3>
        <div className="h-75 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={sectorData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {sectorData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: any) => formatCurrency(value)} />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Top Gainers & Losers</h3>
        <div className="h-75 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={performanceData}
              layout="vertical" // Horizontal bars are easier to read for names
              margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" hide />
              <YAxis 
                type="category" 
                dataKey="name" 
                width={80} 
                tick={{fontSize: 10}} 
                interval={0}
              />
              <Tooltip 
                cursor={{fill: 'transparent'}}
                formatter={(value: any) => [formatCurrency(value), 'Gain/Loss']}
              />
              <Bar dataKey="gainLoss" radius={[0, 4, 4, 0]}>
                {performanceData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.gainLoss >= 0 ? '#16a34a' : '#dc2626'} // Green for profit, Red for loss
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}