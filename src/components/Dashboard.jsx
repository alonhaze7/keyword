import React from 'react';
import MetricCards from './widgets/MetricCards';
import WasteTrendChart from './widgets/WasteTrendChart';
import IntentMismatchTable from './widgets/IntentMismatchTable';
import KeywordPerformanceMatrix from './widgets/KeywordPerformanceMatrix';
import WasteByMatchType from './widgets/WasteByMatchType';
import TopWasteCategories from './widgets/TopWasteCategories';
import SearchTermCloud from './widgets/SearchTermCloud';
import ActionableInsights from './widgets/ActionableInsights';
import QuickActions from './widgets/QuickActions';
import CostSavingsCalculator from './widgets/CostSavingsCalculator';

const Dashboard = ({ data, dateRange, platform }) => {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Key Metrics */}
      <section className="mb-8">
        <MetricCards data={data.metrics} />
      </section>

      {/* Actionable Insights - Top Priority */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          🎯 Actionable Insights
        </h2>
        <ActionableInsights data={data.insights} />
      </section>

      {/* Quick Actions */}
      <section className="mb-8">
        <QuickActions data={data.quickActions} />
      </section>

      {/* Waste Trend Over Time */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          📈 Waste Trend Analysis
        </h2>
        <WasteTrendChart data={data.wasteTrend} />
      </section>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Waste by Match Type */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            🎯 Waste by Match Type
          </h2>
          <WasteByMatchType data={data.wasteByMatchType} />
        </section>

        {/* Top Waste Categories */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            📊 Top Waste Categories
          </h2>
          <TopWasteCategories data={data.wasteCategories} />
        </section>
      </div>

      {/* Keyword Performance Matrix */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          🎨 Keyword Performance Matrix
        </h2>
        <KeywordPerformanceMatrix data={data.performanceMatrix} />
      </section>

      {/* Intent Mismatch Table */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          🔍 Intent Mismatch Details
        </h2>
        <IntentMismatchTable data={data.intentMismatches} />
      </section>

      {/* Search Term Cloud */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          ☁️ Wasted Search Terms Cloud
        </h2>
        <SearchTermCloud data={data.searchTerms} />
      </section>

      {/* Cost Savings Calculator */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          💰 Potential Savings Calculator
        </h2>
        <CostSavingsCalculator data={data.savings} />
      </section>
    </main>
  );
};

export default Dashboard;
