# Widget Visual Overview

Quick reference guide for all 10 dashboard widgets.

---

## 1. 📊 Metric Cards

**Location:** Top of dashboard  
**Layout:** 3 columns × 2 rows (6 cards)

```
┌──────────────────┬──────────────────┬──────────────────┐
│  Total Wasted    │  Waste           │  Intent          │
│  Spend           │  Percentage      │  Mismatches      │
│  $24,580         │  32%             │  847             │
│  +12.5% ↑        │  -3.2% ↓         │  +94 ↑           │
└──────────────────┴──────────────────┴──────────────────┘
┌──────────────────┬──────────────────┬──────────────────┐
│  Wasted          │  Avg Waste       │  High-Risk       │
│  Clicks          │  per Keyword     │  Keywords        │
│  15,234          │  $156            │  127             │
│  +8.7% ↑         │  -5.3% ↓         │  +15 ↑           │
└──────────────────┴──────────────────┴──────────────────┘
```

**Visual Elements:**
- Icon (top-left): DollarSign, Percent, Target, etc.
- Large number (center): Primary metric
- Trend indicator (bottom): +/-% with color
- Color coding: Red (danger), Orange (warning), Green (success)

---

## 2. 🎯 Actionable Insights

**Location:** Below metrics  
**Layout:** Full-width cards (stacked)

```
┌─────────────────────────────────────────────────────────┐
│ ⚠️ CRITICAL                                              │
│ Broad Match Keywords Draining 58% of Budget             │
│                                                          │
│ Your broad match keywords triggered 342 irrelevant...   │
│                                                          │
│ ┌─────────────┬─────────────┬─────────────┐            │
│ │ Savings:    │ Keywords:   │ Timeline:   │            │
│ │ $14,256     │ 342         │ 2-3 days    │            │
│ └─────────────┴─────────────┴─────────────┘            │
│                                                          │
│ 📋 Recommended Actions:                                 │
│ ✓ Convert top 50 broad keywords to phrase match        │
│ ✓ Add 180 negative keywords                            │
│ ✓ Pause 25 keywords with >$200 waste                   │
│                                                          │
│ 💡 Example: "marketing software" triggered "free..."   │
│                                                          │
│ [Apply Recommendation] [View Details] [Dismiss]        │
└─────────────────────────────────────────────────────────┘
```

**Visual Elements:**
- Color-coded left border (red/orange/yellow/green)
- Severity badge (top-right)
- 3-column metrics grid
- Bullet list of actions
- Example box (gray background)
- Action buttons (bottom)

---

## 3. ⚡ Quick Actions

**Location:** Below insights  
**Layout:** 4 columns (horizontal cards)

```
┌──────────────┬──────────────┬──────────────┬──────────────┐
│   Download   │    Plus      │    Pause     │    Report    │
│   📥         │    ➕        │    ⏸️        │    📄        │
│              │              │              │              │
│ Export       │ Bulk Add     │ Pause High-  │ Generate     │
│ Negative     │ Negatives    │ Waste        │ Report       │
│ Keywords     │              │ Keywords     │              │
│              │              │              │              │
│ 234 terms    │ 87 terms     │ 52 keywords  │              │
└──────────────┴──────────────┴──────────────┴──────────────┘
```

**Visual Elements:**
- Large icon (top)
- Title (bold)
- Description (small text)
- Count badge (if applicable)
- Hover effect (shadow)

---

## 4. 📈 Waste Trend Chart

**Location:** Below quick actions  
**Layout:** Full-width chart

```
┌─────────────────────────────────────────────────────────┐
│ Waste Spend Trend (Last 30 Days)                        │
│                                                          │
│ $4K ┤                          ╱╲                        │
│     │                     ╱╲  ╱  ╲    ╱╲                 │
│ $3K ┤       ╱╲     ╱╲   ╱  ╲╱    ╲  ╱  ╲    ╱╲          │
│     │  ╱╲  ╱  ╲   ╱  ╲ ╱          ╲╱    ╲  ╱  ╲         │
│ $2K ┤╱   ╲╱    ╲ ╱    ╲                   ╲╱    ╲       │
│     │                                                    │
│     └────────────────────────────────────────────────   │
│     Feb 16                                    Mar 17    │
│                                                          │
│ Legend: ━━━ Total Spend  ━━━ Wasted Spend              │
│                                                          │
│ ┌──────────────┬──────────────┬──────────────┐          │
│ │ Peak Day:    │ Avg Daily:   │ Trend:       │          │
│ │ Feb 24       │ $1,045       │ ↓ -8.2%      │          │
│ │ $1,290       │ 32% of spend │ Decreasing   │          │
│ └──────────────┴──────────────┴──────────────┘          │
└─────────────────────────────────────────────────────────┘
```

**Visual Elements:**
- Area chart (blue = total, red = waste)
- X-axis: dates
- Y-axis: dollar amounts
- Legend
- Summary metrics below

---

## 5. 🥧 Waste by Match Type

**Location:** Left column (2-column layout)  
**Layout:** Half-width card

```
┌────────────────────────────────┐
│ Waste by Match Type            │
│                                 │
│         ╱────╲                  │
│       ╱  58%  ╲                 │
│      │  BROAD  │                │
│      │         │                │
│       ╲  30%  ╱  12%            │
│        ╲PHRASE╱  EXACT          │
│         ╲────╱                  │
│                                 │
│ ┌─────────────────────────┐    │
│ │ 🔴 BROAD    $14,256 58%│    │
│ │ 342 keywords            │    │
│ └─────────────────────────┘    │
│ ┌─────────────────────────┐    │
│ │ 🟠 PHRASE   $7,374  30%│    │
│ │ 215 keywords            │    │
│ └─────────────────────────┘    │
│ ┌─────────────────────────┐    │
│ │ 🟢 EXACT    $2,950  12%│    │
│ │ 89 keywords             │    │
│ └─────────────────────────┘    │
│                                 │
│ ⚠️ Broad match accounts for    │
│ 58% of waste. Consider phrase  │
│ or exact match.                │
└────────────────────────────────┘
```

**Visual Elements:**
- Pie chart (top)
- Color-coded segments
- Detail cards (below chart)
- Recommendation box (bottom)

---

## 6. 📊 Top Waste Categories

**Location:** Right column (2-column layout)  
**Layout:** Half-width card

```
┌────────────────────────────────┐
│ Top Waste Categories           │
│                                 │
│ Informational ████████ $5,840  │
│ Competitor    ██████   $4,230  │
│ Low-Quality   █████    $3,180  │
│ Wrong Product ████     $2,890  │
│ Misspellings  ███      $2,140  │
│                                 │
│ ┌─────────────────────────┐    │
│ │ #1 Informational        │    │
│ │ 127 keywords            │    │
│ │ $5,840      [Details →] │    │
│ └─────────────────────────┘    │
│ ┌─────────────────────────┐    │
│ │ #2 Competitor           │    │
│ │ 89 keywords             │    │
│ │ $4,230      [Details →] │    │
│ └─────────────────────────┘    │
│                                 │
│ 💡 Add negatives for           │
│ "Informational" to save $5,840 │
└────────────────────────────────┘
```

**Visual Elements:**
- Horizontal bar chart
- Top 3 detail cards
- Quick win suggestion

---

## 7. 🎨 Keyword Performance Matrix

**Location:** Full-width (below 2-column layout)  
**Layout:** Scatter plot

```
┌─────────────────────────────────────────────────────────┐
│ Keyword Performance Matrix                               │
│ Cost vs. Clicks (bubble size = conversions)             │
│                                                          │
│  $2.5K ┤              ●                    ●             │
│        │                                                 │
│  $2.0K ┤        ⚫                ●                      │
│        │                                    ⚫           │
│  $1.5K ┤    ●            ⚫          ●                   │
│        │        ●               ●      ●                │
│  $1.0K ┤  ●          ●     ●                            │
│        │                  ●         ⚫                   │
│   $500 ┤    ●                   ●        ●             │
│        │        ●    ●                                  │
│      0 └──────┬────────┬────────┬────────┬────────     │
│          0   200     400     600     800   1000        │
│                      Clicks                             │
│                                                          │
│ Legend:                                                 │
│ ● 0% Conv Rate   ● <2%   ● 2-5%   ⚫ >5%              │
│                                                          │
│ 💡 Focus on red bubbles in upper-right (high cost,     │
│ high clicks, 0 conversions)                            │
└─────────────────────────────────────────────────────────┘
```

**Visual Elements:**
- Scatter plot
- Color-coded bubbles by conversion rate
- Size = conversion volume
- Interactive tooltips on hover

---

## 8. 🔍 Intent Mismatch Table

**Location:** Full-width (below matrix)  
**Layout:** Sortable table

```
┌─────────────────────────────────────────────────────────┐
│ Intent Mismatch Details                                  │
│                                                          │
│ [☐ Select All]  [+ Add as Negative (0)] [Export]       │
│                                                          │
│ ┌───┬──────────────┬───────────┬────────┬──────┬────┐  │
│ │☐  │ Search Term  │ Keyword   │ Match  │Score │Waste│ │
│ ├───┼──────────────┼───────────┼────────┼──────┼────┤  │
│ │☐  │⚠️ how to use │ crm       │ BROAD  │ 25% │$340│ │
│ │   │ crm software │ software  │        │ 🔴  │    │  │
│ ├───┼──────────────┼───────────┼────────┼──────┼────┤  │
│ │☐  │⚠️ free      │ marketing │ BROAD  │ 35% │$285│ │
│ │   │ marketing   │ automation│        │ 🔴  │    │  │
│ ├───┼──────────────┼───────────┼────────┼──────┼────┤  │
│ │☐  │ salesforce  │ crm tool  │ BROAD  │ 18% │$410│ │
│ │   │ vs hubspot  │           │        │ 🔴  │    │  │
│ └───┴──────────────┴───────────┴────────┴──────┴────┘  │
│                                                          │
│ Showing 15 terms • Total waste: $3,420                 │
│ [Previous] [1] [2] [Next]                              │
└─────────────────────────────────────────────────────────┘
```

**Visual Elements:**
- Checkbox column (bulk select)
- Alert icons for high mismatches
- Color-coded match scores
- Pagination controls
- Action buttons (top)

---

## 9. ☁️ Search Term Cloud

**Location:** Full-width (below table)  
**Layout:** Word cloud

```
┌─────────────────────────────────────────────────────────┐
│ Wasted Search Terms Cloud                               │
│ Size = waste amount • Click to exclude                  │
│                                                          │
│ [Search: _________] [Category: All ▼]                   │
│                                                          │
│ ┌───────────────────────────────────────────────────┐   │
│ │         free crm         how to     salesforce    │   │
│ │   cheap tools                    hubspot vs       │   │
│ │             email tips                            │   │
│ │  what is      discount crm   mailchimp           │   │
│ │       marketing guide     tutorial               │   │
│ │  activecampaign    free email                    │   │
│ │         monday alternatives    seo guide         │   │
│ │  best practices     automation tips              │   │
│ └───────────────────────────────────────────────────┘   │
│                                                          │
│ Legend: ● >$1K  ● $500-1K  ● $200-500  ● <$200         │
│                                                          │
│ 87 terms shown • Total waste: $18,450                   │
│ [Add All as Negative Keywords]                          │
└─────────────────────────────────────────────────────────┘
```

**Visual Elements:**
- Variable font sizes (by waste)
- Color gradient (red → orange → yellow → gray)
- Search/filter controls
- Interactive (click to select)

---

## 10. 💰 Cost Savings Calculator

**Location:** Full-width (bottom of dashboard)  
**Layout:** Scenario cards + projections

```
┌─────────────────────────────────────────────────────────┐
│ Potential Savings Calculator                             │
│                                                          │
│ Select optimization strategy:                            │
│                                                          │
│ ┌──────────────┬──────────────┬──────────────┐          │
│ │✓ Conservative│  Moderate    │  Aggressive  │          │
│ │              │              │              │          │
│ │ 35% reduction│ 60% reduction│ 85% reduction│          │
│ └──────────────┴──────────────┴──────────────┘          │
│                                                          │
│ ╔════════════════════════════════════════════╗          │
│ ║  Monthly Savings: $8,603                   ║          │
│ ║  Annual Savings:  $103,236                 ║          │
│ ║  ROI Improvement: 12.6%                    ║          │
│ ╚════════════════════════════════════════════╝          │
│                                                          │
│ ┌──────────────────────┬──────────────────────┐         │
│ │ 📋 Implementation:   │ ⏱️ Timeline:         │         │
│ │ ✓ Add negatives     │ Time: 1-2 days      │         │
│ │ ✓ Pause high-waste  │ Effort: 2 hrs/month │         │
│ │ ✓ Review quarterly  │ Risk: Low           │         │
│ └──────────────────────┴──────────────────────┘         │
│                                                          │
│ Based on last 30 days • [Start Optimization]           │
└─────────────────────────────────────────────────────────┘
```

**Visual Elements:**
- 3 scenario cards (selectable)
- Green highlight box (projections)
- 2-column layout (steps + timeline)
- Action button (bottom-right)

---

## Layout Hierarchy

```
┌─────────────────────────────────────────────────────────┐
│ HEADER (Platform selector, Date range, Refresh)         │
├─────────────────────────────────────────────────────────┤
│                                                          │
│ 1. METRIC CARDS (6 cards, 3×2 grid)                     │
│                                                          │
├─────────────────────────────────────────────────────────┤
│                                                          │
│ 2. ACTIONABLE INSIGHTS (stacked cards)                   │
│                                                          │
├─────────────────────────────────────────────────────────┤
│                                                          │
│ 3. QUICK ACTIONS (4 cards, horizontal)                   │
│                                                          │
├─────────────────────────────────────────────────────────┤
│                                                          │
│ 4. WASTE TREND CHART (full-width)                       │
│                                                          │
├──────────────────────────────┬──────────────────────────┤
│                              │                          │
│ 5. WASTE BY MATCH TYPE       │ 6. TOP CATEGORIES       │
│    (pie chart)               │    (bar chart)          │
│                              │                          │
├──────────────────────────────┴──────────────────────────┤
│                                                          │
│ 7. PERFORMANCE MATRIX (scatter plot)                    │
│                                                          │
├─────────────────────────────────────────────────────────┤
│                                                          │
│ 8. INTENT MISMATCH TABLE (sortable)                     │
│                                                          │
├─────────────────────────────────────────────────────────┤
│                                                          │
│ 9. SEARCH TERM CLOUD (word cloud)                       │
│                                                          │
├─────────────────────────────────────────────────────────┤
│                                                          │
│ 10. SAVINGS CALCULATOR (scenarios)                       │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

---

## Color Palette

### Primary Colors
- **Danger/Red:** `#ef4444` - High waste, critical issues
- **Warning/Orange:** `#f59e0b` - Medium severity
- **Success/Green:** `#22c55e` - Optimization opportunities
- **Primary/Blue:** `#3b82f6` - Neutral metrics, links
- **Gray:** `#6b7280` - Low priority, text

### Background Colors
- **White:** `#ffffff` - Card backgrounds
- **Gray-50:** `#f9fafb` - Page background
- **Gray-100:** `#f3f4f6` - Hover states

### Severity Badges
- **Critical:** Red background, white text
- **High:** Orange background, dark orange text
- **Medium:** Yellow background, dark yellow text
- **Low:** Green background, dark green text

---

## Typography

### Font Family
- **Primary:** System fonts (Segoe UI, Roboto, Helvetica)
- **Monospace:** Courier New (for numbers)

### Font Sizes
- **3XL (30px):** Large numbers in metrics
- **2XL (24px):** Page titles
- **XL (20px):** Widget titles
- **LG (18px):** Subheadings
- **Base (16px):** Body text
- **SM (14px):** Labels, descriptions
- **XS (12px):** Footnotes, badges

### Font Weights
- **Bold (700):** Primary metrics, titles
- **Semibold (600):** Subheadings, labels
- **Medium (500):** Buttons, links
- **Regular (400):** Body text

---

## Interactive States

### Hover States
- Cards: Shadow elevation (sm → md)
- Buttons: Background darkens 10%
- Table rows: Light gray background
- Chart elements: Tooltip appears

### Click States
- Buttons: Background darkens 20%
- Checkboxes: Checked state with blue checkmark
- Badges: Scale 95% on click

### Loading States
- Skeleton screens (gray pulse animation)
- Spinner for async operations
- Disabled state (50% opacity)

---

## Responsive Breakpoints

```
Desktop (1920px+)   Full 3-column layout
Laptop (1280px)     2-column layout
Tablet (768px)      1-column layout
Mobile (375px)      Single column, stacked cards
```

---

## Icons Used (Lucide React)

- DollarSign, TrendingDown, AlertTriangle, Target, Percent, MousePointer
- AlertCircle, TrendingUp, Zap, CheckCircle, XCircle
- Download, Upload, PlayCircle, PauseCircle, Plus, FileText
- Search, Filter, ArrowUpDown, RefreshCw

---

*Visual reference only - see actual dashboard for live interactions*
