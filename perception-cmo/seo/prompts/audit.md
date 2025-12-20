# SEO Audit Prompt Templates

## Full Technical Audit

```
Perform a comprehensive SEO audit of perception.to:

1. **Technical SEO**
   - Check if SSR renders content (curl the homepage, look for key terms)
   - Verify robots.txt exists and allows crawling
   - Verify sitemap.xml exists and includes all pages
   - Check for canonical URLs on each page
   - Verify HTTPS is properly configured

2. **On-Page SEO**
   - Audit title tags (length, keyword presence, uniqueness)
   - Audit meta descriptions (length, CTA, uniqueness)
   - Check H1 tags (one per page, keyword presence)
   - Verify heading hierarchy (H1 → H2 → H3)
   - Check image alt text coverage

3. **Structured Data**
   - Check for Organization schema
   - Check for SoftwareApplication schema
   - Check for FAQPage schema
   - Check for BreadcrumbList schema
   - Validate schemas with schema.org validator format

4. **Content**
   - Evaluate keyword targeting on homepage
   - Check for thin content pages
   - Identify missing content opportunities

5. **Performance**
   - Note any obvious performance issues
   - Check for render-blocking resources

Output a structured report with:
- Issues found (Critical/High/Medium/Low)
- Specific recommendations for each issue
- Implementation priority order
```

## Meta Tags Audit

```
Audit meta tags across perception.to:

1. Fetch and analyze these pages:
   - Homepage (/)
   - Pricing (/pricing)
   - Features (/features)
   - Any other discoverable pages

2. For each page, check:
   - Title tag: Present? Length (50-60 chars ideal)? Contains primary keyword?
   - Description: Present? Length (150-160 chars ideal)? Has CTA?
   - Canonical URL: Present? Correct?
   - OG tags: og:title, og:description, og:image, og:url
   - Twitter cards: twitter:card, twitter:title, twitter:description

3. Compare against target specifications:
   - Homepage title should be: "Perception | Bitcoin & Crypto Media Intelligence Platform | 250+ Sources"
   - Homepage description should mention: 250+ sources, sentiment analysis, PR teams

4. Output:
   - Current state of each page
   - Gaps vs specifications
   - Specific copy recommendations
```

## Structured Data Audit

```
Audit structured data (JSON-LD) on perception.to:

1. Fetch homepage and look for <script type="application/ld+json">
2. Parse and validate any schemas found
3. Check for these required schemas:

   Organization Schema:
   - name, url, logo, description
   - founder information
   - social links (sameAs)

   SoftwareApplication Schema:
   - name, applicationCategory, operatingSystem
   - description with keywords
   - offers with pricing
   - featureList

   FAQPage Schema:
   - At least 5-8 question/answer pairs
   - Questions match user search intent

4. Output:
   - Schemas currently present
   - Schemas missing
   - Validation errors
   - Complete schema code to add
```

## Heading Hierarchy Audit

```
Audit heading structure on perception.to:

1. For each page, extract all headings (H1, H2, H3, H4, H5, H6)
2. Check:
   - Exactly one H1 per page
   - H1 contains primary keyword for that page
   - Logical hierarchy (no skipped levels)
   - H2s and H3s include secondary keywords
   - No empty or hidden headings

3. Target H1s:
   - Homepage: "Crypto Media Intelligence Platform"
   - Pricing: "Simple, Transparent Pricing"
   - Features: "Powerful Features for Crypto Intelligence"

4. Output:
   - Current heading structure per page
   - Issues found
   - Recommended heading structure
```

## Internal Linking Audit

```
Audit internal linking structure on perception.to:

1. Crawl the site and map all internal links
2. Check:
   - Orphan pages (no incoming links)
   - Pages with too few internal links
   - Broken internal links (404s)
   - Anchor text diversity and relevance

3. Key linking recommendations:
   - Homepage should link to: features, pricing, use-cases, comparisons
   - Feature pages should cross-link to related use-cases
   - Use-case pages should link to pricing and features
   - Comparison pages should link to features and pricing

4. Output:
   - Link map visualization
   - Orphan pages
   - Suggested new internal links
   - Anchor text recommendations
```

## Image Audit

```
Audit images on perception.to:

1. Find all <img> tags on the site
2. For each image, check:
   - Alt text present and descriptive
   - Image format (WebP preferred)
   - Lazy loading implemented
   - Explicit width/height for CLS

3. Check for:
   - Missing alt text
   - Keyword-stuffed alt text
   - Oversized images
   - Render-blocking images

4. Output:
   - Images missing alt text
   - Optimization opportunities
   - Specific alt text recommendations
```
