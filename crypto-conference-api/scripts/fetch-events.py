#!/usr/bin/env python3
"""
Weekly Crypto Events Fetcher
Runs once per week via GitHub Actions
"""

import os
import json
import requests
import re
from datetime import datetime
from typing import List, Dict

class PerplexityEventsFetcher:
    def __init__(self, api_key: str):
        self.api_key = api_key
        self.base_url = "https://api.perplexity.ai/chat/completions"

    def fetch_crypto_events(self) -> List[Dict]:
        """Fetch all crypto events for the next 12 months"""

        query = """
        I need a comprehensive list of ALL cryptocurrency, blockchain, Bitcoin, stablecoin, and tokenized finance conferences and events scheduled from October 2024 through December 2025. IMPORTANT: Only include events that have NOT yet occurred as of September 2024. Please search extensively across:

        MAJOR CONFERENCES:
        - Bitcoin 2025, Consensus, TOKEN2049 (all locations), Devcon, EthCC, Solana Breakpoint
        - Korea Blockchain Week, European Blockchain Convention, Bitcoin Amsterdam
        - Money 20/20, Paris Blockchain Week, Web Summit crypto tracks
        - Permissionless, ETHGlobal events, Chainlink SmartCon
        - StableSummit, DeFi Summit, NFT NYC, MetaFest

        REGIONAL EVENTS:
        - Asia: Singapore Fintech Festival crypto track, Hong Kong FinTech Week, Japan Blockchain
        - Europe: Berlin Blockchain Week, London Blockchain Conference, Blockchain Expo Europe
        - Americas: Miami Tech Week crypto events, Austin Blockchain Summit, Canadian Blockchain
        - Middle East/Africa: AIBC Dubai, Blockchain Africa Conference

        SPECIALIZED EVENTS:
        - DeFi conferences, NFT events, GameFi summits, Web3 gaming conferences
        - Central Bank Digital Currency (CBDC) summits, stablecoin conferences
        - Enterprise blockchain events, crypto regulation conferences
        - Crypto trading and investment conferences, mining summits

        For each event, provide: exact name, start date (YYYY-MM-DD), end date, city/country location, category (Bitcoin/DeFi/Web3/Stablecoin/Enterprise/etc), estimated ticket price range, official registration URL, and brief description.

        Search comprehensively - I need 50+ events minimum covering the full spectrum of crypto/blockchain conferences globally.
        """

        payload = {
            "model": "sonar",
            "messages": [
                {
                    "role": "system",
                    "content": """You are a crypto events researcher. Return ONLY a valid JSON array with this structure:
                    [
                      {
                        "name": "Event Name",
                        "start_date": "YYYY-MM-DD",
                        "end_date": "YYYY-MM-DD",
                        "location": "City, Country",
                        "category": "Conference Type",
                        "price_range": "$X-$Y or Free",
                        "registration_url": "https://...",
                        "description": "Brief description"
                      }
                    ]
                    Return only valid JSON. No explanatory text."""
                },
                {
                    "role": "user",
                    "content": query
                }
            ],
            "max_tokens": 4000,
            "temperature": 0.1
        }

        try:
            print(f"📡 Calling Perplexity API...")
            print(f"   Model: {payload['model']}")

            response = requests.post(
                self.base_url,
                json=payload,
                headers={
                    "Authorization": f"Bearer {self.api_key}",
                    "Content-Type": "application/json"
                },
                timeout=30
            )

            print(f"   Response status: {response.status_code}")
            if response.status_code != 200:
                print(f"   Response text: {response.text[:500]}")

            response.raise_for_status()

            result = response.json()
            content = result['choices'][0]['message']['content']

            # Extract JSON from response
            events = self.parse_events_response(content)

            # Validate and clean events
            valid_events = []
            for event in events:
                if self.validate_event(event):
                    valid_events.append(event)

            print(f"✅ Found {len(valid_events)} valid events")
            return valid_events

        except Exception as e:
            print(f"❌ Error fetching events: {e}")
            # Return existing data if API fails
            if os.path.exists('data/events.json'):
                with open('data/events.json', 'r') as f:
                    existing_data = json.load(f)
                    print("⚠️ Using existing data due to API error")
                    return existing_data.get('events', [])
            return []

    def parse_events_response(self, content: str) -> List[Dict]:
        """Extract JSON from Perplexity response"""
        try:
            # Find JSON array
            json_match = re.search(r'\[.*\]', content, re.DOTALL)
            if json_match:
                return json.loads(json_match.group(0))

            # Try parsing entire content
            if content.strip().startswith('['):
                return json.loads(content)

            return []
        except:
            return []

    def validate_event(self, event: Dict) -> bool:
        """Basic validation and date checking"""
        required = ['name', 'start_date', 'location']
        if not all(event.get(field) for field in required):
            return False

        # Check if event date is in the future (from September 2024 onwards)
        try:
            event_date = datetime.strptime(event['start_date'], '%Y-%m-%d')
            cutoff_date = datetime(2024, 9, 1)  # September 1, 2024
            if event_date < cutoff_date:
                print(f"⏭️ Skipping past event: {event['name']} ({event['start_date']})")
                return False

            # Also skip events too far in the future (after Dec 2025)
            max_date = datetime(2025, 12, 31)
            if event_date > max_date:
                print(f"⏭️ Skipping distant future event: {event['name']} ({event['start_date']})")
                return False

        except Exception as e:
            print(f"⚠️ Invalid date format for {event.get('name', 'Unknown')}: {event.get('start_date', 'N/A')}")
            return False

        return True

def main():
    """Main execution"""
    print("🚀 Starting weekly crypto events update...")

    # Get API key from environment
    api_key = os.environ.get('PERPLEXITY_API_KEY')
    if not api_key:
        print("❌ PERPLEXITY_API_KEY environment variable not found")
        print("📝 Using sample data for demonstration...")

        # Sample data for demonstration
        sample_events = [
            {
                "name": "Bitcoin 2025",
                "start_date": "2025-05-15",
                "end_date": "2025-05-17",
                "location": "Miami, USA",
                "category": "Bitcoin",
                "price_range": "$199-$999",
                "registration_url": "https://b.tc/conference",
                "description": "The world's largest Bitcoin conference"
            },
            {
                "name": "TOKEN2049 Singapore",
                "start_date": "2025-09-18",
                "end_date": "2025-09-19",
                "location": "Singapore",
                "category": "Web3",
                "price_range": "$599-$1999",
                "registration_url": "https://token2049.com",
                "description": "Premier crypto event in Asia"
            },
            {
                "name": "Consensus 2025",
                "start_date": "2025-06-09",
                "end_date": "2025-06-11",
                "location": "Austin, USA",
                "category": "Blockchain",
                "price_range": "$799-$2499",
                "registration_url": "https://consensus.coindesk.com",
                "description": "The most influential blockchain and crypto event"
            }
        ]

        data = {
            "last_updated": datetime.now().isoformat(),
            "total_events": len(sample_events),
            "events": sample_events,
            "categories": ["Bitcoin", "Web3", "Blockchain"],
            "locations": ["Miami, USA", "Singapore", "Austin, USA"],
            "update_source": "sample_data"
        }

        os.makedirs('data', exist_ok=True)
        with open('data/events.json', 'w') as f:
            json.dump(data, f, indent=2)

        print(f"✅ Saved {len(sample_events)} sample events to data/events.json")
        return

    # Fetch events
    fetcher = PerplexityEventsFetcher(api_key)
    events = fetcher.fetch_crypto_events()

    if not events:
        print("⚠️ No events found, keeping existing data")
        return

    # Prepare data with metadata
    data = {
        "last_updated": datetime.now().isoformat(),
        "total_events": len(events),
        "events": sorted(events, key=lambda x: x['start_date']),
        "categories": list(set(e.get('category', 'Conference') for e in events)),
        "locations": list(set(e.get('location', '') for e in events)),
        "update_source": "perplexity_api_weekly"
    }

    # Save to data file
    os.makedirs('data', exist_ok=True)
    with open('data/events.json', 'w') as f:
        json.dump(data, f, indent=2)

    print(f"✅ Saved {len(events)} events to data/events.json")
    print(f"📊 Categories: {len(data['categories'])}")
    print(f"🌍 Locations: {len(data['locations'])}")

if __name__ == '__main__':
    main()