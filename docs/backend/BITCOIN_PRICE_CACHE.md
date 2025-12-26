# Bitcoin Price Caching System

## Overview

The Bitcoin Price Caching System is a robust backend infrastructure that provides real-time Bitcoin market data to all users while minimizing external API calls and avoiding rate limits. Instead of making individual API requests from each user's browser, the system uses Firebase Cloud Functions to fetch data once per minute and cache it in Firestore, which all users can then access.

## Why This Exists

**Problem:**
- Multiple users accessing Bitcoin price data simultaneously creates numerous API calls
- CryptoCompare API has rate limits (100,000 calls/month on free tier)
- With hundreds of users, we could quickly exceed limits
- Direct API calls from frontend are slower and less reliable

**Solution:**
- Single scheduled function fetches data every minute (1,440 calls/day, ~43,200/month)
- All users read from cached Firestore document (unlimited reads for authenticated users)
- Significant cost savings and improved performance
- Fallback to direct API if cache doesn't exist

## Architecture

```
┌─────────────────────┐
│  CryptoCompare API  │
└──────────┬──────────┘
           │
           │ (Every 1 minute)
           ▼
┌─────────────────────────────────┐
│  cacheBitcoinPrice (Scheduled)  │  ◄── Runs automatically every minute
│  Firebase Cloud Function        │
└──────────┬──────────────────────┘
           │
           │ Stores data
           ▼
┌─────────────────────────────────┐
│  Firestore: market_data/bitcoin │
│  {                              │
│    price: 121992.70,            │
│    marketCap: 2431496627451,    │
│    volume24h: 33739400749,      │
│    change24h: -2.49,            │
│    timestamp: 1759876157638,    │
│    lastUpdated: "2025-10-07..."│
│  }                              │
└──────────┬──────────────────────┘
           │
           │ Read by all users
           ▼
┌─────────────────────────────────┐
│  Frontend (React Hook)          │
│  useCurrentBitcoinPrice()       │
│  - Reads from Firestore cache   │
│  - Fallback to direct API       │
│  - Updates every 60 seconds     │
└─────────────────────────────────┘
```

## Components

### 1. Scheduled Cloud Function (`cacheBitcoinPrice`)

**File:** `/functions/src/bitcoin-price-cache.ts`

**Purpose:** Automatically fetches Bitcoin data from CryptoCompare API every minute and stores it in Firestore.

**Key Features:**
- Runs on schedule: `every 1 minutes`
- Timezone: UTC
- Fetches current price, market cap, volume, and 24h change
- Error handling with logging (doesn't throw to prevent function failure)

**Data Fetched:**
- Current BTC/USD price from `pricemultifull` endpoint
- 24-hour historical data from `histohour` endpoint
- Calculates 24h percentage change

**Deployment:**
```bash
firebase deploy --only functions:cacheBitcoinPrice
```

### 2. Manual HTTP Function (`updateBitcoinCache`)

**File:** `/functions/src/manual-bitcoin-cache.ts`

**Purpose:** Allows manual triggering of cache updates via HTTP request.

**URL:** https://updatebitcoincache-uycbgxxglq-uc.a.run.app

**Use Cases:**
- Testing the cache mechanism
- Force-updating cache on demand
- Debugging data issues

**Example Request:**
```bash
curl https://updatebitcoincache-uycbgxxglq-uc.a.run.app
```

**Response:**
```json
{
  "success": true,
  "message": "Bitcoin price cache updated successfully",
  "data": {
    "price": 121992.699064301,
    "marketCap": 2431496627451.222,
    "volume24h": 33739400749.007244,
    "change24h": -2.49,
    "timestamp": 1759876157638,
    "lastUpdated": "2025-10-07T22:29:17.638Z"
  }
}
```

**Deployment:**
```bash
firebase deploy --only functions:updateBitcoinCache

# Enable public access
gcloud functions add-invoker-policy-binding updateBitcoinCache \
  --region=us-central1 \
  --member=allUsers \
  --project=perception-app-3db34
```

### 3. Frontend Hook (`useCurrentBitcoinPrice`)

**File:** `/src/hooks/use-current-bitcoin-price.ts`

**Purpose:** React hook that provides Bitcoin data to components.

**Features:**
- Real-time Firestore listener using `onSnapshot`
- Automatic fallback to direct API if cache doesn't exist
- React Query for state management
- Auto-refetch every 60 seconds
- 60-second stale time

**Usage:**
```typescript
import { useCurrentBitcoinPrice } from '@/hooks/use-current-bitcoin-price';

function MyComponent() {
  const { data, isLoading, error } = useCurrentBitcoinPrice();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <div>
      <p>Price: ${data.price.toLocaleString()}</p>
      <p>Change: {data.change24h}%</p>
      <p>Market Cap: ${data.marketCap.toLocaleString()}</p>
      <p>Volume: ${data.volume24h.toLocaleString()}</p>
    </div>
  );
}
```

### 4. Firestore Collection

**Collection:** `market_data`
**Document ID:** `bitcoin`

**Data Structure:**
```typescript
interface BitcoinPriceData {
  price: number;          // Current BTC/USD price
  marketCap: number;      // Total market capitalization in USD
  volume24h: number;      // 24-hour trading volume in USD
  change24h: number;      // 24-hour percentage change
  timestamp: number;      // Unix timestamp (milliseconds)
  lastUpdated: string;    // ISO 8601 timestamp
}
```

**Security Rules:**
```
match /market_data/{dataId} {
  allow read: if request.auth != null;
  allow write: if false; // Only Firebase Functions can write (via Admin SDK)
}
```

## Data Flow

1. **Scheduled Update (Every Minute):**
   - `cacheBitcoinPrice` Cloud Function triggers
   - Fetches data from CryptoCompare API
   - Calculates 24h price change
   - Writes to Firestore `market_data/bitcoin`

2. **Frontend Access:**
   - User loads dashboard
   - `useCurrentBitcoinPrice()` hook initializes
   - Establishes Firestore listener on `market_data/bitcoin`
   - Receives real-time updates whenever cache is updated
   - Displays data in UI (compact market sentiment bar)

3. **Fallback Mechanism:**
   - If Firestore document doesn't exist
   - Hook automatically calls direct CryptoCompare API
   - Returns data to UI
   - Logs error for debugging

## API Rate Limits

### CryptoCompare Free Tier
- **Limit:** 100,000 calls/month
- **With Caching:** ~43,200 calls/month (1 call/minute)
- **Headroom:** 56,800 calls for other features
- **Cost:** $0 (free tier)

### Without Caching (Hypothetical)
- **100 concurrent users:** 6,000 calls/minute
- **Rate limit exceeded in:** ~16 minutes
- **Monthly calls:** ~259,200,000 (if allowed)
- **Cost:** Would require enterprise plan

## Monitoring & Debugging

### Check Function Logs

**Scheduled Function:**
```bash
firebase functions:log --only cacheBitcoinPrice
```

**Manual Function:**
```bash
GOOGLE_APPLICATION_CREDENTIALS=/path/to/key.json \
gcloud functions logs read updateBitcoinCache \
  --region=us-central1 \
  --limit=50 \
  --format="table(TIME_UTC,LOG)"
```

### Verify Cache Contents

**Using Firebase Console:**
1. Go to Firestore Database
2. Navigate to `market_data` collection
3. Click on `bitcoin` document
4. View current cached data

**Using Code:**
```typescript
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const bitcoinDoc = doc(db, 'market_data', 'bitcoin');
const snapshot = await getDoc(bitcoinDoc);
console.log(snapshot.data());
```

### Manual Cache Update

```bash
curl https://updatebitcoincache-uycbgxxglq-uc.a.run.app
```

## Troubleshooting

### Issue: Cache Not Updating

**Symptoms:**
- Data in Firestore is stale (>1 minute old)
- `lastUpdated` timestamp not changing

**Solutions:**
1. Check function logs for errors
2. Verify scheduler is enabled in GCP Console
3. Manually trigger cache update via HTTP function
4. Check CryptoCompare API status

**Commands:**
```bash
# Check if function is deployed
firebase functions:list | grep cacheBitcoinPrice

# Manually trigger update
curl https://updatebitcoincache-uycbgxxglq-uc.a.run.app
```

### Issue: Frontend Not Showing Data

**Symptoms:**
- Loading state persists
- Empty or undefined data

**Solutions:**
1. Check browser console for errors
2. Verify user is authenticated (required for Firestore read)
3. Check Firestore security rules
4. Test direct API fallback

**Debug:**
```typescript
// Add to useCurrentBitcoinPrice hook
console.log('Fetching Bitcoin data...');
console.log('Snapshot exists:', snapshot.exists());
console.log('Snapshot data:', snapshot.data());
```

### Issue: Rate Limit Exceeded

**Symptoms:**
- API returns 429 error
- "Rate limit exceeded" in logs

**Solutions:**
1. Verify scheduled function is running (not multiple instances)
2. Check for rogue direct API calls in code
3. Consider upgrading CryptoCompare plan if needed

## Deployment

### Initial Deployment

```bash
# Deploy both functions
firebase deploy --only functions:cacheBitcoinPrice,functions:updateBitcoinCache

# Enable public access for manual function
GOOGLE_APPLICATION_CREDENTIALS=/Users/fernandonikolic/perception/functions/bitcoin-data-chat-key.json \
gcloud functions add-invoker-policy-binding updateBitcoinCache \
  --region=us-central1 \
  --member=allUsers \
  --project=perception-app-3db34

# Deploy Firestore rules
firebase deploy --only firestore:rules
```

### Update Deployment

```bash
# Update functions only
firebase deploy --only functions:cacheBitcoinPrice,functions:updateBitcoinCache
```

## Files Reference

| File Path | Description |
|-----------|-------------|
| `/functions/src/bitcoin-price-cache.ts` | Scheduled function (every 1 minute) |
| `/functions/src/manual-bitcoin-cache.ts` | HTTP-triggered manual update function |
| `/functions/src/index.ts` | Exports both functions |
| `/src/hooks/use-current-bitcoin-price.ts` | Frontend React hook |
| `/src/lib/api/crypto-compare.ts` | CryptoCompare API client (fallback) |
| `/src/components/dashboard/pages/home.tsx` | UI component using the data |
| `/firestore.rules` | Security rules (lines 150-154) |

## Performance Metrics

- **Cache Update Frequency:** Every 60 seconds
- **API Response Time:** ~200-500ms (CryptoCompare)
- **Firestore Read Time:** ~50-100ms (much faster)
- **Total Users Supported:** Unlimited (Firestore scales automatically)
- **Cost per 1000 Users:** $0 (all using same cached document)

## Future Enhancements

1. **Multi-Asset Support:** Cache ETH, BNB, SOL, etc.
2. **Historical Data:** Store price history in Firestore
3. **Alerting:** Email/push notifications on price changes
4. **Analytics:** Track price trends and volatility
5. **Backup API:** Fallback to alternative APIs if CryptoCompare fails
6. **Compression:** Use Cloud Storage for historical data
7. **CDN:** Serve static snapshots via Cloud CDN

## Related Documentation

- [Backend Functions Overview](/docs/backend/functions/)
- [Data Pipeline Overview](/docs/backend/DATA_PIPELINE_OVERVIEW.md)
- [Cloud Function Optimization](/docs/backend/CLOUD-FUNCTION-OPTIMIZATION.md)
- [Firestore Security Rules](/firestore.rules)

## Support

For issues or questions:
1. Check this documentation
2. Review function logs
3. Test manual cache update
4. Contact: fernikolic@gmail.com
