# Content Optimization Prompt Templates

## Page Optimization

```
Optimize page: [URL]

1. **Current State Analysis:**
   - Fetch the page content
   - Extract current title, description, H1, headings
   - Identify current keyword targeting
   - Check structured data presence

2. **Keyword Optimization:**
   - Primary keyword for this page: [KEYWORD]
   - Secondary keywords: [LIST]
   - Ensure natural keyword placement in:
     - Title tag (near beginning)
     - Meta description
     - H1 heading
     - First paragraph
     - Subheadings where natural
     - Image alt text

3. **Content Improvements:**
   - Identify thin sections to expand
   - Add value beyond competitors
   - Ensure unique, helpful content
   - Add internal links to related pages
   - Add external links to authoritative sources

4. **Technical Optimization:**
   - Optimize title to 50-60 characters
   - Optimize description to 150-160 characters
   - Add missing structured data
   - Ensure proper heading hierarchy

5. **Output:**
   - Optimized title tag
   - Optimized meta description
   - Recommended heading structure
   - Content additions/changes
   - Internal linking recommendations
   - Structured data to add
```

## Meta Tag Optimization

```
Optimize meta tags for: [PAGE/SECTION]

**Guidelines:**
- Title: 50-60 characters, primary keyword near start, brand at end
- Description: 150-160 characters, include CTA, mention unique value

**Target Pages and Specs:**

Homepage:
- Title: "Perception | Bitcoin & Crypto Media Intelligence Platform | 250+ Sources"
- Description: "Track Bitcoin and crypto narratives across 250+ media sources. Real-time sentiment analysis, media monitoring, and intelligence reports for PR teams, analysts, and researchers. Start free trial."

Pricing:
- Title: "Pricing | Perception Crypto Intelligence Platform"
- Description: "Perception pricing starts at $99/month. Get unlimited access to 250+ crypto media sources, sentiment tracking, and AI-powered intelligence reports. Start your free trial today."

Features:
- Title: "Features | Crypto Media Monitoring & Intelligence Tools | Perception"
- Description: "Monitor 250+ crypto media sources, track Bitcoin narratives in real-time, generate intelligence reports with citations. Explore Perception's media monitoring features."

**Output:**
- Current vs recommended for each page
- Character counts
- Keyword placement notes
- Implementation code snippets
```

## Heading Optimization

```
Optimize heading structure for: [PAGE]

**Current Structure:**
[Extract and list current headings]

**Optimized Structure:**

H1: [Primary keyword + page purpose]
  H2: [Feature/benefit 1 with secondary keyword]
    H3: [Specific aspect]
    H3: [Specific aspect]
  H2: [Feature/benefit 2 with secondary keyword]
    H3: [Specific aspect]
  H2: [Social proof/trust signals]
  H2: [FAQ section] (if applicable)
  H2: [CTA section]

**Guidelines:**
- One H1 per page containing primary keyword
- H2s for major sections, include secondary keywords naturally
- H3s for subsections
- Never skip levels (H1 → H3 without H2)
- Make headings descriptive and scannable

**Output:**
- Current heading structure
- Recommended heading structure
- Specific heading text suggestions
- Implementation notes
```

## Internal Linking Optimization

```
Optimize internal linking for: [PAGE or SITE-WIDE]

**Key Pages to Link:**
- Homepage (hub)
- /pricing (conversion)
- /features (product)
- /use-cases/* (persona targeting)
- /compare/* (competitive positioning)
- /intelligence/* (content/resources)

**Linking Strategy:**

From Homepage:
→ Link to all major sections
→ Feature pages with descriptive anchor text
→ Use-case pages with persona-targeted anchors

From Feature Pages:
→ Related use-cases ("Perfect for PR teams →")
→ Pricing page ("See pricing →")
→ Comparison pages where relevant

From Use-Case Pages:
→ Relevant features
→ Other use-cases ("Also great for →")
→ Pricing
→ Case studies/testimonials

From Blog/Content:
→ Product pages where relevant
→ Related articles
→ Resource pages

**Output:**
- Current internal link map
- Missing connections
- Specific link additions with anchor text
- Priority order for implementation
```

## Structured Data Implementation

```
Implement structured data for: [PAGE/SITE]

**Required Schemas:**

1. Organization (all pages):
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Perception",
  "url": "https://perception.to",
  "logo": "https://perception.to/logo.png",
  "description": "Crypto media intelligence platform for monitoring Bitcoin and cryptocurrency coverage across 250+ sources",
  "founder": {
    "@type": "Person",
    "name": "Fernando Nikolić"
  },
  "sameAs": ["twitter_url", "linkedin_url"]
}

2. SoftwareApplication (homepage, features):
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Perception",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web",
  "description": "...",
  "offers": {
    "@type": "Offer",
    "price": "99",
    "priceCurrency": "USD"
  },
  "featureList": [...]
}

3. FAQPage (homepage, relevant pages):
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [...]
}

4. BreadcrumbList (all non-homepage pages):
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [...]
}

**Output:**
- Complete schema code for each page
- Implementation location (which component/file)
- Validation status
```

## FAQ Content Creation

```
Create FAQ content for: [PAGE/TOPIC]

**Guidelines:**
- Questions should match real search queries
- Answers should be comprehensive but concise
- Include keywords naturally
- Lead with direct answer, then elaborate
- Link to relevant pages where helpful

**Required FAQs for Homepage:**
1. What is Perception?
2. How is Perception different from LunarCrush/Santiment?
3. What sources does Perception monitor?
4. Who is Perception built for?
5. How much does Perception cost?
6. Does Perception offer a free trial?
7. What are Perception Recipes?
8. What are Perception Spaces?

**Output:**
- Question and answer pairs
- FAQPage schema markup
- Placement recommendations
- Internal link opportunities within answers
```
