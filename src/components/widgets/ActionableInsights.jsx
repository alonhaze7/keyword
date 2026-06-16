import React from 'react';
import { AlertCircle, TrendingUp, Target, Zap, CheckCircle, XCircle } from 'lucide-react';

const ActionableInsights = ({ data }) => {
  const getIcon = (type) => {
    switch (type) {
      case 'critical':
        return AlertCircle;
      case 'opportunity':
        return TrendingUp;
      case 'recommendation':
        return Target;
      case 'quick-win':
        return Zap;
      default:
        return AlertCircle;
    }
  };

  const getSeverityClass = (severity) => {
    switch (severity) {
      case 'critical':
        return 'insight-critical';
      case 'high':
        return 'insight-warning';
      case 'medium':
        return 'bg-yellow-50 border-l-yellow-500';
      case 'low':
        return 'insight-success';
      default:
        return 'insight-card';
    }
  };

  return (
    <div className="space-y-4">
      {data.map((insight, index) => {
        const Icon = getIcon(insight.type);

        return (
          <div key={index} className={`${getSeverityClass(insight.severity)}`}>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <Icon className={`w-6 h-6 ${
                  insight.severity === 'critical' ? 'text-danger-600' :
                  insight.severity === 'high' ? 'text-warning-600' :
                  insight.severity === 'low' ? 'text-success-600' :
                  'text-primary-600'
                }`} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {insight.title}
                  </h3>
                  <span className={`badge ${
                    insight.severity === 'critical' ? 'badge-danger' :
                    insight.severity === 'high' ? 'badge-warning' :
                    insight.severity === 'low' ? 'badge-success' :
                    'badge-info'
                  }`}>
                    {insight.severity.toUpperCase()}
                  </span>
                </div>

                <p className="text-gray-700 mb-3">
                  {insight.description}
                </p>

                <div className="bg-white bg-opacity-50 rounded-lg p-3 mb-3">
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Potential Savings:</span>
                      <div className="text-lg font-bold text-success-600">
                        ${insight.potentialSavings.toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-600">Affected Keywords:</span>
                      <div className="text-lg font-bold text-gray-900">
                        {insight.affectedKeywords}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-600">Implementation:</span>
                      <div className="text-lg font-bold text-primary-600">
                        {insight.implementation}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">
                    📋 Recommended Actions:
                  </h4>
                  <ul className="space-y-1">
                    {insight.actions.map((action, i) => (
                      <li key={i} className="flex items-start space-x-2 text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 text-success-500 mt-0.5 flex-shrink-0" />
                        <span>{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {insight.example && (
                  <div className="bg-gray-100 rounded p-3">
                    <h4 className="text-sm font-semibold text-gray-900 mb-1">
                      💡 Example:
                    </h4>
                    <p className="text-sm text-gray-700">
                      {insight.example}
                    </p>
                  </div>
                )}

                <div className="mt-4 flex space-x-3">
                  <button className="btn-primary text-sm">
                    Apply Recommendation
                  </button>
                  <button className="btn-secondary text-sm">
                    View Details
                  </button>
                  <button className="text-sm text-gray-600 hover:text-gray-900">
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ActionableInsights;

/**
 * API FIELDS REQUIRED:
 *
 * Google Ads API:
 * - search_term_view.search_term
 * - search_term_view.status (ADDED, EXCLUDED, NONE)
 * - ad_group_criterion.keyword.text
 * - ad_group_criterion.keyword.match_type
 * - ad_group_criterion.negative
 * - metrics.cost_micros
 * - metrics.conversions
 * - metrics.clicks
 * - metrics.impressions
 * - metrics.search_impression_share
 * - metrics.average_cpc
 * - campaign.name
 * - ad_group.name
 *
 * Derived Insights Logic:
 * 1. Intent Mismatch Detection:
 *    - Compare search_term vs keyword using NLP/semantic similarity
 *    - Flag if similarity < 60% AND conversions = 0
 *
 * 2. Match Type Issues:
 *    - Group by match_type (BROAD, PHRASE, EXACT)
 *    - Calculate waste_ratio = cost WHERE conversions=0 / total_cost
 *    - Flag if BROAD match_type has waste_ratio > 40%
 *
 * 3. Negative Keyword Suggestions:
 *    - Find search_terms with status = NONE AND conversions = 0 AND cost > threshold
 *    - Group similar terms for batch negative keyword creation
 *
 * 4. High CPC Low Performance:
 *    - Flag keywords where average_cpc > account_avg * 1.5 AND conversions = 0
 *
 * 5. Duplicate Search Terms:
 *    - COUNT(DISTINCT ad_group) WHERE search_term = X
 *    - Flag if same term appears in multiple ad groups with different performance
 */
