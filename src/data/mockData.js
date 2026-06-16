export const mockData = {
  // Key Metrics
  metrics: {
    totalWaste: 24580,
    wasteChange: 12.5,
    wastePercentage: 32,
    wastePercentageChange: -3.2,
    intentMismatches: 847,
    intentMismatchChange: '+94',
    wastedClicks: 15234,
    wastedClicksChange: 8.7,
    avgWastePerKeyword: 156,
    avgWasteChange: -5.3,
    highRiskKeywords: 127,
    highRiskChange: '+15'
  },

  // Actionable Insights
  insights: [
    {
      type: 'critical',
      severity: 'critical',
      title: 'Broad Match Keywords Draining 58% of Budget',
      description: 'Your broad match keywords are triggering irrelevant searches, resulting in $14,256 wasted spend this month. 342 search terms show 0% conversion rate with high click volume.',
      potentialSavings: 14256,
      affectedKeywords: 342,
      implementation: '2-3 days',
      actions: [
        'Convert top 50 broad match keywords to phrase match',
        'Add 180 negative keywords from intent mismatch list',
        'Pause 25 keywords with >$200 waste and 0 conversions for 30 days',
        'Set up automated alerts for new high-waste broad terms'
      ],
      example: 'Keyword "marketing software" (broad) triggered searches like "free marketing software crack" and "marketing software tutorial pdf" - converting these to phrase match would eliminate 89% of waste.'
    },
    {
      type: 'opportunity',
      severity: 'high',
      title: 'Intent Mismatch: Informational vs. Transactional',
      description: '127 keywords are attracting informational searches (how-to, guide, tutorial) when your landing pages are transactional (pricing, signup). This intent mismatch costs $5,840/month.',
      potentialSavings: 5840,
      affectedKeywords: 127,
      implementation: '1 day',
      actions: [
        'Add negative keywords: how, guide, tutorial, tips, learn, free, DIY',
        'Create separate ad group for informational content (if you have blog)',
        'Review ad copy to ensure it signals transactional intent',
        'Consider bid adjustments for informational terms if keeping them'
      ],
      example: 'Keyword "email marketing" triggers "how to do email marketing free" - add phrase negatives for "how to" and "free" to filter this traffic.'
    },
    {
      type: 'recommendation',
      severity: 'high',
      title: 'Duplicate Keywords Competing Across Ad Groups',
      description: '45 keywords appear in multiple ad groups, causing internal competition and inflated costs. This duplication wastes $3,250/month through bid competition.',
      potentialSavings: 3250,
      affectedKeywords: 45,
      implementation: '3-4 hours',
      actions: [
        'Consolidate duplicate keywords into single ad group per campaign',
        'Remove lower-performing duplicates',
        'Implement keyword-level tracking to prevent future duplication',
        'Review Quality Score impact after consolidation'
      ],
      example: 'Keyword "CRM software" exists in 3 ad groups with different bids ($4.50, $6.20, $5.80) - consolidate to single $4.50 bid to save on internal auction pressure.'
    },
    {
      type: 'quick-win',
      severity: 'medium',
      title: 'Low-Quality Traffic from "Free" and "Cheap" Searches',
      description: '89 search terms containing "free", "cheap", or "discount" have generated 2,340 clicks with 0 conversions, wasting $2,180.',
      potentialSavings: 2180,
      affectedKeywords: 89,
      implementation: '30 minutes',
      actions: [
        'Add negative keywords: free, cheap, discount, coupon, crack, torrent',
        'Review if you offer any free tier - if yes, create dedicated campaign',
        'Set up ongoing monitoring for price-sensitive terms',
        'Consider separate campaign with adjusted messaging if targeting budget-conscious users'
      ],
      example: 'Search "free CRM software" clicked ad for $2.40 average CPC - user looking for $0 solution won\'t convert on paid product.'
    }
  ],

  // Quick Actions
  quickActions: {
    negativeKeywordCount: 234,
    bulkAddCount: 87,
    pauseCount: 52,
  },

  // Waste Trend Over Time
  wasteTrend: [
    { date: 'Feb 16', totalSpend: 3200, wastedSpend: 980 },
    { date: 'Feb 17', totalSpend: 3400, wastedSpend: 1120 },
    { date: 'Feb 18', totalSpend: 3100, wastedSpend: 950 },
    { date: 'Feb 19', totalSpend: 3600, wastedSpend: 1240 },
    { date: 'Feb 20', totalSpend: 3300, wastedSpend: 1050 },
    { date: 'Feb 21', totalSpend: 2900, wastedSpend: 890 },
    { date: 'Feb 22', totalSpend: 2800, wastedSpend: 840 },
    { date: 'Feb 23', totalSpend: 3500, wastedSpend: 1180 },
    { date: 'Feb 24', totalSpend: 3700, wastedSpend: 1290 },
    { date: 'Feb 25', totalSpend: 3200, wastedSpend: 1020 },
    { date: 'Feb 26', totalSpend: 3400, wastedSpend: 1100 },
    { date: 'Feb 27', totalSpend: 3100, wastedSpend: 970 },
    { date: 'Feb 28', totalSpend: 3300, wastedSpend: 1060 },
    { date: 'Mar 1', totalSpend: 3600, wastedSpend: 1200 },
    { date: 'Mar 2', totalSpend: 2950, wastedSpend: 910 },
    { date: 'Mar 3', totalSpend: 2850, wastedSpend: 850 },
    { date: 'Mar 4', totalSpend: 3450, wastedSpend: 1150 },
    { date: 'Mar 5', totalSpend: 3750, wastedSpend: 1280 },
    { date: 'Mar 6', totalSpend: 3250, wastedSpend: 1010 },
    { date: 'Mar 7', totalSpend: 3350, wastedSpend: 1080 },
    { date: 'Mar 8', totalSpend: 3150, wastedSpend: 960 },
    { date: 'Mar 9', totalSpend: 3280, wastedSpend: 1040 },
    { date: 'Mar 10', totalSpend: 3550, wastedSpend: 1190 },
    { date: 'Mar 11', totalSpend: 2980, wastedSpend: 900 },
    { date: 'Mar 12', totalSpend: 2880, wastedSpend: 860 },
    { date: 'Mar 13', totalSpend: 3420, wastedSpend: 1130 },
    { date: 'Mar 14', totalSpend: 3680, wastedSpend: 1250 },
    { date: 'Mar 15', totalSpend: 3180, wastedSpend: 990 },
    { date: 'Mar 16', totalSpend: 3310, wastedSpend: 1070 },
    { date: 'Mar 17', totalSpend: 3120, wastedSpend: 950 }
  ],

  // Waste by Match Type
  wasteByMatchType: [
    {
      name: 'BROAD',
      value: 14256,
      percentage: 58,
      keywords: 342,
      searchTerms: 1847
    },
    {
      name: 'PHRASE',
      value: 7374,
      percentage: 30,
      keywords: 215,
      searchTerms: 892
    },
    {
      name: 'EXACT',
      value: 2950,
      percentage: 12,
      keywords: 89,
      searchTerms: 234
    }
  ],

  // Top Waste Categories
  wasteCategories: [
    { category: 'Informational Queries', waste: 5840, keywords: 127, searchTerms: 456 },
    { category: 'Competitor Searches', waste: 4230, keywords: 89, searchTerms: 312 },
    { category: 'Low-Quality Traffic', waste: 3180, keywords: 94, searchTerms: 387 },
    { category: 'Wrong Product Category', waste: 2890, keywords: 72, searchTerms: 245 },
    { category: 'Misspellings & Typos', waste: 2140, keywords: 156, searchTerms: 568 },
    { category: 'Too Broad Searches', waste: 1980, keywords: 64, searchTerms: 189 },
    { category: 'Geographic Mismatch', waste: 1650, keywords: 43, searchTerms: 124 },
    { category: 'Intent Mismatch', waste: 1420, keywords: 58, searchTerms: 203 }
  ],

  // Keyword Performance Matrix
  performanceMatrix: [
    { keyword: 'marketing software', clicks: 450, cost: 1980, conversions: 0, conversionRate: 0, cpa: Infinity, matchType: 'BROAD' },
    { keyword: 'crm tool', clicks: 380, cost: 1650, conversions: 2, conversionRate: 0.53, cpa: 825, matchType: 'BROAD' },
    { keyword: 'email marketing platform', clicks: 290, cost: 1420, conversions: 8, conversionRate: 2.76, cpa: 177.5, matchType: 'PHRASE' },
    { keyword: 'best crm software', clicks: 520, cost: 2240, conversions: 0, conversionRate: 0, cpa: Infinity, matchType: 'BROAD' },
    { keyword: 'project management tool', clicks: 410, cost: 1780, conversions: 12, conversionRate: 2.93, cpa: 148.33, matchType: 'PHRASE' },
    { keyword: 'sales automation software', clicks: 180, cost: 890, conversions: 6, conversionRate: 3.33, cpa: 148.33, matchType: 'EXACT' },
    { keyword: 'marketing automation', clicks: 340, cost: 1540, conversions: 1, conversionRate: 0.29, cpa: 1540, matchType: 'BROAD' },
    { keyword: 'customer relationship management', clicks: 280, cost: 1240, conversions: 9, conversionRate: 3.21, cpa: 137.78, matchType: 'PHRASE' },
    { keyword: 'email marketing software', clicks: 220, cost: 980, conversions: 11, conversionRate: 5, cpa: 89.09, matchType: 'EXACT' },
    { keyword: 'free crm', clicks: 620, cost: 1240, conversions: 0, conversionRate: 0, cpa: Infinity, matchType: 'BROAD' },
    { keyword: 'seo tools', clicks: 390, cost: 1680, conversions: 3, conversionRate: 0.77, cpa: 560, matchType: 'BROAD' },
    { keyword: 'social media management', clicks: 310, cost: 1380, conversions: 7, conversionRate: 2.26, cpa: 197.14, matchType: 'PHRASE' },
    { keyword: 'analytics software', clicks: 270, cost: 1190, conversions: 10, conversionRate: 3.7, cpa: 119, matchType: 'EXACT' },
    { keyword: 'cheap marketing tools', clicks: 480, cost: 960, conversions: 0, conversionRate: 0, cpa: Infinity, matchType: 'BROAD' },
    { keyword: 'b2b marketing software', clicks: 160, cost: 780, conversions: 8, conversionRate: 5, cpa: 97.5, matchType: 'EXACT' }
  ],

  // Intent Mismatch Table
  intentMismatches: [
    { id: 1, searchTerm: 'how to use crm software', keyword: 'crm software', matchType: 'BROAD', intent: 'Informational', intentMatch: 25, waste: 340, clicks: 78 },
    { id: 2, searchTerm: 'free marketing automation tools', keyword: 'marketing automation', matchType: 'BROAD', intent: 'Informational', intentMatch: 35, waste: 285, clicks: 142 },
    { id: 3, searchTerm: 'salesforce vs hubspot', keyword: 'crm tool', matchType: 'BROAD', intent: 'Navigational', intentMatch: 18, waste: 410, clicks: 95 },
    { id: 4, searchTerm: 'email marketing tips', keyword: 'email marketing platform', matchType: 'PHRASE', intent: 'Informational', intentMatch: 42, waste: 198, clicks: 54 },
    { id: 5, searchTerm: 'cheap crm software', keyword: 'crm software', matchType: 'BROAD', intent: 'Transactional', intentMatch: 68, waste: 220, clicks: 110 },
    { id: 6, searchTerm: 'what is marketing automation', keyword: 'marketing automation', matchType: 'BROAD', intent: 'Informational', intentMatch: 28, waste: 156, clicks: 39 },
    { id: 7, searchTerm: 'project management tutorial', keyword: 'project management tool', matchType: 'PHRASE', intent: 'Informational', intentMatch: 31, waste: 187, clicks: 51 },
    { id: 8, searchTerm: 'mailchimp login', keyword: 'email marketing software', matchType: 'BROAD', intent: 'Navigational', intentMatch: 12, waste: 312, clicks: 156 },
    { id: 9, searchTerm: 'free seo tools online', keyword: 'seo tools', matchType: 'BROAD', intent: 'Informational', intentMatch: 45, waste: 178, clicks: 89 },
    { id: 10, searchTerm: 'crm software comparison', keyword: 'best crm software', matchType: 'BROAD', intent: 'Informational', intentMatch: 52, waste: 245, clicks: 63 },
    { id: 11, searchTerm: 'how to do email marketing', keyword: 'email marketing platform', matchType: 'PHRASE', intent: 'Informational', intentMatch: 38, waste: 167, clicks: 43 },
    { id: 12, searchTerm: 'marketing software free download', keyword: 'marketing software', matchType: 'BROAD', intent: 'Informational', intentMatch: 22, waste: 298, clicks: 149 },
    { id: 13, searchTerm: 'zoho crm pricing', keyword: 'crm tool', matchType: 'BROAD', intent: 'Navigational', intentMatch: 15, waste: 234, clicks: 78 },
    { id: 14, searchTerm: 'social media marketing guide', keyword: 'social media management', matchType: 'PHRASE', intent: 'Informational', intentMatch: 34, waste: 145, clicks: 38 },
    { id: 15, searchTerm: 'analytics tools tutorial', keyword: 'analytics software', matchType: 'BROAD', intent: 'Informational', intentMatch: 29, waste: 132, clicks: 44 }
  ],

  // Search Terms Cloud
  searchTerms: [
    { term: 'free crm', waste: 1240, clicks: 620, category: 'Low-Quality Traffic' },
    { term: 'how to use crm', waste: 890, clicks: 245, category: 'Informational' },
    { term: 'salesforce login', waste: 780, clicks: 390, category: 'Competitor' },
    { term: 'cheap marketing tools', waste: 960, clicks: 480, category: 'Low-Quality Traffic' },
    { term: 'hubspot vs marketo', waste: 650, clicks: 185, category: 'Competitor' },
    { term: 'email marketing tips', waste: 420, clicks: 140, category: 'Informational' },
    { term: 'what is crm', waste: 380, clicks: 127, category: 'Informational' },
    { term: 'mailchimp pricing', waste: 340, clicks: 113, category: 'Competitor' },
    { term: 'free email marketing', waste: 580, clicks: 290, category: 'Low-Quality Traffic' },
    { term: 'marketing automation guide', waste: 290, clicks: 97, category: 'Informational' },
    { term: 'activecampaign review', waste: 270, clicks: 90, category: 'Competitor' },
    { term: 'crm software tutorial', waste: 320, clicks: 106, category: 'Informational' },
    { term: 'discount crm software', waste: 410, clicks: 205, category: 'Low-Quality Traffic' },
    { term: 'monday.com alternatives', waste: 230, clicks: 76, category: 'Competitor' },
    { term: 'how to do seo', waste: 190, clicks: 63, category: 'Informational' },
    { term: 'free project management', waste: 450, clicks: 225, category: 'Low-Quality Traffic' },
    { term: 'salesforce demo', waste: 310, clicks: 103, category: 'Competitor' },
    { term: 'email marketing best practices', waste: 210, clicks: 70, category: 'Informational' },
    { term: 'cheap automation tools', waste: 340, clicks: 170, category: 'Low-Quality Traffic' },
    { term: 'pipedrive vs copper', waste: 180, clicks: 60, category: 'Competitor' }
  ],

  // Savings Data
  savings: {
    totalWaste: 24580,
    totalSpend: 76800
  }
};
