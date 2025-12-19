# SEO Documentation

This folder contains all SEO-related documentation, reports, and implementation guides.

## Structure

```
docs/seo/
├── README.md              # This file
├── reports/               # Analysis reports and audits
│   ├── gsc-analysis.md    # Google Search Console findings
│   └── keyword-research.md # Keyword opportunities
├── changelog/             # Task tracking and updates
│   └── 2024-12.md         # December 2024 changelog
└── fixes/                 # Implementation guides
    ├── ssr-meta-tags.md   # Meta tag SSR implementation
    └── structured-data.md # Schema markup implementation
```

## Quick Links

- [GSC Analysis Report](./reports/gsc-analysis.md)
- [Keyword Research](./reports/keyword-research.md)
- [December 2024 Changelog](./changelog/2024-12.md)

## Key Issues (as of Dec 2024)

1. **SSR/Prerendering** - Meta tags and headings not server-rendered
2. **Structured Data** - No JSON-LD schemas on pages
3. **Page Rankings** - Key pages ranking position 27-68 instead of top 10

## Related Files

- SEO configs: `/perception-cmo/seo/`
- SEO components: `/src/components/seo/`
- GSC script: `/perception-cmo/seo/scripts/gsc-keyword-analysis.js`
