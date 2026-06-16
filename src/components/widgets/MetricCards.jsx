import React from 'react';
import { DollarSign, TrendingDown, AlertTriangle, Target, Percent, MousePointer } from 'lucide-react';

const MetricCards = ({ data }) => {
  const metrics = [
    {
      title: 'Total Wasted Spend',
      value: `$${data.totalWaste.toLocaleString()}`,
      change: `+${data.wasteChange}%`,
      trend: 'up',
      icon: DollarSign,
      color: 'danger',
      description: 'Last 30 days'
    },
    {
      title: 'Waste Percentage',
      value: `${data.wastePercentage}%`,
      change: `${data.wastePercentageChange}%`,
      trend: 'down',
      icon: Percent,
      color: 'warning',
      description: 'Of total ad spend'
    },
    {
      title: 'Intent Mismatches',
      value: data.intentMismatches.toLocaleString(),
      change: `${data.intentMismatchChange}`,
      trend: 'up',
      icon: Target,
      color: 'danger',
      description: 'Search terms flagged'
    },
    {
      title: 'Wasted Clicks',
      value: data.wastedClicks.toLocaleString(),
      change: `${data.wastedClicksChange}%`,
      trend: 'up',
      icon: MousePointer,
      color: 'warning',
      description: 'Zero conversion clicks'
    },
    {
      title: 'Avg Waste per Keyword',
      value: `$${data.avgWastePerKeyword}`,
      change: `${data.avgWasteChange}%`,
      trend: 'down',
      icon: TrendingDown,
      color: 'success',
      description: 'Improving'
    },
    {
      title: 'High-Risk Keywords',
      value: data.highRiskKeywords,
      change: `${data.highRiskChange}`,
      trend: 'up',
      icon: AlertTriangle,
      color: 'danger',
      description: 'Needs immediate action'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {metrics.map((metric, index) => {
        const Icon = metric.icon;
        const trendColor = metric.trend === 'up' ? 'text-danger-600' : 'text-success-600';

        return (
          <div key={index} className="metric-card">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <div className={`p-2 rounded-lg bg-${metric.color}-100`}>
                    <Icon className={`w-5 h-5 text-${metric.color}-600`} />
                  </div>
                  <span className="text-sm font-medium text-gray-600">
                    {metric.title}
                  </span>
                </div>
                <div className="mt-2">
                  <div className="text-3xl font-bold text-gray-900">
                    {metric.value}
                  </div>
                  <div className="flex items-center mt-2 space-x-2">
                    <span className={`text-sm font-semibold ${trendColor}`}>
                      {metric.change}
                    </span>
                    <span className="text-xs text-gray-500">
                      {metric.description}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MetricCards;

/**
 * API FIELDS REQUIRED:
 *
 * Google Ads API (search_term_view resource):
 * - metrics.cost_micros (total cost)
 * - metrics.conversions (to identify zero-conversion terms)
 * - metrics.clicks
 * - search_term_view.search_term
 * - ad_group_criterion.keyword.text
 * - ad_group_criterion.keyword.match_type
 * - campaign.advertising_channel_type
 *
 * Aggregations needed:
 * - SUM(cost_micros) WHERE conversions = 0 [Total Wasted Spend]
 * - COUNT(DISTINCT search_term) WHERE intent_mismatch = true [Intent Mismatches]
 * - SUM(clicks) WHERE conversions = 0 [Wasted Clicks]
 * - AVG(cost_micros) GROUP BY keyword [Avg Waste per Keyword]
 * - COUNT(keywords) WHERE waste > threshold [High-Risk Keywords]
 *
 * Time comparison:
 * - segments.date (to calculate period-over-period changes)
 */
