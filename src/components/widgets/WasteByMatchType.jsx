import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const WasteByMatchType = ({ data }) => {
  const COLORS = {
    'BROAD': '#ef4444',
    'PHRASE': '#f59e0b',
    'EXACT': '#22c55e'
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <div className="font-semibold text-gray-900 mb-2">{data.name}</div>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between space-x-4">
              <span className="text-gray-600">Waste Amount:</span>
              <span className="font-medium">${data.value.toLocaleString()}</span>
            </div>
            <div className="flex justify-between space-x-4">
              <span className="text-gray-600">Percentage:</span>
              <span className="font-medium">{data.payload.percentage}%</span>
            </div>
            <div className="flex justify-between space-x-4">
              <span className="text-gray-600">Keywords:</span>
              <span className="font-medium">{data.payload.keywords}</span>
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
          Waste Distribution by Match Type
        </h3>
        <p className="text-sm text-gray-600">
          Identify which match types generate the most waste
        </p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percentage }) => `${name}: ${percentage}%`}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>

      <div className="mt-6 space-y-3">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div
                className="w-4 h-4 rounded"
                style={{ backgroundColor: COLORS[item.name] }}
              ></div>
              <div>
                <div className="font-medium text-gray-900">{item.name} Match</div>
                <div className="text-sm text-gray-600">
                  {item.keywords} keywords • {item.searchTerms} search terms
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-gray-900">
                ${item.value.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">
                {item.percentage}% of total waste
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200 bg-yellow-50 rounded-lg p-4">
        <div className="flex items-start space-x-2">
          <div className="text-warning-600 text-2xl">⚠️</div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-1">
              Match Type Recommendation
            </h4>
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Broad match</span> keywords account for{' '}
              <span className="font-bold text-danger-600">
                {data.find(d => d.name === 'BROAD')?.percentage}%
              </span>{' '}
              of waste. Consider:
            </p>
            <ul className="text-sm text-gray-700 mt-2 space-y-1 ml-4 list-disc">
              <li>Converting high-waste broad keywords to phrase or exact match</li>
              <li>Adding negative keywords to filter irrelevant traffic</li>
              <li>Using broad match modifier (+keyword) for better control</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WasteByMatchType;

/**
 * API FIELDS REQUIRED:
 *
 * Google Ads API (keyword_view aggregated by match type):
 * - ad_group_criterion.keyword.match_type (BROAD, PHRASE, EXACT, BROAD_MATCH_MODIFIER)
 * - metrics.cost_micros (for calculating waste)
 * - metrics.conversions (to identify waste: conversions = 0)
 * - metrics.clicks
 * - ad_group_criterion.keyword.text (for counting keywords)
 * - search_term_view.search_term (for counting search terms)
 *
 * Query Structure:
 * SELECT
 *   ad_group_criterion.keyword.match_type,
 *   COUNT(DISTINCT ad_group_criterion.keyword.text) as keywords_count,
 *   COUNT(DISTINCT search_term_view.search_term) as search_terms_count,
 *   SUM(CASE WHEN metrics.conversions = 0 THEN metrics.cost_micros ELSE 0 END) / 1000000 as waste_amount,
 *   SUM(metrics.cost_micros) / 1000000 as total_cost
 * FROM keyword_view
 * LEFT JOIN search_term_view USING (ad_group_criterion.criterion_id)
 * WHERE segments.date DURING LAST_30_DAYS
 * GROUP BY ad_group_criterion.keyword.match_type
 *
 * Calculated Metrics:
 * - waste_percentage = (waste_amount / total_waste_across_all_types) * 100
 * - waste_ratio = waste_amount / total_cost (for that match type)
 *
 * Match Type Definitions:
 * - BROAD: Keyword triggers ads for searches including misspellings, synonyms, related searches
 * - PHRASE: Keyword triggers ads for searches that include the meaning of your keyword
 * - EXACT: Keyword triggers ads for searches that match the exact meaning
 * - BROAD_MATCH_MODIFIER: (Legacy) +keyword format for more control than broad
 *
 * Expected Results:
 * - BROAD typically has highest waste (40-60% of total waste)
 * - PHRASE has moderate waste (25-35%)
 * - EXACT has lowest waste (10-20%)
 */
