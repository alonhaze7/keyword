import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';

const SearchTermCloud = ({ data }) => {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const getWasteLevel = (waste) => {
    if (waste > 1000) return { level: 'critical', color: 'text-danger-600', bg: 'bg-danger-100 hover:bg-danger-200', size: 'text-2xl' };
    if (waste > 500) return { level: 'high', color: 'text-warning-600', bg: 'bg-warning-100 hover:bg-warning-200', size: 'text-xl' };
    if (waste > 200) return { level: 'medium', color: 'text-yellow-600', bg: 'bg-yellow-100 hover:bg-yellow-200', size: 'text-lg' };
    return { level: 'low', color: 'text-gray-600', bg: 'bg-gray-100 hover:bg-gray-200', size: 'text-base' };
  };

  const filteredData = data
    .filter(item => {
      if (filter !== 'all' && item.category !== filter) return false;
      if (searchQuery && !item.term.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => b.waste - a.waste);

  const categories = ['all', ...new Set(data.map(item => item.category))];

  return (
    <div className="card">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Wasted Search Terms Cloud
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Size indicates waste amount - Click to add as negative keyword
        </p>

        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search terms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'All Categories' : cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="min-h-[400px] bg-gray-50 rounded-lg p-6 flex flex-wrap gap-3 items-center justify-center">
        {filteredData.length === 0 ? (
          <div className="text-center text-gray-500 py-12">
            No search terms found matching your filters
          </div>
        ) : (
          filteredData.map((item, index) => {
            const style = getWasteLevel(item.waste);
            return (
              <button
                key={index}
                className={`px-4 py-2 rounded-full font-semibold ${style.bg} ${style.color} ${style.size} transition-all cursor-pointer border-2 border-transparent hover:border-gray-300 hover:scale-110`}
                title={`${item.term}\nWaste: $${item.waste.toLocaleString()}\nClicks: ${item.clicks}\nCategory: ${item.category}`}
              >
                {item.term}
              </button>
            );
          })
        )}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-4 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-danger-500"></div>
            <span className="text-gray-700">
              <span className="font-semibold">Critical</span> &gt;$1,000
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-warning-500"></div>
            <span className="text-gray-700">
              <span className="font-semibold">High</span> $500-$1,000
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span className="text-gray-700">
              <span className="font-semibold">Medium</span> $200-$500
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-gray-400"></div>
            <span className="text-gray-700">
              <span className="font-semibold">Low</span> &lt;$200
            </span>
          </div>
        </div>

        <div className="mt-4 bg-primary-50 rounded-lg p-3 flex items-center justify-between">
          <span className="text-sm text-gray-700">
            <span className="font-semibold">{filteredData.length} terms</span> shown •{' '}
            Total waste: <span className="font-bold text-danger-600">
              ${filteredData.reduce((sum, item) => sum + item.waste, 0).toLocaleString()}
            </span>
          </span>
          <button className="btn-primary text-sm">
            Add All as Negative Keywords
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchTermCloud;

/**
 * API FIELDS REQUIRED:
 *
 * Google Ads API (search_term_view):
 * - search_term_view.search_term (the actual search query)
 * - metrics.cost_micros (WHERE conversions = 0 for waste)
 * - metrics.conversions
 * - metrics.clicks
 * - metrics.impressions
 * - search_term_view.status (to check if already excluded)
 * - ad_group_criterion.keyword.text (parent keyword)
 *
 * Query Structure:
 * SELECT
 *   search_term_view.search_term as term,
 *   SUM(metrics.cost_micros) / 1000000 as waste,
 *   SUM(metrics.clicks) as clicks,
 *   COUNT(DISTINCT ad_group.id) as ad_groups_count
 * FROM search_term_view
 * WHERE
 *   metrics.conversions = 0
 *   AND search_term_view.status = 'NONE'
 *   AND metrics.cost_micros > 0
 *   AND segments.date DURING LAST_30_DAYS
 * GROUP BY search_term_view.search_term
 * ORDER BY waste DESC
 * LIMIT 100
 *
 * Categorization (optional, enhances filtering):
 * - Use NLP to categorize terms (same logic as TopWasteCategories)
 * - Categories: Informational, Competitor, Low-Quality, Intent Mismatch, etc.
 *
 * Visualization Logic:
 * - Font size proportional to waste amount
 * - Color based on waste severity
 * - Position: random or clustered by category
 *
 * Interactive Features:
 * - Click term → show details modal
 * - Hover → tooltip with waste, clicks, category
 * - Bulk select → add multiple as negative keywords
 *
 * Negative Keyword Creation:
 * When user clicks "Add as Negative":
 * POST to Google Ads API:
 * {
 *   "campaign_criterion": {
 *     "campaign": "customers/{customer_id}/campaigns/{campaign_id}",
 *     "keyword": {
 *       "text": "{search_term}",
 *       "match_type": "EXACT" // or PHRASE for broader exclusion
 *     },
 *     "negative": true
 *   }
 * }
 *
 * Best Practices:
 * - Group similar terms (e.g., "free X", "cheap X") into phrase match negatives
 * - Review terms manually before bulk adding
 * - Consider campaign vs ad group level exclusion
 */
