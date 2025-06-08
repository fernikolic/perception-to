# Content Creator Quick Guide 📝

Simple steps to add new Learn articles and Glossary entries to perception.to

## 🚀 Quick Start

### 1. Start the Admin System
```bash
cd payload-v1
npm start
```
**→ Wait for**: `✅ Server listening on 0.0.0.0:3000`

### 2. Open Admin Panel
**→ Visit**: http://localhost:3000/admin  
**→ Login** with your credentials

---

## 📚 Adding a Learn Article

### Step-by-Step:
1. **Click** "Learn" in the sidebar
2. **Click** "Create New" button
3. **Fill out the form**:

| Field | Description | Required |
|-------|-------------|----------|
| **Title** | Article headline | ✅ |
| **Slug** | URL (auto-generated from title) | ✅ |
| **Excerpt** | Short description for article listings | ✅ |
| **Content** | Full article (rich text editor) | ✅ |
| **Category** | Topic category (optional) | ❌ |
| **Tags** | Keywords, comma-separated | ❌ |
| **Read Time** | Estimated minutes to read | ❌ |
| **Difficulty** | beginner / intermediate / advanced | ❌ |
| **Featured** | ☑️ to highlight on homepage | ❌ |
| **Published** | ☑️ to make live on site | ✅ |
| **Published At** | Publication date/time | ❌ |

4. **Click** "Save"
5. **Result**: Article appears on https://perception.to/learn within minutes

### 💡 Tips for Learn Articles:
- **Good Titles**: "How Bitcoin Narratives Shape Market Sentiment"
- **Clear Excerpts**: 1-2 sentences explaining what readers will learn
- **Use Headings**: Structure content with H2, H3 for readability
- **Add Tags**: "bitcoin", "sentiment", "analysis", "data"
- **Set Difficulty**: Help readers choose appropriate content

---

## 📖 Adding a Glossary Entry

### Step-by-Step:
1. **Click** "Glossary" in the sidebar
2. **Click** "Create New" button
3. **Fill out the form**:

| Field | Description | Required |
|-------|-------------|----------|
| **Title** | Term name (e.g., "HODL") | ✅ |
| **Slug** | URL (auto-generated from title) | ✅ |
| **Description** | Clear definition/explanation | ✅ |
| **Category** | bitcoin / stablecoins / regulation / macro | ❌ |
| **Published** | ☑️ to make live on site | ✅ |

4. **Click** "Save"
5. **Result**: Entry appears on https://perception.to/glossary within minutes

### 💡 Tips for Glossary Entries:
- **Clear Definitions**: Explain terms simply and concisely
- **Include Context**: How the term relates to Bitcoin/crypto
- **Choose Categories**: Help users filter by topic
- **Cross-Reference**: Mention related terms when relevant

---

## ✅ Publishing Checklist

### Before Publishing:
- [ ] **Title** is clear and compelling
- [ ] **Content** is well-structured with headings
- [ ] **Excerpt/Description** accurately summarizes content
- [ ] **Category** and **Tags** are set (if applicable)
- [ ] **Published** checkbox is checked ☑️
- [ ] **Proofread** for typos and clarity

### After Publishing:
- [ ] **Check live site** to confirm content appears
- [ ] **Test search** functionality with your content
- [ ] **Share** new content on social media/newsletters

---

## 🔄 Content Workflow

```
Create Content → Save in Admin → Auto-Sync to Database → Live on Website
     ↑                                                           ↓
Local Admin Panel                                        perception.to
(localhost:3000)                                      (live website)
```

---

## 🆘 Troubleshooting

### Content Not Appearing?
1. **Check Published**: Is the "Published" checkbox checked?
2. **Refresh**: Wait 2-3 minutes, then refresh the live site
3. **Check Admin**: Is content saved properly in admin panel?

### Admin Panel Not Loading?
1. **Check Server**: Is `npm start` running in payload-v1 folder?
2. **Check URL**: Using http://localhost:3000/admin (not https)?
3. **Check Logs**: Any errors in the terminal?

### Need Help?
- **Check Logs**: Look at terminal output for error messages
- **Test Locally**: Visit http://localhost:3000/api/learn or /api/glossary
- **Restart Server**: Stop and restart `npm start` in payload-v1

---

## 📋 Content Standards

### Learn Articles Should:
- **Educate** readers on Bitcoin narratives, sentiment, or analysis
- **Include Examples** and real-world applications
- **Be Actionable** - readers should learn something useful
- **Cite Sources** when making claims or referencing data

### Glossary Entries Should:
- **Define Terms** clearly and concisely
- **Provide Context** within the Bitcoin ecosystem
- **Be Accurate** and up-to-date
- **Use Simple Language** accessible to beginners

---

**Happy content creating!** 🚀  
Your content powers the Bitcoin perception intelligence platform. 