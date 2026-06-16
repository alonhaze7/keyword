import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ZAxis } from 'recharts';

const KeywordPerformanceMatrix = ({ data }) => {
  const getColor = (conversionRate) => {
    if (conversionRate === 0) return '#ef4444'; // Red - No conversions
    if (conversionRate < 2) return '#f59e0b'; // Orange - Low conversions
    if (conversionRate < 5) return '#3b82f6'; // Blue - Medium conversions
    return '#22c55e'; // Green - High conversions
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <div className="font-semibold text-gray-900 mb-2">{data.keyword}</div>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Cost:</span>
              <span className="font-medium">${data.cost.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Clicks:</span>
              <span className="font-medium">{data.clicks}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Conversions:</span>
              <span className="font-medium">{data.conversions}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Conv. Rate:</span>
              <span className="font-medium">{data.conversionRate.toFixed(2)}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">CPA:</span>
              <span className="font-medium">${data.cpa.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Match Type:</span>
              <span className="badge badge-info text-xs">{data.matchType}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="card">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Keyword Performance Matrix
        </h3>
        <p className="text-sm text-gray-600">
          Cost vs. Clicks analysis - Bubble size represents conversion volume
        </p>
      </div>

      <ResponsiveContainer width="100%" height={500}>
        <ScatterChart
          margin={{ top: 20, right: 20, bottom: 60, left: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            type="number"
            dataKey="clicks"
            name="Clicks"
            label={{ value: 'Number of Clicks', position: 'bottom', offset: 40 }}
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
          />
          <YAxis
            type="number"
            dataKey="cost"
            name="Cost"
            label={{ value: 'Cost ($)', angle: -90, position: 'insideLeft', offset: 40 }}
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
            tickFormatter={(value) => `$${value}`}
          />
          <ZAxis
            type="number"
            dataKey="conversions"
            range={[50, 1000]}
            name="Conversions"
          />
          <Tooltip content={<CustomTooltip />} />
          <Scatter data={data} name="Keywords">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getColor(entry.conversionRate)} />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-semibold text-gray-900">Legend</h4>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-danger-500"></div>
            <span className="text-sm text-gray-700">
              <span className="font-medium">0% Conv Rate</span> - High Waste
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-warning-500"></div>
            <span className="text-sm text-gray-700">
              <span className="font-medium">&lt;2% Conv Rate</span> - Needs Optimization
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-primary-500"></div>
            <span className="text-sm text-gray-700">
              <span className="font-medium">2-5% Conv Rate</span> - Moderate
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-success-500"></div>
            <span className="text-sm text-gray-700">
              <span className="font-medium">&gt;5% Conv Rate</span> - Performing Well
            </span>
          </div>
        </div>
        <div className="mt-4 bg-gray-50 rounded-lg p-4">
          <div className="text-sm text-gray-700">
            <span className="font-semibold">💡 Insights:</span> Focus on
            <span className="text-danger-600 font-semibold"> red bubbles</span> (high cost, no conversions) in the upper-right quadrant
            - these are your biggest waste opportunities. Large bubbles with low conversion rates indicate
            keywords getting traffic but not converting efficiently.
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeywordPerformanceMatrix;

/**
 * API FIELDS REQUIRED:
 *
 * Google Ads API (keyword_view or search_term_view aggregated):
 * - ad_group_criterion.keyword.text (or search_term_view.search_term)
 * - ad_group_criterion.keyword.match_type
 * - metrics.clicks (X-axis)
 * - metrics.cost_micros (Y-axis, converted to dollars)
 * - metrics.conversions (Z-axis for bubble size)
 * - metrics.impressions
 * - ad_group.name
 * - campaign.name
 *
 * Derived Metrics:
 * - conversion_rate = (conversions / clicks) * 100
 * - cpa = cost_micros / conversions (if conversions > 0, else Infinity)
 * - bubble_size = conversions (determines visual size)
 *
 * Query Structure:
 * SELECT
 *   ad_group_criterion.keyword.text,
 *   ad_group_criterion.keyword.match_type,
 *   SUM(metrics.clicks) as clicks,
 *   SUM(metrics.cost_micros) / 1000000 as cost,
 *   SUM(metrics.conversions) as conversions,
 *   (SUM(metrics.conversions) / SUM(metrics.clicks)) * 100 as conversion_rate,
 *   (SUM(metrics.cost_micros) / 1000000) / SUM(metrics.conversions) as cpa
 * FROM keyword_view
 * WHERE
 *   segments.date DURING LAST_30_DAYS
 *   AND metrics.clicks > 10
 * GROUP BY
 *   ad_group_criterion.keyword.text,
 *   ad_group_criterion.keyword.match_type
 * ORDER BY metrics.cost_micros DESC
 * LIMIT 100
 *
 * Quadrant Analysis:
 * - Top-Right (High Cost, High Clicks): Identify if conversions justify spend
 * - Top-Left (High Cost, Low Clicks): High CPC keywords - check relevance
 * - Bottom-Right (Low Cost, High Clicks): Efficient keywords - scale these
 * - Bottom-Left (Low Cost, Low Clicks): Low impact - monitor or pause
 */
