import React, { useState } from 'react';
import { AlertTriangle, ArrowUpDown, Download, Plus, X } from 'lucide-react';

const IntentMismatchTable = ({ data }) => {
  const [sortField, setSortField] = useState('waste');
  const [sortDirection, setSortDirection] = useState('desc');
  const [selectedRows, setSelectedRows] = useState([]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedData = [...data].sort((a, b) => {
    const multiplier = sortDirection === 'asc' ? 1 : -1;
    return (a[sortField] - b[sortField]) * multiplier;
  });

  const toggleRowSelection = (id) => {
    setSelectedRows(prev =>
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    );
  };

  const getIntentBadge = (intent) => {
    const badges = {
      'Informational': 'badge-info',
      'Transactional': 'badge-success',
      'Navigational': 'badge-warning'
    };
    return badges[intent] || 'badge-info';
  };

  const getMatchScore = (score) => {
    if (score < 40) return { color: 'text-danger-600', bg: 'bg-danger-100' };
    if (score < 70) return { color: 'text-warning-600', bg: 'bg-warning-100' };
    return { color: 'text-success-600', bg: 'bg-success-100' };
  };

  return (
    <div className="card">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Search Term Intent Mismatches
          </h3>
          <p className="text-sm text-gray-600">
            Search terms that don't align with target keyword intent
          </p>
        </div>
        <div className="flex space-x-2">
          <button
            className="btn-secondary text-sm flex items-center space-x-2"
            disabled={selectedRows.length === 0}
          >
            <Plus className="w-4 h-4" />
            <span>Add as Negative ({selectedRows.length})</span>
          </button>
          <button className="btn-secondary text-sm flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left">
                <input
                  type="checkbox"
                  className="rounded"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedRows(data.map(row => row.id));
                    } else {
                      setSelectedRows([]);
                    }
                  }}
                />
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('searchTerm')}
              >
                <div className="flex items-center space-x-1">
                  <span>Search Term</span>
                  <ArrowUpDown className="w-4 h-4" />
                </div>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Target Keyword
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Match Type
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Intent
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('intentMatch')}
              >
                <div className="flex items-center space-x-1">
                  <span>Match Score</span>
                  <ArrowUpDown className="w-4 h-4" />
                </div>
              </th>
              <th
                className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('waste')}
              >
                <div className="flex items-center justify-end space-x-1">
                  <span>Wasted</span>
                  <ArrowUpDown className="w-4 h-4" />
                </div>
              </th>
              <th
                className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('clicks')}
              >
                <div className="flex items-center justify-end space-x-1">
                  <span>Clicks</span>
                  <ArrowUpDown className="w-4 h-4" />
                </div>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedData.map((row) => {
              const matchStyle = getMatchScore(row.intentMatch);
              return (
                <tr
                  key={row.id}
                  className={`hover:bg-gray-50 ${selectedRows.includes(row.id) ? 'bg-primary-50' : ''}`}
                >
                  <td className="px-4 py-4">
                    <input
                      type="checkbox"
                      className="rounded"
                      checked={selectedRows.includes(row.id)}
                      onChange={() => toggleRowSelection(row.id)}
                    />
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center space-x-2">
                      {row.intentMatch < 50 && (
                        <AlertTriangle className="w-4 h-4 text-danger-500" />
                      )}
                      <span className="text-sm font-medium text-gray-900">
                        {row.searchTerm}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600">
                    {row.keyword}
                  </td>
                  <td className="px-4 py-4">
                    <span className="badge badge-info text-xs">
                      {row.matchType}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`badge ${getIntentBadge(row.intent)} text-xs`}>
                      {row.intent}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center space-x-2">
                      <div className={`px-2 py-1 rounded ${matchStyle.bg}`}>
                        <span className={`text-sm font-semibold ${matchStyle.color}`}>
                          {row.intentMatch}%
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <span className="text-sm font-semibold text-danger-600">
                      ${row.waste.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right text-sm text-gray-600">
                    {row.clicks.toLocaleString()}
                  </td>
                  <td className="px-4 py-4">
                    <button className="text-danger-600 hover:text-danger-700 text-sm font-medium">
                      Exclude
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
        <div className="text-sm text-gray-600">
          Showing {data.length} mismatched terms • Total waste: ${data.reduce((sum, row) => sum + row.waste, 0).toLocaleString()}
        </div>
        <div className="flex space-x-2">
          <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
            Previous
          </button>
          <button className="px-3 py-1 text-sm bg-primary-600 text-white rounded hover:bg-primary-700">
            1
          </button>
          <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
            2
          </button>
          <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default IntentMismatchTable;

/**
 * API FIELDS REQUIRED:
 *
 * Google Ads API (search_term_view):
 * - search_term_view.search_term (user's actual query)
 * - ad_group_criterion.keyword.text (target keyword)
 * - ad_group_criterion.keyword.match_type (BROAD, PHRASE, EXACT)
 * - metrics.clicks
 * - metrics.impressions
 * - metrics.cost_micros
 * - metrics.conversions
 * - metrics.ctr
 * - campaign.name
 * - ad_group.name
 * - search_term_view.status (ADDED, EXCLUDED, NONE)
 *
 * Derived Fields (Backend Processing):
 * - intent_classification: NLP analysis of search_term
 *   • Informational: contains "how", "what", "why", "guide", "tips"
 *   • Transactional: contains "buy", "price", "discount", "deal", "shop"
 *   • Navigational: contains brand names, "login", "account", "website"
 *
 * - intent_match_score: Semantic similarity between search_term and keyword
 *   • Use NLP embeddings (BERT, Word2Vec) or APIs like OpenAI Embeddings
 *   • Calculate cosine similarity: score = (0-100)
 *   • Low score (<60%) = mismatch
 *
 * - waste_amount: cost_micros WHERE conversions = 0
 *
 * Query Structure:
 * SELECT
 *   search_term_view.search_term,
 *   ad_group_criterion.keyword.text,
 *   ad_group_criterion.keyword.match_type,
 *   metrics.clicks,
 *   metrics.cost_micros,
 *   metrics.conversions
 * FROM search_term_view
 * WHERE
 *   metrics.conversions = 0
 *   AND metrics.cost_micros > 0
 *   AND search_term_view.status = 'NONE'
 * ORDER BY metrics.cost_micros DESC
 * LIMIT 1000
 *
 * Actions Available:
 * - Add as negative keyword: POST to ad_group_criterion with negative=true
 * - Exclude at campaign level: POST to campaign_criterion
 * - Pause keyword: PATCH ad_group_criterion.status = PAUSED
 */
