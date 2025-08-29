import type { Take } from './types';

export const MOCK_TAKES: Take[] = [
  {
    id: '1',
    outlet: 'New York Times',
    description: 'Nobel laureate economist Paul Krugman predicted Bitcoin\'s demise in his New York Times column.',
    date: '2013-12-15',
    votes: 2481,
    url: 'https://www.nytimes.com',
    slug: 'krugman-bitcoin-zero-2018',
    headline: "Bitcoin's value will be zero and will disappear by 2018.",
    contentType: 'image',
    category: 'Price Prediction',
    bitcoinPrice: 870
  },
  {
    id: '2',
    outlet: 'CNBC',
    description: 'JPMorgan CEO Jamie Dimon made this statement at the Delivering Alpha conference.',
    date: '2017-09-12',
    votes: 1923,
    url: 'https://www.cnbc.com',
    slug: 'dimon-bitcoin-fraud-blow-up',
    headline: "Bitcoin is a fraud that will eventually blow up.",
    contentType: 'image',
    category: 'Price Prediction',
    bitcoinPrice: 4148
  },
  {
    id: '3',
    outlet: 'Twitter',
    description: 'Gold bug Peter Schiff made yet another Bitcoin price prediction.',
    date: '2023-01-01',
    votes: 1756,
    url: 'https://twitter.com',
    slug: 'schiff-bitcoin-1000-2023',
    headline: "Bitcoin is going to collapse to $1,000 by the end of 2023.",
    contentType: 'image',
    category: 'Price Prediction',
    bitcoinPrice: 16500
  },
  {
    id: '4',
    outlet: 'New York Times',
    description: 'Microsoft co-founder Bill Gates criticized Bitcoin\'s energy consumption.',
    date: '2021-03-09',
    votes: 1544,
    url: 'https://www.nytimes.com',
    slug: 'gates-bitcoin-electricity-consumption',
    headline: "Bitcoin uses more electricity per transaction than any other method known to mankind.",
    contentType: 'image',
    category: 'Energy FUD',
    bitcoinPrice: 54824
  }
];