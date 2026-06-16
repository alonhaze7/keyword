# Keywords Waste Dashboard

An interactive, actionable dashboard for identifying and eliminating search term waste in Google Ads and Meta Ads campaigns.

## 🎯 Features

### Core Widgets

1. **Key Metrics Cards** - At-a-glance waste overview
2. **Actionable Insights** - Prioritized recommendations with implementation steps
3. **Quick Actions** - One-click operations (export, bulk add negatives, pause keywords)
4. **Waste Trend Chart** - Historical waste analysis
5. **Waste by Match Type** - Distribution across BROAD, PHRASE, EXACT
6. **Top Waste Categories** - Waste grouped by intent/category
7. **Keyword Performance Matrix** - Visual scatter plot of cost vs. clicks
8. **Intent Mismatch Table** - Detailed search term analysis with sorting/filtering
9. **Search Term Cloud** - Interactive visualization of wasted terms
10. **Cost Savings Calculator** - ROI projections for different optimization scenarios

### Key Differentiators

- ✅ **Actionable Insights** - Every widget includes next steps
- ✅ **Intent Classification** - NLP-based categorization (Informational, Transactional, Navigational)
- ✅ **Bulk Operations** - Export, add negatives, pause keywords in bulk
- ✅ **ROI Calculator** - Conservative/Moderate/Aggressive scenarios
- ✅ **Interactive** - Sortable tables, filterable charts, clickable actions
- ✅ **Real-time** - Ready for live API integration

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm/yarn
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/alonhaze7/keyword.git
cd keyword

# Install dependencies
npm install

# Start development server
npm run dev
```

The dashboard will open at `http://localhost:3000`

### Build for Production

```bash
npm run build
npm run preview
```

## 📊 Dashboard Screenshots

### Main Dashboard
- Key metrics with trend indicators
- Actionable insights with severity levels
- Quick action buttons

### Waste Analysis
- Trend chart showing daily waste patterns
- Match type distribution (Pie chart)
- Category-based waste breakdown

### Search Term Analysis
- Intent mismatch table with sorting
- Performance matrix (scatter plot)
- Interactive search term cloud

### Savings Calculator
- Conservative/Moderate/Aggressive scenarios
- Monthly & annual projections
- Implementation timeline

## 🔌 API Integration

### Data Flow Architecture

```
Google Ads API → Backend Service → Dashboard
     ↓                  ↓              ↓
  Raw Data      Processing/NLP    Visualization
```

### Backend Requirements

1. **Google Ads API Client**
   - Authentication (OAuth 2.0)
   - Query builder for search_term_view
   - Rate limiting handling

2. **NLP Processing Service**
   - Intent classification
   - Semantic similarity calculation
   - Category assignment

3. **API Endpoints for Dashboard**

```javascript
// GET /api/keywords/metrics
// Returns: Key metrics for metric cards

// GET /api/keywords/insights
// Returns: Actionable insights with recommendations

// GET /api/keywords/waste-trend?days=30
// Returns: Daily waste time series

// GET /api/keywords/match-types
// Returns: Waste by match type distribution

// GET /api/keywords/categories
// Returns: Top waste categories

// GET /api/keywords/performance-matrix
// Returns: Keyword performance data for scatter plot

// GET /api/keywords/intent-mismatches?page=1&limit=50&sort=waste
// Returns: Paginated intent mismatch table

// GET /api/keywords/search-terms?category=all
// Returns: Search terms for cloud visualization

// POST /api/keywords/add-negatives
// Body: { search_terms: string[], level: 'campaign' | 'ad_group' }
// Action: Bulk add negative keywords

// PATCH /api/keywords/pause
// Body: { keyword_ids: string[] }
// Action: Pause multiple keywords
```

## 📋 Complete API Field Reference

### Widget 1: Metric Cards

**Google Ads API Fields:**
```javascript
{
  resource: "search_term_view",
  fields: [
    "metrics.cost_micros",                    // Total cost (waste calculation)
    "metrics.conversions",                    // To identify zero-conversion terms
    "metrics.clicks",                         // Wasted clicks count
    "search_term_view.search_term",          // Unique search terms
    "ad_group_criterion.keyword.text",        // Keywords
    "segments.date"                           // Period-over-period comparison
  ],
  filters: {
    date: "LAST_30_DAYS",
    conversions: 0                            // For waste identification
  }
}
```

**Derived Metrics:**
- `total_waste = SUM(cost_micros WHERE conversions = 0) / 1000000`
- `waste_percentage = (total_waste / total_spend) * 100`
- `intent_mismatches = COUNT(DISTINCT search_term WHERE intent_match < 60%)`
- `wasted_clicks = SUM(clicks WHERE conversions = 0)`

---

### Widget 2: Actionable Insights

**Google Ads API Fields:**
```javascript
{
  resource: "search_term_view",
  fields: [
    "search_term_view.search_term",
    "search_term_view.status",                // ADDED, EXCLUDED, NONE
    "ad_group_criterion.keyword.text",
    "ad_group_criterion.keyword.match_type",  // BROAD, PHRASE, EXACT
    "metrics.cost_micros",
    "metrics.conversions",
    "metrics.clicks",
    "metrics.impressions",
    "campaign.name",
    "ad_group.name"
  ]
}
```

**NLP Processing (Backend):**
```python
# Intent Classification
def classify_intent(search_term):
    informational_keywords = ['how', 'what', 'why', 'guide', 'tips', 'tutorial']
    transactional_keywords = ['buy', 'price', 'discount', 'deal', 'shop']
    navigational_keywords = ['login', 'account', 'website', 'official']
    
    # Use NLP model or keyword matching
    # Return: 'Informational', 'Transactional', 'Navigational'

# Semantic Similarity
def calculate_intent_match(search_term, keyword):
    # Use BERT embeddings or Word2Vec
    embedding1 = get_embedding(search_term)
    embedding2 = get_embedding(keyword)
    similarity = cosine_similarity(embedding1, embedding2)
    return similarity * 100  # Return 0-100 score
```

**Insight Generation Logic:**
```javascript
// 1. Broad Match Waste Detection
if (match_type === 'BROAD' && waste_ratio > 0.4) {
  insight = {
    severity: 'critical',
    title: 'Broad Match Keywords Draining Budget',
    actions: ['Convert to phrase match', 'Add negative keywords']
  }
}

// 2. Intent Mismatch Detection
if (intent_match_score < 50 && conversions === 0) {
  insight = {
    severity: 'high',
    title: 'Intent Mismatch Detected',
    actions: ['Review ad copy', 'Add intent-based negatives']
  }
}
```

---

### Widget 3: Quick Actions

**Counts Calculation:**
```javascript
// Negative Keyword Candidates
SELECT COUNT(DISTINCT search_term_view.search_term)
FROM search_term_view
WHERE metrics.conversions = 0
  AND metrics.cost_micros > 10000000  -- > $10
  AND search_term_view.status = 'NONE'

// Pauseable Keywords
SELECT COUNT(DISTINCT ad_group_criterion.keyword.text)
FROM keyword_view
WHERE metrics.conversions = 0
  AND metrics.cost_micros > 50000000  -- > $50
  AND ad_group_criterion.status = 'ENABLED'
```

**Actions Implementation:**
```python
# Add Negative Keywords
POST https://googleads.googleapis.com/v14/customers/{customer_id}/campaignCriteria:mutate
{
  "operations": [{
    "create": {
      "campaign": "customers/{customer_id}/campaigns/{campaign_id}",
      "keyword": {
        "text": "free marketing software",
        "match_type": "PHRASE"
      },
      "negative": true
    }
  }]
}

# Pause Keywords
POST https://googleads.googleapis.com/v14/customers/{customer_id}/adGroupCriteria:mutate
{
  "operations": [{
    "update": {
      "resource_name": "customers/{customer_id}/adGroupCriteria/{criterion_id}",
      "status": "PAUSED"
    },
    "update_mask": "status"
  }]
}
```

---

### Widget 4: Waste Trend Chart

**Google Ads API Query:**
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
ORDER BY segments.date ASC
```

**Additional Fields:**
- `segments.day_of_week` - Day-of-week pattern analysis
- `campaign.advertising_channel_type` - Channel breakdown

---

### Widget 5: Waste by Match Type

**Google Ads API Query:**
```sql
SELECT
  ad_group_criterion.keyword.match_type,
  COUNT(DISTINCT ad_group_criterion.keyword.text) AS keywords_count,
  COUNT(DISTINCT search_term_view.search_term) AS search_terms_count,
  SUM(CASE WHEN metrics.conversions = 0 
      THEN metrics.cost_micros ELSE 0 END) / 1000000 AS waste
FROM keyword_view
LEFT JOIN search_term_view 
  ON keyword_view.ad_group_criterion.criterion_id = search_term_view.ad_group_criterion.criterion_id
WHERE segments.date DURING LAST_30_DAYS
GROUP BY ad_group_criterion.keyword.match_type
```

**Fields:**
- `ad_group_criterion.keyword.match_type` - BROAD, PHRASE, EXACT, BROAD_MATCH_MODIFIER
- `metrics.cost_micros`
- `metrics.conversions`

---

### Widget 6: Top Waste Categories

**Categorization Logic (Backend):**
```python
def categorize_search_term(search_term, keyword):
    categories = {
        'Informational Queries': ['how', 'what', 'why', 'guide', 'tips', 'tutorial', 'learn'],
        'Low-Quality Traffic': ['free', 'cheap', 'crack', 'torrent', 'download', 'pirate'],
        'Competitor Searches': load_competitor_list(),  # ['salesforce', 'hubspot', ...]
        'Wrong Product Category': detect_category_mismatch(search_term, keyword),
        'Misspellings & Typos': levenshtein_distance(search_term, keyword) > threshold,
        'Geographic Mismatch': detect_location_mismatch(search_term, target_location)
    }
    return assign_category(search_term, categories)
```

**Google Ads API Query:**
```sql
SELECT
  category_label,
  COUNT(DISTINCT ad_group_criterion.keyword.text) AS keywords,
  COUNT(DISTINCT search_term_view.search_term) AS search_terms,
  SUM(metrics.cost_micros) / 1000000 AS waste
FROM (
  SELECT *,
    CASE
      WHEN LOWER(search_term) LIKE '%how%' THEN 'Informational Queries'
      WHEN LOWER(search_term) LIKE '%free%' THEN 'Low-Quality Traffic'
      WHEN semantic_similarity(search_term, keyword) < 0.5 THEN 'Intent Mismatch'
      ELSE 'Other'
    END AS category_label
  FROM search_term_view
  WHERE metrics.conversions = 0
) categorized
GROUP BY category_label
ORDER BY waste DESC
LIMIT 10
```

---

### Widget 7: Keyword Performance Matrix

**Google Ads API Query:**
```sql
SELECT
  ad_group_criterion.keyword.text,
  ad_group_criterion.keyword.match_type,
  SUM(metrics.clicks) AS clicks,
  SUM(metrics.cost_micros) / 1000000 AS cost,
  SUM(metrics.conversions) AS conversions,
  (SUM(metrics.conversions) / NULLIF(SUM(metrics.clicks), 0)) * 100 AS conversion_rate,
  SUM(metrics.cost_micros) / 1000000 / NULLIF(SUM(metrics.conversions), 0) AS cpa
FROM keyword_view
WHERE segments.date DURING LAST_30_DAYS
  AND metrics.clicks > 10  -- Minimum threshold for meaningful data
GROUP BY 
  ad_group_criterion.keyword.text,
  ad_group_criterion.keyword.match_type
ORDER BY cost DESC
LIMIT 100
```

**Chart Logic:**
- X-axis: `clicks`
- Y-axis: `cost`
- Bubble size: `conversions`
- Color: Based on `conversion_rate` (red=0%, orange<2%, blue 2-5%, green>5%)

---

### Widget 8: Intent Mismatch Table

**Google Ads API Fields:**
```javascript
{
  fields: [
    "search_term_view.search_term",
    "ad_group_criterion.keyword.text",
    "ad_group_criterion.keyword.match_type",
    "metrics.clicks",
    "metrics.cost_micros",
    "metrics.conversions",
    "search_term_view.status"
  ],
  filters: {
    conversions: 0,
    status: "NONE"  // Not yet excluded
  }
}
```

**Backend Processing:**
```python
# For each search term:
result = {
    'search_term': 'how to use crm software',
    'keyword': 'crm software',
    'match_type': 'BROAD',
    'intent': classify_intent('how to use crm software'),  # → 'Informational'
    'intent_match': calculate_similarity(
        'how to use crm software',
        'crm software'
    ),  # → 25%
    'waste': 340,
    'clicks': 78
}
```

**Sorting & Pagination:**
```javascript
// Frontend handles sorting
// Backend provides paginated endpoint:
GET /api/keywords/intent-mismatches?page=1&limit=50&sort=waste&order=desc
```

---

### Widget 9: Search Term Cloud

**Google Ads API Query:**
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
LIMIT 100
```

**Visualization Logic:**
- Font size: Proportional to `waste`
- Color: Based on waste tier (red >$1000, orange $500-1000, yellow $200-500, gray <$200)
- Category filter: Applied after NLP categorization

---

### Widget 10: Cost Savings Calculator

**Data Requirements:**
```javascript
{
  total_waste: 24580,      // SUM(cost WHERE conversions = 0)
  total_spend: 76800       // SUM(cost)
}
```

**Scenario Calculations:**
```javascript
// Conservative (35% reduction)
monthly_savings = total_waste * 0.35
annual_savings = monthly_savings * 12
roi_improvement = (monthly_savings / (total_spend - total_waste)) * 100

// Moderate (60% reduction)
monthly_savings = total_waste * 0.60

// Aggressive (85% reduction)
monthly_savings = total_waste * 0.85
```

**Implementation Tracking (Optional):**
```javascript
// Store baseline before optimization
POST /api/keywords/baseline
{
  baseline_date: "2024-01-15",
  baseline_waste: 24580,
  scenario_applied: "moderate",
  expected_savings: 14748
}

// Measure after 30 days
GET /api/keywords/baseline/results
// Returns actual savings vs. expected
```

---

## 🧠 NLP & Intent Classification

### Required NLP Capabilities

1. **Intent Classification**
   - Informational: how, what, why, guide, tutorial, tips, learn, example
   - Transactional: buy, price, cost, discount, deal, purchase, shop, order
   - Navigational: login, account, official, website, site, homepage

2. **Semantic Similarity**
   - Use pre-trained embeddings (BERT, Word2Vec, GloVe)
   - Calculate cosine similarity between search term and keyword
   - Threshold: <60% = mismatch

3. **Category Assignment**
   - Competitor detection: Maintain list of competitor brands
   - Low-quality traffic: free, cheap, crack, torrent, pirate
   - Geographic mismatch: Extract locations and compare to targeting

### Implementation Options

#### Option 1: Cloud NLP APIs
```python
# Google Cloud Natural Language API
from google.cloud import language_v1

def classify_intent(text):
    client = language_v1.LanguageServiceClient()
    document = language_v1.Document(content=text, type_=language_v1.Document.Type.PLAIN_TEXT)
    response = client.classify_text(request={'document': document})
    return response.categories[0].name

# OpenAI Embeddings
import openai

def calculate_similarity(term1, term2):
    emb1 = openai.Embedding.create(input=term1, model="text-embedding-ada-002")
    emb2 = openai.Embedding.create(input=term2, model="text-embedding-ada-002")
    return cosine_similarity(emb1['data'][0]['embedding'], emb2['data'][0]['embedding'])
```

#### Option 2: Open-Source Libraries
```python
# spaCy
import spacy

nlp = spacy.load("en_core_web_md")

def calculate_similarity(term1, term2):
    doc1 = nlp(term1)
    doc2 = nlp(term2)
    return doc1.similarity(doc2) * 100

# Sentence Transformers (BERT)
from sentence_transformers import SentenceTransformer, util

model = SentenceTransformer('all-MiniLM-L6-v2')

def calculate_similarity(term1, term2):
    emb1 = model.encode(term1)
    emb2 = model.encode(term2)
    return util.cos_sim(emb1, emb2).item() * 100
```

---

## 🔄 Real-Time Data Pipeline

### Architecture

```
┌─────────────────────┐
│   Google Ads API    │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  ETL Service        │
│  - Fetch data       │
│  - Transform        │
│  - Enrich with NLP  │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│   PostgreSQL        │
│   - Raw data        │
│   - Processed data  │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  API Server         │
│  - REST endpoints   │
│  - Caching (Redis)  │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  React Dashboard    │
└─────────────────────┘
```

### Database Schema

```sql
-- Raw search terms
CREATE TABLE search_terms (
  id SERIAL PRIMARY KEY,
  search_term TEXT NOT NULL,
  keyword TEXT NOT NULL,
  match_type VARCHAR(20),
  campaign_id BIGINT,
  ad_group_id BIGINT,
  date DATE NOT NULL,
  clicks INT,
  impressions INT,
  cost_micros BIGINT,
  conversions DECIMAL(10,2),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Processed insights
CREATE TABLE search_term_insights (
  id SERIAL PRIMARY KEY,
  search_term_id INT REFERENCES search_terms(id),
  intent VARCHAR(50),
  intent_match_score DECIMAL(5,2),
  category VARCHAR(100),
  is_waste BOOLEAN,
  recommendations JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Negative keywords to add
CREATE TABLE negative_keyword_queue (
  id SERIAL PRIMARY KEY,
  search_term TEXT NOT NULL,
  campaign_id BIGINT,
  level VARCHAR(20),  -- 'campaign' or 'ad_group'
  match_type VARCHAR(20),
  status VARCHAR(20) DEFAULT 'pending',
  applied_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Optimization history
CREATE TABLE optimization_history (
  id SERIAL PRIMARY KEY,
  action_type VARCHAR(50),  -- 'add_negative', 'pause_keyword', etc.
  affected_keywords INT,
  expected_savings DECIMAL(10,2),
  actual_savings DECIMAL(10,2),
  executed_by VARCHAR(100),
  executed_at TIMESTAMP DEFAULT NOW()
);
```

---

## 📈 Performance Optimization

### Caching Strategy

```javascript
// Redis caching for expensive queries
const redis = require('redis');
const client = redis.createClient();

// Cache metrics for 15 minutes
async function getMetrics() {
  const cached = await client.get('metrics:30days');
  if (cached) return JSON.parse(cached);
  
  const data = await fetchFromGoogleAds();
  await client.setex('metrics:30days', 900, JSON.stringify(data));
  return data;
}
```

### Query Optimization

```python
# Batch requests to Google Ads API
from google.ads.googleads.client import GoogleAdsClient

def batch_fetch_data(customer_id, date_range):
    client = GoogleAdsClient.load_from_storage()
    ga_service = client.get_service("GoogleAdsService")
    
    # Single query with all needed fields
    query = """
        SELECT
            search_term_view.search_term,
            ad_group_criterion.keyword.text,
            ad_group_criterion.keyword.match_type,
            metrics.clicks,
            metrics.cost_micros,
            metrics.conversions,
            campaign.name,
            segments.date
        FROM search_term_view
        WHERE segments.date DURING LAST_30_DAYS
    """
    
    response = ga_service.search_stream(customer_id=customer_id, query=query)
    return process_response(response)
```

---

## 🚨 Error Handling

### Google Ads API Rate Limits

```python
import time
from google.ads.googleads.errors import GoogleAdsException

def fetch_with_retry(query, max_retries=3):
    for attempt in range(max_retries):
        try:
            return execute_query(query)
        except GoogleAdsException as ex:
            if ex.error.code() == 429:  # Rate limit
                wait_time = 2 ** attempt
                time.sleep(wait_time)
            else:
                raise
    raise Exception("Max retries exceeded")
```

### Data Quality Checks

```python
def validate_data(data):
    # Check for missing values
    if data['cost_micros'] is None:
        logger.warning(f"Missing cost data for {data['search_term']}")
        return False
    
    # Check for anomalies
    if data['cost_micros'] > 1000000000:  # >$1000 single term
        logger.warning(f"Unusually high cost: {data['search_term']}")
    
    return True
```

---

## 🧪 Testing

### Mock Data vs. Real Data

The dashboard currently uses mock data in `src/data/mockData.js`. To switch to real data:

1. Create API service:

```javascript
// src/services/api.js
const API_BASE = process.env.REACT_APP_API_URL;

export async function fetchMetrics() {
  const response = await fetch(`${API_BASE}/api/keywords/metrics`);
  return response.json();
}

export async function fetchInsights() {
  const response = await fetch(`${API_BASE}/api/keywords/insights`);
  return response.json();
}

// ... other endpoints
```

2. Update components to use API:

```javascript
// src/App.jsx
import { fetchMetrics, fetchInsights } from './services/api';

function App() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    async function loadData() {
      const metrics = await fetchMetrics();
      const insights = await fetchInsights();
      // ... fetch other data
      setData({ metrics, insights, ... });
    }
    loadData();
  }, []);
  
  // ...
}
```

---

## 📝 Deployment

### Environment Variables

```bash
# .env.production
REACT_APP_API_URL=https://api.yourdomain.com
REACT_APP_GOOGLE_ADS_CUSTOMER_ID=123-456-7890
REACT_APP_ENABLE_ANALYTICS=true
```

### Docker Deployment

```dockerfile
# Dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

---

## 📄 License

MIT License - feel free to use in commercial projects

---

## 🙋 Support

For questions or issues:
- Open a GitHub issue
- Email: support@yourdomain.com
- Documentation: https://docs.yourdomain.com

---

## 🗺️ Roadmap

### Phase 1 (Current)
- ✅ Core dashboard with mock data
- ✅ All 10 widgets implemented
- ✅ Interactive features (sorting, filtering)

### Phase 2 (Next)
- [ ] Google Ads API integration
- [ ] Real-time data refresh
- [ ] User authentication

### Phase 3
- [ ] Meta Ads integration
- [ ] Multi-account support
- [ ] Scheduled reports

### Phase 4
- [ ] AI-powered recommendations (GPT-4 integration)
- [ ] Automated negative keyword addition
- [ ] Predictive waste forecasting

---

**Built with ❤️ for Performance Marketers**
