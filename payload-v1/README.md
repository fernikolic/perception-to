# Payload CMS v1 - Programmatic SEO Platform

A self-hosted Payload CMS setup for managing glossary content for programmatic SEO on perception.to.

## 🚀 Features

- **Glossary Management**: Create and manage Bitcoin/crypto glossary entries
- **Public API**: GET access to `/api/glossary` for frontend consumption
- **Admin Panel**: Protected admin interface at `/admin`
- **MongoDB Atlas**: Cloud database integration
- **Auto-slug Generation**: Automatic URL-friendly slugs from titles
- **Access Control**: Public read, authenticated write operations

## 📋 Requirements

- Node.js 18+
- MongoDB Atlas account
- Environment variables configured

## 🛠 Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Configuration**
   The `.env` file should contain:
   ```
   MONGODB_URI=mongodb+srv://fernikolic:3IPN6DQAOj9XVIHg@cluster0.1gtyyut.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
   PAYLOAD_SECRET=3aef0141d27e0d436dcb0134a441b021f124bbe1063e0f3b43933d563b8ad911
   PORT=3000
   ```

3. **Start the Server**
   ```bash
   npm run dev
   ```

4. **Access Points**
   - Admin Panel: http://localhost:3000/admin
   - API Endpoint: http://localhost:3000/api/glossary

## 📊 Glossary Collection Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | Text | Yes | Entry title |
| `slug` | Text | Yes | Auto-generated URL slug |
| `description` | Textarea | Yes | Entry description |
| `category` | Select | No | Bitcoin/Stablecoins/Regulation/Macro |
| `published` | Checkbox | No | Default: true |
| `updatedAt` | Date | No | Auto-updated timestamp |

## 🔐 Access Control

- **GET `/api/glossary`**: Public access ✅
- **POST/PUT/DELETE**: Requires admin authentication ❌

## 🧪 API Testing

### Get All Entries
```bash
curl http://localhost:3000/api/glossary
```

### Create Entry (requires auth)
```bash
curl -X POST http://localhost:3000/api/glossary \
  -H "Content-Type: application/json" \
  -d '{"title": "Bitcoin", "description": "A decentralized digital currency", "category": "bitcoin"}'
```

## 🎯 Next Steps

1. Create your first admin user via the admin panel
2. Add glossary entries through the admin interface
3. Test the public API endpoints
4. Deploy to Google Cloud Run (future)
5. Connect frontend to Cloudflare Pages (future)

## 📝 Notes

- Server compiles admin panel on first start (may take 1-2 minutes)
- Deprecation warnings in console are normal for Payload v1
- MongoDB connection is established automatically on startup 