import satori from 'satori';
import { Resvg, initWasm } from '@resvg/resvg-wasm';
// @ts-ignore
import resvgWasm from '@resvg/resvg-wasm/index_bg.wasm';

interface Env {
  API_BASE: string;
}

interface TwitterAccount {
  handle: string;
  sentimentScore: number;
  totalMentions: number;
}

let wasmInitialized = false;

async function initResvg() {
  if (!wasmInitialized) {
    await initWasm(resvgWasm);
    wasmInitialized = true;
  }
}

async function fetchSentimentData(apiBase: string): Promise<{ bulls: TwitterAccount[]; bears: TwitterAccount[] }> {
  const endDate = new Date().toISOString().slice(0, 10);
  const startDate = new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

  const fetchPromises = [];
  for (let page = 1; page <= 10; page++) {
    const params = new URLSearchParams({
      userId: 'perception',
      startDate,
      endDate,
      page: page.toString(),
      pageSize: '100'
    });
    fetchPromises.push(
      fetch(`${apiBase}/feed?${params}`).then(r => r.json())
    );
  }

  const results = await Promise.all(fetchPromises);
  let allData: any[] = [];
  results.forEach((result: any) => {
    if (result.data?.length > 0) {
      allData = [...allData, ...result.data];
    }
  });

  // Process Twitter data
  const twitterData = new Map<string, {
    totalMentions: number;
    positiveMentions: number;
    negativeMentions: number;
    realHandle: string;
  }>();

  allData.forEach((item: any) => {
    if (item.Outlet === 'X' || item.Outlet === 'Twitter') {
      let handle = '';
      if (item.URL && (item.URL.includes('twitter.com/') || item.URL.includes('x.com/'))) {
        const urlParts = item.URL.split('/');
        const handleIndex = urlParts.findIndex((part: string) => part === 'twitter.com' || part === 'x.com') + 1;
        if (urlParts[handleIndex] && !urlParts[handleIndex].includes('status')) {
          handle = urlParts[handleIndex].split('?')[0];
        }
      }
      if (!handle) return;

      const key = handle.toLowerCase();
      const existing = twitterData.get(key) || {
        totalMentions: 0,
        positiveMentions: 0,
        negativeMentions: 0,
        realHandle: handle,
      };

      existing.totalMentions += 1;
      if (item.Sentiment === 'Positive') existing.positiveMentions += 1;
      else if (item.Sentiment === 'Negative') existing.negativeMentions += 1;

      twitterData.set(key, existing);
    }
  });

  // Calculate scores and sort
  const allAccounts = Array.from(twitterData.values())
    .filter(a => a.totalMentions >= 3)
    .map(a => {
      const positiveRatio = a.positiveMentions / a.totalMentions;
      const negativeRatio = a.negativeMentions / a.totalMentions;
      return {
        handle: a.realHandle,
        sentimentScore: positiveRatio * 100,
        negativeSentimentScore: negativeRatio * 100,
        totalMentions: a.totalMentions,
        positiveMentions: a.positiveMentions,
        negativeMentions: a.negativeMentions,
        weightedScore: Math.floor(a.totalMentions / 10) * 1000 + positiveRatio * 100,
        negativeWeightedScore: Math.floor(a.totalMentions / 10) * 1000 + negativeRatio * 100,
      };
    });

  // Bulls: accounts where positive > negative, sorted by weighted positive score
  const bulls = [...allAccounts]
    .filter(a => a.positiveMentions > a.negativeMentions)
    .sort((a, b) => b.weightedScore - a.weightedScore)
    .slice(0, 3)
    .map(a => ({ handle: a.handle, sentimentScore: a.sentimentScore, totalMentions: a.totalMentions }));

  // Bears: accounts where negative > positive, sorted by weighted negative score
  const bears = [...allAccounts]
    .filter(a => a.negativeMentions > a.positiveMentions)
    .sort((a, b) => b.negativeWeightedScore - a.negativeWeightedScore)
    .slice(0, 3)
    .map(a => ({ handle: a.handle, sentimentScore: a.negativeSentimentScore, totalMentions: a.totalMentions }));

  return { bulls, bears };
}

function generateOgImage(bulls: TwitterAccount[], bears: TwitterAccount[], dateStr: string) {
  const cream = '#F0EEE6';
  const black = '#000000';
  const green = '#22c55e';
  const red = '#ef4444';

  return {
    type: 'div',
    props: {
      style: {
        display: 'flex',
        flexDirection: 'column',
        width: 1200,
        height: 630,
        backgroundColor: cream,
        padding: 40,
      },
      children: [
        // Header
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginBottom: 24,
            },
            children: [
              // Live badge
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    marginBottom: 12,
                  },
                  children: [
                    { type: 'div', props: { style: { display: 'flex', width: 10, height: 10, borderRadius: 5, backgroundColor: green } } },
                    { type: 'div', props: { style: { display: 'flex', fontSize: 16, fontWeight: 600, color: 'rgba(0,0,0,0.5)' }, children: 'Live' } },
                    { type: 'div', props: { style: { display: 'flex', fontSize: 16, color: 'rgba(0,0,0,0.3)' }, children: '•' } },
                    { type: 'div', props: { style: { display: 'flex', fontSize: 16, color: 'rgba(0,0,0,0.5)' }, children: 'Last 24 Hours' } },
                  ],
                },
              },
              // Main title
              {
                type: 'div',
                props: {
                  style: { display: 'flex', fontSize: 44, fontWeight: 700, color: black, marginBottom: 8 },
                  children: "Who's bullish? Who's bearish?",
                },
              },
              // Subtitle
              {
                type: 'div',
                props: {
                  style: { display: 'flex', fontSize: 18, color: 'rgba(0,0,0,0.5)' },
                  children: "Real-time sentiment ranking of Bitcoin's most influential voices.",
                },
              },
            ],
          },
        },
        // Main content
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              flex: 1,
              gap: 24,
            },
            children: [
              // Bulls column
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    backgroundColor: black,
                    borderRadius: 20,
                    padding: 28,
                  },
                  children: [
                    // Header
                    {
                      type: 'div',
                      props: {
                        style: {
                          display: 'flex',
                          alignItems: 'center',
                          gap: 10,
                          marginBottom: 20,
                        },
                        children: [
                          { type: 'div', props: { style: { display: 'flex', width: 12, height: 12, borderRadius: 6, backgroundColor: green } } },
                          { type: 'div', props: { style: { display: 'flex', color: green, fontSize: 20, fontWeight: 700, letterSpacing: 1 }, children: 'MOST BULLISH' } },
                        ],
                      },
                    },
                    // Entries
                    ...bulls.map((account, i) => ({
                      type: 'div',
                      props: {
                        style: {
                          display: 'flex',
                          alignItems: 'center',
                          backgroundColor: cream,
                          borderRadius: 14,
                          padding: '14px 18px',
                          marginBottom: i < 2 ? 10 : 0,
                          gap: 14,
                        },
                        children: [
                          {
                            type: 'div',
                            props: {
                              style: {
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 36,
                                height: 36,
                                borderRadius: 18,
                                backgroundColor: green,
                                color: 'white',
                                fontSize: 18,
                                fontWeight: 700,
                              },
                              children: String(i + 1),
                            },
                          },
                          {
                            type: 'div',
                            props: {
                              style: { display: 'flex', flexDirection: 'column', flex: 1 },
                              children: [
                                { type: 'div', props: { style: { display: 'flex', color: black, fontSize: 20, fontWeight: 600 }, children: `@${account.handle}` } },
                                {
                                  type: 'div',
                                  props: {
                                    style: { display: 'flex', gap: 8, marginTop: 2 },
                                    children: [
                                      { type: 'span', props: { style: { display: 'flex', color: green, fontSize: 14, fontWeight: 600 }, children: `${Math.round(account.sentimentScore)}%` } },
                                      { type: 'span', props: { style: { display: 'flex', color: 'rgba(0,0,0,0.4)', fontSize: 14 }, children: `${account.totalMentions} posts` } },
                                    ],
                                  },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    })),
                  ],
                },
              },
              // Bears column
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    backgroundColor: black,
                    borderRadius: 20,
                    padding: 28,
                  },
                  children: [
                    // Header
                    {
                      type: 'div',
                      props: {
                        style: {
                          display: 'flex',
                          alignItems: 'center',
                          gap: 10,
                          marginBottom: 20,
                        },
                        children: [
                          { type: 'div', props: { style: { display: 'flex', width: 12, height: 12, borderRadius: 6, backgroundColor: red } } },
                          { type: 'div', props: { style: { display: 'flex', color: red, fontSize: 20, fontWeight: 700, letterSpacing: 1 }, children: 'MOST BEARISH' } },
                        ],
                      },
                    },
                    // Entries
                    ...bears.map((account, i) => ({
                      type: 'div',
                      props: {
                        style: {
                          display: 'flex',
                          alignItems: 'center',
                          backgroundColor: cream,
                          borderRadius: 14,
                          padding: '14px 18px',
                          marginBottom: i < 2 ? 10 : 0,
                          gap: 14,
                        },
                        children: [
                          {
                            type: 'div',
                            props: {
                              style: {
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 36,
                                height: 36,
                                borderRadius: 18,
                                backgroundColor: red,
                                color: 'white',
                                fontSize: 18,
                                fontWeight: 700,
                              },
                              children: String(i + 1),
                            },
                          },
                          {
                            type: 'div',
                            props: {
                              style: { display: 'flex', flexDirection: 'column', flex: 1 },
                              children: [
                                { type: 'div', props: { style: { display: 'flex', color: black, fontSize: 20, fontWeight: 600 }, children: `@${account.handle}` } },
                                {
                                  type: 'div',
                                  props: {
                                    style: { display: 'flex', gap: 8, marginTop: 2 },
                                    children: [
                                      { type: 'span', props: { style: { display: 'flex', color: red, fontSize: 14, fontWeight: 600 }, children: `${Math.round(account.sentimentScore)}%` } },
                                      { type: 'span', props: { style: { display: 'flex', color: 'rgba(0,0,0,0.4)', fontSize: 14 }, children: `${account.totalMentions} posts` } },
                                    ],
                                  },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    })),
                  ],
                },
              },
            ],
          },
        },
        // Footer
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              justifyContent: 'center',
              marginTop: 20,
            },
            children: {
              type: 'div',
              props: {
                style: { display: 'flex', color: 'rgba(0,0,0,0.35)', fontSize: 15 },
                children: 'perception.to/bitcoin-social-media-sentiment-leaderboard',
              },
            },
          },
        },
      ],
    },
  };
}

// Generate logo element using the actual hosted image
function generatePerceptionLogo(size: number = 40) {
  return {
    type: 'img',
    props: {
      src: 'https://perception.to/logos/perception-logo-dark.png',
      width: size,
      height: size,
      style: {
        width: size,
        height: size,
      },
    },
  };
}

// Generic page OG image (title + description)
function generateGenericOgImage(title: string, description: string) {
  const cream = '#F0EEE6';
  const black = '#000000';

  return {
    type: 'div',
    props: {
      style: {
        display: 'flex',
        flexDirection: 'column',
        width: 1200,
        height: 630,
        backgroundColor: black,
        padding: 60,
      },
      children: [
        // Top bar with branding
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              justifyContent: 'flex-end',
              marginBottom: 40,
            },
            children: {
              type: 'div',
              props: {
                style: {
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                },
                children: [
                  // Perception P logo (CSS recreation)
                  generatePerceptionLogo(36),
                  // Perception text
                  { type: 'div', props: { style: { display: 'flex', color: cream, fontSize: 22, fontWeight: 500 }, children: 'perception.to' } },
                ],
              },
            },
          },
        },
        // Main content
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              justifyContent: 'center',
            },
            children: [
              // Title
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    fontSize: 72,
                    fontWeight: 900,
                    color: cream,
                    lineHeight: 1.1,
                    marginBottom: 28,
                  },
                  children: title,
                },
              },
              // Description
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    fontSize: 32,
                    fontWeight: 600,
                    color: 'rgba(240,238,230,0.6)',
                    lineHeight: 1.4,
                  },
                  children: description,
                },
              },
            ],
          },
        },
      ],
    },
  };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // Handle CORS
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Max-Age': '86400',
        },
      });
    }

    try {
      await initResvg();

      // Check for title/description params (generic page OG)
      const title = url.searchParams.get('title');
      const description = url.searchParams.get('description');

      let imageData: any;

      if (title) {
        // Generic page OG image
        imageData = generateGenericOgImage(
          title,
          description || 'Track Bitcoin trends. Decode market sentiment. Uncover narratives.'
        );
      } else {
        // Default: Leaderboard OG image
        const { bulls, bears } = await fetchSentimentData(env.API_BASE);

        if (bulls.length < 3 || bears.length < 3) {
          return new Response('Not enough data', { status: 500 });
        }

        const dateStr = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        imageData = generateOgImage(bulls, bears, dateStr);
      }

      // Generate SVG using Satori
      const svg = await satori(
        imageData as any,
        {
          width: 1200,
          height: 630,
          fonts: [
            {
              name: 'Inter',
              data: await fetch('https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYAZ9hjp-Ek-_EeA.woff').then(r => r.arrayBuffer()),
              weight: 400,
              style: 'normal',
            },
            {
              name: 'Inter',
              data: await fetch('https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fAZ9hjp-Ek-_EeA.woff').then(r => r.arrayBuffer()),
              weight: 700,
              style: 'normal',
            },
            {
              name: 'Inter',
              data: await fetch('https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuBWYAZ9hjp-Ek-_EeA.woff').then(r => r.arrayBuffer()),
              weight: 900,
              style: 'normal',
            },
          ],
        }
      );

      // Convert SVG to PNG
      const resvg = new Resvg(svg, {
        fitTo: { mode: 'width', value: 1200 },
      });
      const pngData = resvg.render();
      const pngBuffer = pngData.asPng();

      return new Response(pngBuffer, {
        headers: {
          'Content-Type': 'image/png',
          'Cache-Control': 'public, max-age=300, s-maxage=300',
          'Access-Control-Allow-Origin': '*',
        },
      });
    } catch (error) {
      console.error('Error generating image:', error);
      return new Response(`Error: ${error}`, { status: 500 });
    }
  },
};
