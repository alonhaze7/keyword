import React, { useState } from 'react';
import { Calculator, DollarSign, TrendingUp, CheckCircle } from 'lucide-react';

const CostSavingsCalculator = ({ data }) => {
  const [scenario, setScenario] = useState('conservative');

  const scenarios = {
    conservative: {
      label: 'Conservative',
      description: 'Remove only critical waste (0 conversions, high cost)',
      savings: data.totalWaste * 0.35,
      reduction: '35%'
    },
    moderate: {
      label: 'Moderate',
      description: 'Remove critical waste + optimize low performers',
      savings: data.totalWaste * 0.60,
      reduction: '60%'
    },
    aggressive: {
      label: 'Aggressive',
      description: 'Remove all non-converting terms + tighten match types',
      savings: data.totalWaste * 0.85,
      reduction: '85%'
    }
  };

  const currentScenario = scenarios[scenario];
  const monthlySavings = currentScenario.savings;
  const annualSavings = monthlySavings * 12;

  const implementationSteps = {
    conservative: [
      'Add negative keywords for 0-conversion terms over $100',
      'Pause keywords with >$500 waste and 0 conversions',
      'Review broad match keywords quarterly'
    ],
    moderate: [
      'Add negative keywords for all 0-conversion terms',
      'Convert high-waste broad keywords to phrase match',
      'Pause keywords with conversion rate <0.5%',
      'Implement weekly waste monitoring'
    ],
    aggressive: [
      'Add comprehensive negative keyword list',
      'Convert all broad match to phrase or exact',
      'Pause all keywords with 0 conversions after 1000 impressions',
      'Implement daily automated waste alerts',
      'Set up conversion-based automated rules'
    ]
  };

  return (
    <div className="card">
      <div className="mb-6">
        <div className="flex items-center space-x-3 mb-2">
          <Calculator className="w-6 h-6 text-primary-600" />
          <h3 className="text-xl font-semibold text-gray-900">
            Potential Savings Calculator
          </h3>
        </div>
        <p className="text-sm text-gray-600">
          Estimate your savings based on different optimization strategies
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {Object.entries(scenarios).map(([key, s]) => (
          <button
            key={key}
            onClick={() => setScenario(key)}
            className={`p-4 rounded-lg border-2 transition-all text-left ${
              scenario === key
                ? 'border-primary-500 bg-primary-50 shadow-md'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className={`font-semibold ${scenario === key ? 'text-primary-700' : 'text-gray-900'}`}>
                {s.label}
              </span>
              {scenario === key && (
                <CheckCircle className="w-5 h-5 text-primary-600" />
              )}
            </div>
            <p className="text-sm text-gray-600 mb-3">
              {s.description}
            </p>
            <div className={`text-lg font-bold ${scenario === key ? 'text-primary-600' : 'text-gray-700'}`}>
              {s.reduction} waste reduction
            </div>
          </button>
        ))}
      </div>

      <div className="bg-gradient-to-br from-success-50 to-success-100 rounded-lg p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <DollarSign className="w-5 h-5 text-success-700" />
              <span className="text-sm font-medium text-success-800">Monthly Savings</span>
            </div>
            <div className="text-3xl font-bold text-success-700">
              ${Math.round(monthlySavings).toLocaleString()}
            </div>
            <div className="text-sm text-success-600 mt-1">
              {currentScenario.reduction} of current waste
            </div>
          </div>

          <div>
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="w-5 h-5 text-success-700" />
              <span className="text-sm font-medium text-success-800">Annual Savings</span>
            </div>
            <div className="text-3xl font-bold text-success-700">
              ${Math.round(annualSavings).toLocaleString()}
            </div>
            <div className="text-sm text-success-600 mt-1">
              Over 12 months
            </div>
          </div>

          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Calculator className="w-5 h-5 text-success-700" />
              <span className="text-sm font-medium text-success-800">ROI Improvement</span>
            </div>
            <div className="text-3xl font-bold text-success-700">
              {Math.round((monthlySavings / (data.totalSpend - data.totalWaste)) * 100)}%
            </div>
            <div className="text-sm text-success-600 mt-1">
              Effective spend increase
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">
            📋 Implementation Steps ({currentScenario.label})
          </h4>
          <ul className="space-y-2">
            {implementationSteps[scenario].map((step, index) => (
              <li key={index} className="flex items-start space-x-2 text-sm text-gray-700">
                <CheckCircle className="w-4 h-4 text-success-500 mt-0.5 flex-shrink-0" />
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 mb-3">
            ⏱️ Timeline & Effort
          </h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-700">Implementation Time</span>
              <span className="font-semibold text-gray-900">
                {scenario === 'conservative' ? '1-2 days' : scenario === 'moderate' ? '3-5 days' : '1-2 weeks'}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-700">Ongoing Maintenance</span>
              <span className="font-semibold text-gray-900">
                {scenario === 'conservative' ? '2 hrs/month' : scenario === 'moderate' ? '4 hrs/month' : '8 hrs/month'}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-700">Risk Level</span>
              <span className={`badge ${
                scenario === 'conservative' ? 'badge-success' :
                scenario === 'moderate' ? 'badge-warning' :
                'badge-danger'
              }`}>
                {scenario === 'conservative' ? 'Low' : scenario === 'moderate' ? 'Medium' : 'High'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Based on last 30 days of data • Total waste identified: ${data.totalWaste.toLocaleString()}
          </div>
          <button className="btn-primary flex items-center space-x-2">
            <span>Start Optimization</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CostSavingsCalculator;

/**
 * API FIELDS REQUIRED:
 *
 * Google Ads API (account-level aggregation):
 * - metrics.cost_micros (total spend)
 * - metrics.conversions (to calculate waste)
 * - metrics.clicks
 * - metrics.impressions
 *
 * Waste Calculation:
 * - total_waste = SUM(cost_micros) WHERE conversions = 0
 * - total_spend = SUM(cost_micros)
 * - waste_percentage = (total_waste / total_spend) * 100
 *
 * Scenario-Based Savings:
 *
 * 1. Conservative (35% reduction):
 *    - Only removes terms with 0 conversions AND cost > $100
 *    - Low risk of losing potential converters
 *    - Focus on obvious waste
 *
 * 2. Moderate (60% reduction):
 *    - Removes all 0-conversion terms
 *    - Optimizes match types for high-waste keywords
 *    - Balanced approach
 *
 * 3. Aggressive (85% reduction):
 *    - Removes all non-converting traffic
 *    - Tightens match types significantly
 *    - Higher risk but maximum savings
 *    - Requires careful monitoring
 *
 * ROI Improvement Calculation:
 * - effective_spend = total_spend - waste_removed
 * - roi_improvement = (waste_removed / effective_spend) * 100
 *
 * Implementation Tracking (recommended):
 * Store baseline metrics before optimization:
 * {
 *   "baseline_date": "2024-01-15",
 *   "baseline_waste": 15000,
 *   "baseline_spend": 45000,
 *   "scenario_applied": "moderate",
 *   "expected_savings": 9000
 * }
 *
 * Then measure actual results:
 * {
 *   "measurement_date": "2024-02-15",
 *   "actual_waste": 7500,
 *   "actual_spend": 42000,
 *   "actual_savings": 7500,
 *   "variance": -1500
 * }
 */
