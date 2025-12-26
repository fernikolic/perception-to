# Report Template Documentation

This directory contains audience-specific report templates used by the Perception platform to generate tailored strategic intelligence reports.

## Available Templates

### 1. C-Suite Executive (`c-suite-executive.md`)
**Audience**: CEOs, CFOs, Board of Directors
**Focus**: Strategic business impact, competitive positioning, market valuation
**Key Elements**:
- Board-ready executive summaries
- ROI and business impact metrics
- Strategic risk assessment
- Market position analysis
- Investment recommendations

### 2. PR & Communications (`pr-communications.md`)
**Audience**: PR managers, Communications directors, Brand managers
**Focus**: Media relations, narrative control, reputation management
**Key Elements**:
- Media coverage analysis
- Journalist relationship intelligence
- Message effectiveness assessment
- Crisis risk evaluation
- Content strategy recommendations

### 3. Marketing Team (`marketing-team.md`)
**Audience**: CMOs, Content managers, Digital marketers
**Focus**: Campaign performance, content strategy, audience engagement
**Key Elements**:
- Content performance metrics
- Audience engagement analysis
- Campaign ROI assessment
- Channel optimization
- Creative strategy insights

### 4. Business Development (`business-development.md`)
**Audience**: BD leaders, Partnership managers, Sales executives
**Focus**: Partnership opportunities, market expansion, competitive intelligence
**Key Elements**:
- Partnership readiness assessment
- Market expansion opportunities
- Competitive positioning for deals
- Revenue opportunity analysis
- Industry relationship mapping

### 5. Investor Relations (`investor-relations.md`)
**Audience**: IR directors, Financial communications, Investor managers
**Focus**: Investment narrative, analyst relations, market perception
**Key Elements**:
- Investment thesis clarity
- Financial media analysis
- Analyst relationship intelligence
- Valuation impact assessment
- ESG narrative development

### 6. Product Team (`product-team.md`)
**Audience**: Product managers, UX designers, Engineering leads
**Focus**: User sentiment, feature feedback, product-market fit
**Key Elements**:
- User experience analysis
- Feature reception intelligence
- Product positioning assessment
- Competitive feature analysis
- Development prioritization insights

## Template Variables

Each template uses Handlebars-style variables that are populated by the report generation system:

### Core Variables
- `{{CLIENT_NAME}}` - Client/company name
- `{{TOTAL_MENTIONS}}` - Total number of media mentions
- `{{OUTLET_COUNT}}` - Number of unique outlets
- `{{ANALYSIS_PERIOD}}` - Time period covered
- `{{SENTIMENT_ANALYSIS}}` - Sentiment breakdown and analysis

### Conditional Sections
- `{{#if CHART_SNAPSHOTS}}` - Includes chart analysis if charts are present
- `{{#if TREND_ANALYSIS}}` - Includes trending topic analysis if trends are available
- `{{#if NEGATIVE_COVERAGE}}` - Includes negative coverage analysis if applicable

### Audience-Specific Variables
Each template includes specialized variables relevant to the target audience:
- **C-Suite**: Market cap impact, competitive position, ROI metrics
- **PR**: Media relationship intelligence, narrative control, reputation scores
- **Marketing**: Campaign performance, content effectiveness, channel optimization
- **BD**: Partnership opportunities, market expansion, deal intelligence
- **IR**: Investment narrative, analyst coverage, valuation impact
- **Product**: User sentiment, feature feedback, product-market fit

## Customization

Templates can be customized by editing the markdown files directly. The system will automatically use the updated templates for report generation.

### Best Practices
1. Maintain consistent variable naming across templates
2. Include audience-appropriate metrics and KPIs
3. Use professional language appropriate for the target audience
4. Ensure actionable recommendations are included
5. Test templates with sample data before deploying

## Technical Integration

The templates are integrated into the report generation system via:
1. Template selection based on user role/audience
2. Variable population from analytics data
3. Conditional section rendering based on available data
4. Professional formatting and structure maintenance

## Updates and Maintenance

Templates should be reviewed and updated regularly to:
- Incorporate new metrics and KPIs
- Reflect evolving audience needs
- Improve clarity and actionability
- Maintain professional standards

Last Updated: {{CURRENT_DATE}}
Version: 1.0