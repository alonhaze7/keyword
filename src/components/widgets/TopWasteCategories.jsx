import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { TrendingDown } from 'lucide-react';

const TopWasteCategories = ({ data }) => {
  const COLORS = ['#ef4444', '#f59e0b', '#fbbf24', '#fcd34d', '#fde68a'];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <div className="font-semibold text-gray-900 mb-2">{data.category}</div>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between space-x-4">
              <span className="text-gray-600">Waste Amount:</span>
              <span className="font-medium text-danger-600">${data.waste.toLocaleString()}</span>
            </div>
            <div className="flex justify-between space-x-4">
              <span className="text-gray-600">Keywords:</span>
              <span className="font-medium">{data.keywords}</span>
            </div>
            <div className="flex justify-between space-x-4">
              <span className="text-gray-600">Avg Waste/Keyword:</span>
              <span className="font-medium">${Math.round(data.waste / data.keywords).toLocaleString()}</span>
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
          Top Waste Categories
        </h3>
        <p className="text-sm text-gray-600">
          Waste grouped by intent and keyword category
        </p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} layout="horizontal">
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            type="number"
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
            tickFormatter={(value) => `$${value / 1000}k`}
          />
          <YAxis
            type="category"
            dataKey="category"
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
            width={120}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="waste" radius={[0, 4, 4, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-6 space-y-2">
        {data.slice(0, 3).map((item, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-danger-100 text-danger-600 font-bold text-sm">
                #{index + 1}
              </div>
              <div>
                <div className="font-medium text-gray-900">{item.category}</div>
                <div className="text-sm text-gray-600">
                  {item.keywords} keywords • {item.searchTerms} search terms
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-danger-600">
                ${item.waste.toLocaleString()}
              </div>
              <button className="text-xs text-primary-600 hover:text-primary-700 font-medium mt-1">
                View Details →
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center space-x-2 text-sm">
          <TrendingDown className="w-4 h-4 text-success-600" />
          <span className="text-gray-700">
            <span className="font-semibold text-success-600">Quick Win:</span>{' '}
            Add negative keywords for "{data[0]?.category}" to save{' '}
            <span className="font-bold">${data[0]?.waste.toLocaleString()}</span> monthly
          </span>
        </div>
      </div>
    </div>
  );
};

export default TopWasteCategories;

/**
 * API FIELDS REQUIRED:
 *
 * Google Ads API with Custom Categorization:
 * - search_term_view.search_term
 * - ad_group_criterion.keyword.text
 * - metrics.cost_micros (WHERE conversions = 0)
 * - metrics.conversions
 * - metrics.clicks
 *
 * Categorization Logic (Backend NLP Processing):
 *
 * 1. Intent-Based Categories:
 *    - "Informational Queries": how, what, why, guide, tips, tutorial, learn
 *    - "Wrong Product Searches": competitor names, wrong product categories
 *    - "Too Broad Searches": generic terms without buying intent
 *    - "Misspellings & Typos": Levenshtein distance from target keyword
 *    - "Low-Quality Traffic": free, cheap, crack, torrent, download
 *
 * 2. Semantic Categorization (Using NLP):
 *    - Use topic modeling (LDA) or keyword clustering
 *    - Group search terms by semantic similarity
 *    - Example categories: "Competitor Mentions", "Price Shoppers", "DIY/Free Alternatives"
 *
 * 3. Product/Service Categories:
 *    - Map search terms to your product taxonomy
 *    - Identify irrelevant categories getting traffic
 *
 * Query Structure:
 * SELECT
 *   category_label,
 *   COUNT(DISTINCT ad_group_criterion.keyword.text) as keywords,
 *   COUNT(DISTINCT search_term_view.search_term) as search_terms,
 *   SUM(metrics.cost_micros) / 1000000 as waste
 * FROM (
 *   SELECT
 *     search_term_view.search_term,
 *     ad_group_criterion.keyword.text,
 *     metrics.cost_micros,
 *     CASE
 *       WHEN LOWER(search_term) LIKE '%how%' OR LOWER(search_term) LIKE '%what%' THEN 'Informational Queries'
 *       WHEN LOWER(search_term) LIKE '%free%' OR LOWER(search_term) LIKE '%crack%' THEN 'Low-Quality Traffic'
 *       WHEN LOWER(search_term) IN (SELECT competitor_name FROM competitors) THEN 'Competitor Searches'
 *       WHEN semantic_similarity(search_term, keyword) < 0.5 THEN 'Intent Mismatch'
 *       ELSE 'Other'
 *     END as category_label
 *   FROM search_term_view
 *   WHERE metrics.conversions = 0 AND metrics.cost_micros > 0
 * ) categorized_terms
 * GROUP BY category_label
 * ORDER BY waste DESC
 * LIMIT 10
 *
 * Implementation Notes:
 * - Use spaCy, NLTK, or cloud NLP APIs for categorization
 * - Maintain a list of competitor brand names for filtering
 * - Consider industry-specific categories (e.g., B2B vs B2C)
 * - Update categories based on manual review and feedback
 */
