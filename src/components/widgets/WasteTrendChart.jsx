import React from 'react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const WasteTrendChart = ({ data }) => {
  return (
    <div className="card">
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Waste Spend Trend (Last 30 Days)
            </h3>
            <p className="text-sm text-gray-600">
              Track wasted spend patterns over time to identify trends
            </p>
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 text-sm bg-primary-100 text-primary-700 rounded-lg font-medium">
              Daily
            </button>
            <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">
              Weekly
            </button>
            <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">
              Monthly
            </button>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorWaste" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="date"
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
          />
          <YAxis
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              padding: '12px'
            }}
            formatter={(value) => `$${value.toLocaleString()}`}
          />
          <Legend />
          <Area
            type="monotone"
            dataKey="totalSpend"
            stroke="#3b82f6"
            strokeWidth={2}
            fill="url(#colorTotal)"
            name="Total Spend"
          />
          <Area
            type="monotone"
            dataKey="wastedSpend"
            stroke="#ef4444"
            strokeWidth={2}
            fill="url(#colorWaste)"
            name="Wasted Spend"
          />
        </AreaChart>
      </ResponsiveContainer>

      <div className="mt-4 grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
        <div>
          <div className="text-sm text-gray-600">Peak Waste Day</div>
          <div className="text-lg font-bold text-danger-600">
            {data.reduce((max, day) => day.wastedSpend > max.wastedSpend ? day : max, data[0]).date}
          </div>
          <div className="text-sm text-gray-500">
            ${data.reduce((max, day) => Math.max(max, day.wastedSpend), 0).toLocaleString()}
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-600">Avg Daily Waste</div>
          <div className="text-lg font-bold text-warning-600">
            ${Math.round(data.reduce((sum, day) => sum + day.wastedSpend, 0) / data.length).toLocaleString()}
          </div>
          <div className="text-sm text-gray-500">
            {((data.reduce((sum, day) => sum + day.wastedSpend, 0) / data.reduce((sum, day) => sum + day.totalSpend, 0)) * 100).toFixed(1)}% of spend
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-600">Trend Direction</div>
          <div className="text-lg font-bold text-success-600">
            ↓ Decreasing
          </div>
          <div className="text-sm text-gray-500">
            -8.2% vs last period
          </div>
        </div>
      </div>
    </div>
  );
};

export default WasteTrendChart;

/**
 * API FIELDS REQUIRED:
 *
 * Google Ads API (time series query):
 * - segments.date (DATE format: YYYY-MM-DD)
 * - metrics.cost_micros (total spend per day)
 * - metrics.conversions (to calculate waste)
 * - metrics.clicks
 *
 * Query Structure:
 * SELECT
 *   segments.date,
 *   SUM(metrics.cost_micros) as total_cost,
 *   SUM(CASE WHEN metrics.conversions = 0 THEN metrics.cost_micros ELSE 0 END) as wasted_cost,
 *   SUM(CASE WHEN metrics.conversions = 0 THEN metrics.clicks ELSE 0 END) as wasted_clicks
 * FROM search_term_view
 * WHERE segments.date DURING LAST_30_DAYS
 * GROUP BY segments.date
 * ORDER BY segments.date ASC
 *
 * Additional metrics for trend analysis:
 * - segments.day_of_week (to identify day-of-week patterns)
 * - campaign.advertising_channel_type (to break down by channel)
 */
