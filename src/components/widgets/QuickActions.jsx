import React from 'react';
import { Download, Upload, PlayCircle, PauseCircle, Plus, FileText } from 'lucide-react';

const QuickActions = ({ data }) => {
  const actions = [
    {
      title: 'Export Negative Keywords',
      description: 'Download CSV of recommended negative keywords',
      icon: Download,
      color: 'primary',
      count: data.negativeKeywordCount,
      action: 'export'
    },
    {
      title: 'Bulk Add Negatives',
      description: 'Add all high-waste terms as negative keywords',
      icon: Plus,
      color: 'success',
      count: data.bulkAddCount,
      action: 'bulk-add'
    },
    {
      title: 'Pause High-Waste Keywords',
      description: 'Temporarily pause keywords with 0% conversion',
      icon: PauseCircle,
      color: 'warning',
      count: data.pauseCount,
      action: 'pause'
    },
    {
      title: 'Generate Report',
      description: 'Create detailed waste analysis report',
      icon: FileText,
      color: 'gray',
      count: null,
      action: 'report'
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      primary: 'bg-primary-100 text-primary-700 hover:bg-primary-200',
      success: 'bg-success-100 text-success-700 hover:bg-success-200',
      warning: 'bg-warning-100 text-warning-700 hover:bg-warning-200',
      danger: 'bg-danger-100 text-danger-700 hover:bg-danger-200',
      gray: 'bg-gray-100 text-gray-700 hover:bg-gray-200'
    };
    return colors[color] || colors.gray;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {actions.map((action, index) => {
        const Icon = action.icon;
        return (
          <button
            key={index}
            className={`card hover:shadow-lg transition-all text-left ${getColorClasses(action.color)} border-2 border-transparent hover:border-${action.color}-300`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`p-3 rounded-lg bg-white shadow-sm`}>
                <Icon className="w-6 h-6" />
              </div>
              {action.count !== null && (
                <span className="px-3 py-1 bg-white rounded-full text-sm font-bold shadow-sm">
                  {action.count}
                </span>
              )}
            </div>
            <h3 className="font-semibold text-lg mb-1">
              {action.title}
            </h3>
            <p className="text-sm opacity-80">
              {action.description}
            </p>
          </button>
        );
      })}
    </div>
  );
};

export default QuickActions;

/**
 * API FIELDS REQUIRED:
 *
 * For Quick Actions counts:
 *
 * 1. Export Negative Keywords Count:
 *    - COUNT(DISTINCT search_term) WHERE conversions = 0 AND cost > threshold AND status = 'NONE'
 *
 * 2. Bulk Add Count:
 *    - COUNT(search_terms) WHERE waste > high_threshold (e.g., $500)
 *
 * 3. Pause Keywords Count:
 *    - COUNT(DISTINCT keywords) WHERE conversions = 0 AND cost > threshold
 *
 * Google Ads API Queries:
 *
 * SELECT
 *   COUNT(DISTINCT search_term_view.search_term) as negative_keyword_candidates
 * FROM search_term_view
 * WHERE
 *   metrics.conversions = 0
 *   AND metrics.cost_micros > 10000000 (> $10)
 *   AND search_term_view.status = 'NONE'
 *
 * SELECT
 *   COUNT(DISTINCT ad_group_criterion.keyword.text) as pauseable_keywords
 * FROM keyword_view
 * WHERE
 *   metrics.conversions = 0
 *   AND metrics.cost_micros > 50000000 (> $50)
 *   AND ad_group_criterion.status = 'ENABLED'
 *
 * Action Implementations:
 *
 * 1. Export Negative Keywords:
 *    - Format: CSV with columns: search_term, waste_amount, clicks, campaign, ad_group
 *    - Include recommendation for match type (EXACT, PHRASE, BROAD)
 *
 * 2. Bulk Add Negatives:
 *    - POST batch request to Google Ads API
 *    - Max 10,000 operations per request
 *    - Add at campaign level for broader exclusion
 *
 * 3. Pause Keywords:
 *    - PATCH ad_group_criterion.status = 'PAUSED'
 *    - Include reactivation reminder/schedule
 *
 * 4. Generate Report:
 *    - PDF with executive summary, charts, top findings
 *    - Include ROI calculations and recommendations
 */
