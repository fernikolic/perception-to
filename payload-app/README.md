# Payload CMS v2 - Bitcoin Perception SEO Platform

## 🚀 Current Setup Status

✅ **Project Structure Created**
- Payload CMS v2.30.0 installed
- TypeScript configuration
- MongoDB Atlas connection string configured
- Glossary collection defined
- Users collection for authentication

✅ **Environment Variables**
```
MONGODB_URI="mongodb+srv://fernikolic:3IPN6DQAOj9XVIHg@cluster0.1gtyyut.mongodb.net/payload-cms?retryWrites=true&w=majority"
PAYLOAD_SECRET="f2efe9dea9e1226bc83068fdfc51662bfa2c72ebc39c0d3d75b456f90e66f82d"
SERVER_URL="http://localhost:3000"
PORT=3000
```

## 🔧 Current Issue

The TypeScript configuration is having compatibility issues with Payload v2. The database connection syntax in the types doesn't match the runtime API.

## 🎯 Next Steps

1. **Fix TypeScript Configuration**: Update the payload config to use the correct v2 syntax
2. **Test Local Development**: Get `npm run dev` working
3. **Create Admin User**: Access `/admin` and set up first user
4. **Test Glossary Collection**: Verify the collection works
5. **Deploy to Cloud Run**: Use the provided Dockerfile

## 📝 Collections

### Glossary Collection
- **title**: Main term title
- **slug**: URL-friendly identifier  
- **intro**: Brief introduction
- **content**: Rich text content
- **difficulty**: Beginner/Intermediate/Advanced
- **keywords**: Array of SEO keywords
- **relatedTerms**: Relationships to other glossary entries

## 🚀 Deployment Commands

```bash
# Build and deploy to Google Cloud Run
gcloud builds submit --tag gcr.io/perception-website-458107/payload-seo

gcloud run deploy payload-seo \
  --image gcr.io/perception-website-458107/payload-seo \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars MONGODB_URI="mongodb+srv://fernikolic:3IPN6DQAOj9XVIHg@cluster0.1gtyyut.mongodb.net/payload-cms?retryWrites=true&w=majority",PAYLOAD_SECRET="f2efe9dea9e1226bc83068fdfc51662bfa2c72ebc39c0d3d75b456f90e66f82d"
```

The foundation is solid - we just need to resolve the TypeScript configuration issue to get the development server running. 