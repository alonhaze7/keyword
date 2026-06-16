# Complete API Fields Reference - Keywords Waste Dashboard

This document provides a complete mapping of every widget to the exact API fields required from Google Ads API and Meta Ads API.

---

## Table of Contents
1. [Metric Cards](#1-metric-cards)
2. [Actionable Insights](#2-actionable-insights)
3. [Quick Actions](#3-quick-actions)
4. [Waste Trend Chart](#4-waste-trend-chart)
5. [Waste by Match Type](#5-waste-by-match-type)
6. [Top Waste Categories](#6-top-waste-categories)
7. [Keyword Performance Matrix](#7-keyword-performance-matrix)
8. [Intent Mismatch Table](#8-intent-mismatch-table)
9. [Search Term Cloud](#9-search-term-cloud)
10. [Cost Savings Calculator](#10-cost-savings-calculator)

---

## 1. Metric Cards

### Widget Purpose
Display 6 key metrics at-a-glance with trend indicators:
- Total Wasted Spend
- Waste Percentage
- Intent Mismatches
- Wasted Clicks
- Avg Waste per Keyword
- High-Risk Keywords

### Google Ads API Fields

**Resource:** `search_term_view`

```javascript
{
  "fields": [
    "search_term_view.search_term",           // Unique search terms for counting
    "ad_group_criterion.keyword.text",        // Keywords for aggregation
    "metrics.cost_micros",                    // Cost in micros (divide by 1M for dollars)
    "metrics.conversions",                    // To identify zero-conversion terms
    "metrics.clicks",                         // For wasted clicks calculation
    "segments.date"                           // For period-over-period comparison
  ],
  "where": {
    "segments.date": "DURING LAST_30_DAYS",
    "metrics.cost_micros": "> 0"
  }
}
```

### SQL Query Example

```sql
-- Total Wasted Spend & Waste Percentage
SELECT
  SUM(metrics.cost_micros) / 1000000 AS total_spend,
  SUM(CASE WHEN metrics.conversions = 0 
      THEN metrics.cost_micros ELSE 0 END) / 1000000 AS total_waste,
  (SUM(CASE WHEN metrics.conversions = 0 THEN metrics.cost_micros ELSE 0 END) / 
   SUM(metrics.cost_micros)) * 100 AS waste_percentage
FROM search_term_view
WHERE segments.date DURING LAST_30_DAYS;

-- Intent Mismatches (requires NLP processing)
SELECT COUNT(DISTINCT search_term_view.search_term) AS intent_mismatches
FROM search_term_view
WHERE segments.date DURING LAST_30_DAYS
  AND metrics.conversions = 0
  AND intent_match_score < 60;  -- Calculated via NLP

-- Wasted Clicks
SELECT SUM(CASE WHEN metrics.conversions = 0 
            THEN metrics.clicks ELSE 0 END) AS wasted_clicks
FROM search_term_view
WHERE segments.date DURING LAST_30_DAYS;

-- Avg Waste per Keyword
SELECT 
  (SUM(CASE WHEN metrics.conversions = 0 THEN metrics.cost_micros ELSE 0 END) / 
   COUNT(DISTINCT ad_group_criterion.keyword.text)) / 1000000 AS avg_waste
FROM search_term_view
WHERE segments.date DURING LAST_30_DAYS;

-- High-Risk Keywords (>$200 waste, 0 conversions)
SELECT COUNT(DISTINCT ad_group_criterion.keyword.text) AS high_risk_keywords
FROM search_term_view
WHERE segments.date DURING LAST_30_DAYS
  AND metrics.conversions = 0
GROUP BY ad_group_criterion.keyword.text
HAVING SUM(metrics.cost_micros) / 1000000 > 200;
```

### Period-over-Period Comparison

```sql
-- Last 30 days vs. previous 30 days
WITH current_period AS (
  SELECT SUM(metrics.cost_micros) / 1000000 AS waste
  FROM search_term_view
  WHERE segments.date DURING LAST_30_DAYS
    AND metrics.conversions = 0
),
previous_period AS (
  SELECT SUM(metrics.cost_micros) / 1000000 AS waste
  FROM search_term_view
  WHERE segments.date BETWEEN DATE_SUB(CURRENT_DATE(), INTERVAL 60 DAY) 
                          AND DATE_SUB(CURRENT_DATE(), INTERVAL 31 DAY)
    AND metrics.conversions = 0
)
SELECT 
  current_period.waste,
  ((current_period.waste - previous_period.waste) / previous_period.waste) * 100 AS waste_change
FROM current_period, previous_period;
```

### API Response Format

```json
{
  "totalWaste": 24580,
  "wasteChange": 12.5,
  "wastePercentage": 32,
  "wastePercentageChange": -3.2,
  "intentMismatches": 847,
  "intentMismatchChange": "+94",
  "wastedClicks": 15234,
  "wastedClicksChange": 8.7,
  "avgWastePerKeyword": 156,
  "avgWasteChange": -5.3,
  "highRiskKeywords": 127,
  "highRiskChange": "+15"
}
```

---

## 2. Actionable Insights

### Widget Purpose
AI-powered insights with:
- Severity classification (critical/high/medium/low)
- Potential savings estimation
- Step-by-step action items
- Implementation timeline

### Google Ads API Fields

**Resource:** `search_term_view` + `keyword_view`

```javascript
{
  "fields": [
    "search_term_view.search_term",
    "search_term_view.status",                // ADDED, EXCLUDED, NONE
    "ad_group_criterion.keyword.text",
    "ad_group_criterion.keyword.match_type",  // BROAD, PHRASE, EXACT
    "ad_group_criterion.negative",            // true/false
    "metrics.cost_micros",
    "metrics.conversions",
    "metrics.clicks",
    "metrics.impressions",
    "metrics.average_cpc",
    "campaign.name",
    "campaign.id",
    "ad_group.name",
    "ad_group.id"
  ]
}
```

### Insight Generation Queries

#### 1. Broad Match Waste Insight

```sql
-- Identify if broad match is the primary waste source
SELECT
  ad_group_criterion.keyword.match_type,
  SUM(CASE WHEN metrics.conversions = 0 
      THEN metrics.cost_micros ELSE 0 END) / 1000000 AS waste,
  COUNT(DISTINCT search_term_view.search_term) AS wasted_terms
FROM search_term_view
WHERE segments.date DURING LAST_30_DAYS
  AND metrics.conversions = 0
GROUP BY ad_group_criterion.keyword.match_type;

-- If BROAD accounts for >50% of waste, trigger insight
```

**Backend Logic:**
```python
if broad_waste_percentage > 50:
    insight = {
        'type': 'critical',
        'severity': 'critical',
        'title': 'Broad Match Keywords Draining {}% of Budget'.format(broad_waste_percentage),
        'description': f'Your broad match keywords triggered {wasted_terms} irrelevant searches...',
        'potentialSavings': broad_waste_amount,
        'affectedKeywords': broad_keyword_count,
        'implementation': '2-3 days',
        'actions': [
            'Convert top 50 broad match keywords to phrase match',
            f'Add {negative_keyword_candidates} negative keywords',
            'Pause keywords with >$200 waste and 0 conversions',
            'Set up automated alerts for new high-waste broad terms'
        ]
    }
```

#### 2. Intent Mismatch Insight

```sql
-- Find informational vs. transactional mismatch
SELECT
  search_term_view.search_term,
  ad_group_criterion.keyword.text,
  metrics.cost_micros / 1000000 AS waste
FROM search_term_view
WHERE segments.date DURING LAST_30_DAYS
  AND metrics.conversions = 0
  AND (
    LOWER(search_term_view.search_term) LIKE '%how%'
    OR LOWER(search_term_view.search_term) LIKE '%guide%'
    OR LOWER(search_term_view.search_term) LIKE '%tutorial%'
    OR LOWER(search_term_view.search_term) LIKE '%tips%'
    OR LOWER(search_term_view.search_term) LIKE '%free%'
  );
```

**NLP Processing:**
```python
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def detect_intent_mismatch(search_terms, keywords):
    informational_patterns = ['how', 'what', 'why', 'guide', 'tutorial', 'tips', 'learn']
    transactional_patterns = ['buy', 'price', 'discount', 'deal', 'purchase', 'order']
    
    mismatches = []
    for term, keyword in zip(search_terms, keywords):
        term_intent = classify_intent(term)
        keyword_intent = classify_intent(keyword)
        
        if term_intent != keyword_intent:
            similarity = calculate_semantic_similarity(term, keyword)
            if similarity < 0.6:
                mismatches.append({
                    'search_term': term,
                    'keyword': keyword,
                    'intent_mismatch': f'{term_intent} vs {keyword_intent}',
                    'similarity': similarity
                })
    
    return mismatches
```

#### 3. Duplicate Keywords Insight

```sql
-- Find keywords appearing in multiple ad groups
SELECT
  ad_group_criterion.keyword.text,
  COUNT(DISTINCT ad_group.id) AS ad_group_count,
  SUM(metrics.cost_micros) / 1000000 AS total_cost,
  AVG(ad_group_criterion.cpc_bid_micros) / 1000000 AS avg_bid
FROM keyword_view
WHERE segments.date DURING LAST_30_DAYS
GROUP BY ad_group_criterion.keyword.text
HAVING COUNT(DISTINCT ad_group.id) > 1;
```

#### 4. Low-Quality Traffic Insight

```sql
-- Identify price-sensitive searches with 0 conversions
SELECT
  search_term_view.search_term,
  SUM(metrics.cost_micros) / 1000000 AS waste,
  SUM(metrics.clicks) AS clicks
FROM search_term_view
WHERE segments.date DURING LAST_30_DAYS
  AND metrics.conversions = 0
  AND (
    LOWER(search_term_view.search_term) LIKE '%free%'
    OR LOWER(search_term_view.search_term) LIKE '%cheap%'
    OR LOWER(search_term_view.search_term) LIKE '%discount%'
    OR LOWER(search_term_view.search_term) LIKE '%coupon%'
    OR LOWER(search_term_view.search_term) LIKE '%crack%'
  )
GROUP BY search_term_view.search_term;
```

### API Response Format

```json
{
  "insights": [
    {
      "type": "critical",
      "severity": "critical",
      "title": "Broad Match Keywords Draining 58% of Budget",
      "description": "Your broad match keywords are triggering irrelevant searches...",
      "potentialSavings": 14256,
      "affectedKeywords": 342,
      "implementation": "2-3 days",
      "actions": [
        "Convert top 50 broad match keywords to phrase match",
        "Add 180 negative keywords from intent mismatch list",
        "Pause 25 keywords with >$200 waste and 0 conversions",
        "Set up automated alerts"
      ],
      "example": "Keyword 'marketing software' (broad) triggered 'free marketing software crack'..."
    }
  ]
}
```

---

## 3. Quick Actions

### Widget Purpose
Display counts for quick operations:
- Negative keywords to add
- Keywords to pause
- Terms for bulk operations

### Google Ads API Fields

```javascript
{
  "fields": [
    "search_term_view.search_term",
    "search_term_view.status",
    "ad_group_criterion.keyword.text",
    "ad_group_criterion.status",
    "metrics.cost_micros",
    "metrics.conversions"
  ]
}
```

### SQL Queries

```sql
-- Negative Keyword Candidates
SELECT COUNT(DISTINCT search_term_view.search_term) AS negative_keyword_count
FROM search_term_view
WHERE segments.date DURING LAST_30_DAYS
  AND metrics.conversions = 0
  AND metrics.cost_micros > 10000000  -- > $10
  AND search_term_view.status = 'NONE';

-- Bulk Add Count (high-waste terms)
SELECT COUNT(DISTINCT search_term_view.search_term) AS bulk_add_count
FROM search_term_view
WHERE segments.date DURING LAST_30_DAYS
  AND metrics.conversions = 0
  AND metrics.cost_micros > 500000000;  -- > $500

-- Pauseable Keywords
SELECT COUNT(DISTINCT ad_group_criterion.keyword.text) AS pause_count
FROM keyword_view
WHERE segments.date DURING LAST_30_DAYS
  AND metrics.conversions = 0
  AND metrics.cost_micros > 50000000  -- > $50
  AND ad_group_criterion.status = 'ENABLED';
```

### API Response Format

```json
{
  "negativeKeywordCount": 234,
  "bulkAddCount": 87,
  "pauseCount": 52
}
```

---

## 4. Waste Trend Chart

### Widget Purpose
Time-series chart showing daily waste patterns over 30 days

### Google Ads API Fields

```javascript
{
  "fields": [
    "segments.date",               // DATE format: YYYY-MM-DD
    "metrics.cost_micros",         // Total daily cost
    "metrics.conversions",         // For waste calculation
    "metrics.clicks"               // For wasted clicks
  ]
}
```

### SQL Query

```sql
SELECT
  segments.date,
  SUM(metrics.cost_micros) / 1000000 AS total_spend,
  SUM(CASE WHEN metrics.conversions = 0 
      THEN metrics.cost_micros ELSE 0 END) / 1000000 AS wasted_spend,
  SUM(CASE WHEN metrics.conversions = 0 
      THEN metrics.clicks ELSE 0 END) AS wasted_clicks
FROM search_term_view
WHERE segments.date DURING LAST_30_DAYS
GROUP BY segments.date
ORDER BY segments.date ASC;
```

### Optional: Day-of-Week Pattern Analysis

```sql
SELECT
  segments.day_of_week,  -- MONDAY, TUESDAY, etc.
  AVG(daily_waste) AS avg_waste_by_day
FROM (
  SELECT
    segments.date,
    segments.day_of_week,
    SUM(CASE WHEN metrics.conversions = 0 
        THEN metrics.cost_micros ELSE 0 END) / 1000000 AS daily_waste
  FROM search_term_view
  WHERE segments.date DURING LAST_90_DAYS
  GROUP BY segments.date, segments.day_of_week
) daily_data
GROUP BY segments.day_of_week
ORDER BY avg_waste_by_day DESC;
```

### API Response Format

```json
{
  "wasteTrend": [
    { "date": "2024-02-16", "totalSpend": 3200, "wastedSpend": 980 },
    { "date": "2024-02-17", "totalSpend": 3400, "wastedSpend": 1120 },
    ...
  ]
}
```

---

## 5. Waste by Match Type

### Widget Purpose
Pie chart showing waste distribution across BROAD, PHRASE, EXACT match types

### Google Ads API Fields

```javascript
{
  "fields": [
    "ad_group_criterion.keyword.match_type",  // BROAD, PHRASE, EXACT
    "ad_group_criterion.keyword.text",
    "search_term_view.search_term",
    "metrics.cost_micros",
    "metrics.conversions"
  ]
}
```

### SQL Query

```sql
SELECT
  ad_group_criterion.keyword.match_type,
  COUNT(DISTINCT ad_group_criterion.keyword.text) AS keywords,
  COUNT(DISTINCT search_term_view.search_term) AS search_terms,
  SUM(CASE WHEN metrics.conversions = 0 
      THEN metrics.cost_micros ELSE 0 END) / 1000000 AS waste,
  (SUM(CASE WHEN metrics.conversions = 0 THEN metrics.cost_micros ELSE 0 END) / 
   SUM(total_waste.total)) * 100 AS percentage
FROM keyword_view
LEFT JOIN search_term_view 
  ON keyword_view.ad_group_criterion.criterion_id = search_term_view.ad_group_criterion.criterion_id
CROSS JOIN (
  SELECT SUM(CASE WHEN metrics.conversions = 0 
             THEN metrics.cost_micros ELSE 0 END) AS total
  FROM keyword_view
  WHERE segments.date DURING LAST_30_DAYS
) total_waste
WHERE segments.date DURING LAST_30_DAYS
GROUP BY ad_group_criterion.keyword.match_type;
```

### API Response Format

```json
{
  "wasteByMatchType": [
    {
      "name": "BROAD",
      "value": 14256,
      "percentage": 58,
      "keywords": 342,
      "searchTerms": 1847
    },
    {
      "name": "PHRASE",
      "value": 7374,
      "percentage": 30,
      "keywords": 215,
      "searchTerms": 892
    },
    {
      "name": "EXACT",
      "value": 2950,
      "percentage": 12,
      "keywords": 89,
      "searchTerms": 234
    }
  ]
}
```

---

## 6. Top Waste Categories

### Widget Purpose
Bar chart showing waste grouped by intent/semantic categories

### Google Ads API Fields

```javascript
{
  "fields": [
    "search_term_view.search_term",
    "ad_group_criterion.keyword.text",
    "metrics.cost_micros",
    "metrics.conversions"
  ]
}
```

### Categorization Logic (Backend NLP)

```python
import re
from typing import Dict, List

class SearchTermCategorizer:
    def __init__(self):
        self.categories = {
            'Informational Queries': ['how', 'what', 'why', 'guide', 'tutorial', 'tips', 'learn', 'example'],
            'Low-Quality Traffic': ['free', 'cheap', 'discount', 'coupon', 'crack', 'torrent', 'pirate', 'nulled'],
            'Competitor Searches': self.load_competitor_list(),
            'Misspellings & Typos': [],  # Detected via Levenshtein distance
            'Geographic Mismatch': [],   # Detected via location extraction
        }
    
    def categorize(self, search_term: str, keyword: str) -> str:
        search_term_lower = search_term.lower()
        
        # Check each category
        for category, patterns in self.categories.items():
            if any(pattern in search_term_lower for pattern in patterns):
                return category
        
        # Check for misspellings
        if self.is_misspelling(search_term, keyword):
            return 'Misspellings & Typos'
        
        # Check semantic similarity
        if self.semantic_similarity(search_term, keyword) < 0.5:
            return 'Intent Mismatch'
        
        return 'Other'
    
    def is_misspelling(self, term1: str, term2: str) -> bool:
        from Levenshtein import distance
        return 0 < distance(term1, term2) <= 2
    
    def semantic_similarity(self, term1: str, term2: str) -> float:
        # Use spaCy, BERT, or Word2Vec
        import spacy
        nlp = spacy.load("en_core_web_md")
        doc1 = nlp(term1)
        doc2 = nlp(term2)
        return doc1.similarity(doc2)
```

### SQL Query with Categorization

```sql
-- After categorization is done in backend
SELECT
  category_label,
  COUNT(DISTINCT keyword_text) AS keywords,
  COUNT(DISTINCT search_term) AS search_terms,
  SUM(waste_amount) AS waste
FROM (
  SELECT
    search_term_view.search_term,
    ad_group_criterion.keyword.text AS keyword_text,
    metrics.cost_micros / 1000000 AS waste_amount,
    -- Categorization logic (simplified for SQL)
    CASE
      WHEN LOWER(search_term) LIKE '%how%' 
        OR LOWER(search_term) LIKE '%what%' THEN 'Informational Queries'
      WHEN LOWER(search_term) LIKE '%free%' 
        OR LOWER(search_term) LIKE '%cheap%' THEN 'Low-Quality Traffic'
      WHEN LOWER(search_term) IN (
        SELECT competitor_name FROM competitors
      ) THEN 'Competitor Searches'
      ELSE 'Other'
    END AS category_label
  FROM search_term_view
  WHERE segments.date DURING LAST_30_DAYS
    AND metrics.conversions = 0
) categorized_terms
GROUP BY category_label
ORDER BY waste DESC
LIMIT 10;
```

### API Response Format

```json
{
  "wasteCategories": [
    {
      "category": "Informational Queries",
      "waste": 5840,
      "keywords": 127,
      "searchTerms": 456
    },
    {
      "category": "Competitor Searches",
      "waste": 4230,
      "keywords": 89,
      "searchTerms": 312
    },
    ...
  ]
}
```

---

## 7. Keyword Performance Matrix

### Widget Purpose
Scatter plot: Cost (Y) vs. Clicks (X), bubble size = conversions

### Google Ads API Fields

```javascript
{
  "fields": [
    "ad_group_criterion.keyword.text",
    "ad_group_criterion.keyword.match_type",
    "metrics.clicks",              // X-axis
    "metrics.cost_micros",         // Y-axis
    "metrics.conversions",         // Bubble size
    "metrics.impressions",
    "ad_group.name",
    "campaign.name"
  ]
}
```

### SQL Query

```sql
SELECT
  ad_group_criterion.keyword.text AS keyword,
  ad_group_criterion.keyword.match_type AS match_type,
  SUM(metrics.clicks) AS clicks,
  SUM(metrics.cost_micros) / 1000000 AS cost,
  SUM(metrics.conversions) AS conversions,
  (SUM(metrics.conversions) / NULLIF(SUM(metrics.clicks), 0)) * 100 AS conversion_rate,
  SUM(metrics.cost_micros) / 1000000 / NULLIF(SUM(metrics.conversions), 0) AS cpa,
  campaign.name,
  ad_group.name
FROM keyword_view
WHERE segments.date DURING LAST_30_DAYS
  AND metrics.clicks > 10  -- Minimum threshold
GROUP BY
  ad_group_criterion.keyword.text,
  ad_group_criterion.keyword.match_type,
  campaign.name,
  ad_group.name
ORDER BY cost DESC
LIMIT 100;
```

### API Response Format

```json
{
  "performanceMatrix": [
    {
      "keyword": "marketing software",
      "clicks": 450,
      "cost": 1980,
      "conversions": 0,
      "conversionRate": 0,
      "cpa": null,
      "matchType": "BROAD"
    },
    ...
  ]
}
```

---

## 8. Intent Mismatch Table

### Widget Purpose
Sortable table with search terms that don't match keyword intent

### Google Ads API Fields

```javascript
{
  "fields": [
    "search_term_view.search_term",
    "ad_group_criterion.keyword.text",
    "ad_group_criterion.keyword.match_type",
    "metrics.clicks",
    "metrics.cost_micros",
    "metrics.conversions",
    "search_term_view.status",
    "campaign.name",
    "ad_group.name"
  ]
}
```

### SQL Query

```sql
SELECT
  search_term_view.search_term,
  ad_group_criterion.keyword.text AS keyword,
  ad_group_criterion.keyword.match_type AS match_type,
  metrics.clicks,
  metrics.cost_micros / 1000000 AS waste,
  campaign.name AS campaign,
  ad_group.name AS ad_group
FROM search_term_view
WHERE segments.date DURING LAST_30_DAYS
  AND metrics.conversions = 0
  AND search_term_view.status = 'NONE'
  AND metrics.cost_micros > 0
ORDER BY metrics.cost_micros DESC
LIMIT 1000;
```

### NLP Processing (Backend)

```python
def process_intent_mismatch_table(search_terms_data):
    results = []
    for row in search_terms_data:
        search_term = row['search_term']
        keyword = row['keyword']
        
        # Classify intent
        intent = classify_intent(search_term)
        
        # Calculate match score
        intent_match = calculate_semantic_similarity(search_term, keyword) * 100
        
        results.append({
            'id': row['id'],
            'searchTerm': search_term,
            'keyword': keyword,
            'matchType': row['match_type'],
            'intent': intent,
            'intentMatch': round(intent_match, 0),
            'waste': row['waste'],
            'clicks': row['clicks']
        })
    
    return results
```

### API Response Format

```json
{
  "intentMismatches": [
    {
      "id": 1,
      "searchTerm": "how to use crm software",
      "keyword": "crm software",
      "matchType": "BROAD",
      "intent": "Informational",
      "intentMatch": 25,
      "waste": 340,
      "clicks": 78
    },
    ...
  ],
  "pagination": {
    "page": 1,
    "limit": 50,
    "total": 847
  }
}
```

---

## 9. Search Term Cloud

### Widget Purpose
Word cloud visualization with size = waste amount

### Google Ads API Fields

```javascript
{
  "fields": [
    "search_term_view.search_term",
    "metrics.cost_micros",
    "metrics.clicks",
    "metrics.conversions"
  ]
}
```

### SQL Query

```sql
SELECT
  search_term_view.search_term AS term,
  SUM(metrics.cost_micros) / 1000000 AS waste,
  SUM(metrics.clicks) AS clicks
FROM search_term_view
WHERE metrics.conversions = 0
  AND search_term_view.status = 'NONE'
  AND segments.date DURING LAST_30_DAYS
GROUP BY search_term_view.search_term
ORDER BY waste DESC
LIMIT 100;
```

### API Response Format

```json
{
  "searchTerms": [
    {
      "term": "free crm",
      "waste": 1240,
      "clicks": 620,
      "category": "Low-Quality Traffic"
    },
    ...
  ]
}
```

---

## 10. Cost Savings Calculator

### Widget Purpose
ROI projection for 3 optimization scenarios

### Google Ads API Fields

```javascript
{
  "fields": [
    "metrics.cost_micros",
    "metrics.conversions"
  ]
}
```

### SQL Query

```sql
SELECT
  SUM(metrics.cost_micros) / 1000000 AS total_spend,
  SUM(CASE WHEN metrics.conversions = 0 
      THEN metrics.cost_micros ELSE 0 END) / 1000000 AS total_waste
FROM search_term_view
WHERE segments.date DURING LAST_30_DAYS;
```

### Scenario Calculations

```python
def calculate_savings_scenarios(total_waste, total_spend):
    scenarios = {
        'conservative': {
            'reduction': 0.35,
            'implementation_time': '1-2 days',
            'maintenance': '2 hrs/month',
            'risk': 'Low'
        },
        'moderate': {
            'reduction': 0.60,
            'implementation_time': '3-5 days',
            'maintenance': '4 hrs/month',
            'risk': 'Medium'
        },
        'aggressive': {
            'reduction': 0.85,
            'implementation_time': '1-2 weeks',
            'maintenance': '8 hrs/month',
            'risk': 'High'
        }
    }
    
    results = {}
    for scenario_name, scenario_config in scenarios.items():
        monthly_savings = total_waste * scenario_config['reduction']
        annual_savings = monthly_savings * 12
        effective_spend = total_spend - monthly_savings
        roi_improvement = (monthly_savings / effective_spend) * 100
        
        results[scenario_name] = {
            'savings': monthly_savings,
            'annualSavings': annual_savings,
            'roiImprovement': roi_improvement,
            **scenario_config
        }
    
    return results
```

### API Response Format

```json
{
  "totalWaste": 24580,
  "totalSpend": 76800,
  "scenarios": {
    "conservative": {
      "reduction": 0.35,
      "monthlySavings": 8603,
      "annualSavings": 103236,
      "roiImprovement": 12.6
    },
    ...
  }
}
```

---

## Meta Ads API (Bonus)

### Limitations
Meta doesn't expose search terms like Google Ads. Focus on:

**Available Metrics:**
```javascript
{
  "fields": [
    "campaign_name",
    "adset_name",
    "ad_name",
    "spend",
    "impressions",
    "clicks",
    "actions",  // Contains conversion data
    "action_values",
    "cost_per_action_type",
    "ctr",
    "cpc"
  ]
}
```

**Waste Detection (Meta):**
- Focus on ad-level, not keyword-level
- Identify ads with high spend + 0 conversions
- Analyze audience targeting issues instead of keyword issues

---

## Summary Table

| Widget | Primary Resource | Key Fields | NLP Required |
|--------|-----------------|------------|--------------|
| Metric Cards | search_term_view | cost_micros, conversions, clicks | Yes (intent) |
| Actionable Insights | search_term_view + keyword_view | All fields | Yes |
| Quick Actions | search_term_view | search_term, status, cost | No |
| Waste Trend | search_term_view | segments.date, cost_micros | No |
| Match Type | keyword_view | match_type, cost_micros | No |
| Categories | search_term_view | search_term, keyword | Yes |
| Performance Matrix | keyword_view | clicks, cost, conversions | No |
| Intent Table | search_term_view | search_term, keyword, cost | Yes |
| Term Cloud | search_term_view | search_term, cost | Yes (optional) |
| Savings Calc | search_term_view | cost_micros, conversions | No |

---

**Total API Endpoints Needed:** 10-12  
**NLP Processing Required:** 5 widgets  
**Real-time vs. Cached:** Recommend 15-min cache for all

---

*This document provides the complete field mapping. For implementation examples, see README.md.*
