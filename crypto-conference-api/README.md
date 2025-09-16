# Crypto Conference API

A comprehensive calendar and API for cryptocurrency, blockchain, stablecoin, and tokenized finance conferences worldwide. Automatically updated weekly with data from 100+ sources.

## 🚀 Features

- **Weekly Updates**: Automated data refresh every Sunday via GitHub Actions
- **Free Hosting**: Deployed on GitHub Pages at zero cost
- **Rich Dashboard**: Interactive web interface with search, filtering, and export capabilities
- **API Access**: JSON endpoint for developers to integrate conference data
- **Export Options**: Download as CSV or iCal format for calendar apps
- **Categories**: Bitcoin, DeFi, Web3, Stablecoins, Tokenization conferences
- **Smart Search**: Search by event name, location, category, or description

## 📊 Live Demo & API

- **Dashboard**: https://fernikolic.github.io/crypto-conference-api
- **JSON API**: https://fernikolic.github.io/crypto-conference-api/data/events.json

## 🛠️ Tech Stack

- **Data Source**: Perplexity AI API for comprehensive event discovery
- **Automation**: GitHub Actions for weekly updates
- **Frontend**: Pure HTML/CSS/JavaScript (no framework dependencies)
- **Hosting**: GitHub Pages (free)
- **Backend**: Python script for data fetching

## 📁 Project Structure

```
crypto-conference-api/
├── .github/workflows/update-events.yml  # Weekly automation
├── scripts/fetch-events.py              # Perplexity fetcher
├── data/events.json                     # Events data file
├── index.html                           # Dashboard homepage
├── requirements.txt                     # Python dependencies
└── README.md                            # Documentation
```

## 🔧 Setup Instructions

### 1. Fork or Clone Repository

```bash
git clone https://github.com/fernikolic/crypto-conference-api.git
cd crypto-conference-api
```

### 2. Add Perplexity API Key

1. Go to repository **Settings** → **Secrets and variables** → **Actions**
2. Add new secret: `PERPLEXITY_API_KEY`
3. Get your API key from [Perplexity AI](https://www.perplexity.ai)

### 3. Enable GitHub Pages

1. Go to **Settings** → **Pages**
2. Source: **Deploy from a branch**
3. Branch: **main** → **/ (root)**
4. Save

### 4. Manual Update (Optional)

```bash
# Run locally with your API key
export PERPLEXITY_API_KEY=your-key-here
python scripts/fetch-events.py
```

Or trigger via GitHub Actions:
1. Go to **Actions** tab
2. Select **Update Crypto Events**
3. Click **Run workflow**

## 📅 Event Data Structure

```json
{
  "last_updated": "2025-01-01T00:00:00",
  "total_events": 50,
  "events": [
    {
      "name": "Bitcoin 2025",
      "start_date": "2025-05-15",
      "end_date": "2025-05-17",
      "location": "Miami, USA",
      "category": "Bitcoin",
      "price_range": "$199-$999",
      "registration_url": "https://...",
      "description": "The world's largest Bitcoin conference"
    }
  ],
  "categories": ["Bitcoin", "DeFi", "Web3"],
  "locations": ["Miami, USA", "Singapore"]
}
```

## 💰 Cost Breakdown

- **GitHub**: Free (unlimited public repos)
- **GitHub Pages**: Free hosting
- **GitHub Actions**: Free (2000 minutes/month)
- **Perplexity API**: ~$5-15/month (52 calls/year)
- **Total**: ~$5-15/month

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this project for your own needs.

## 🔮 Future Enhancements

- [ ] Email notifications for new events
- [ ] Advanced filtering by date range
- [ ] Event recommendation engine
- [ ] Speaker information integration
- [ ] Ticket price tracking
- [ ] Social media integration
- [ ] Mobile app

## 📧 Contact

For questions or suggestions, please open an issue on GitHub.

---

**Built with ❤️ for the crypto community**
