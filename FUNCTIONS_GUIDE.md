# Adding Firebase Cloud Functions

Guide for adding serverless backend functions to your Hugo site.

## Why Use Cloud Functions?

Add server-side logic without managing servers:
- Custom APIs
- Database operations
- AI/chatbot integrations
- Payment processing
- Email automation beyond Formspree

## Prerequisites

1. Enable Firebase Blaze Plan (pay-as-you-go)
   - Requires credit card
   - Still FREE for most usage (2M calls/month)
   - Only charged if you exceed free tier

## Setup Steps

### 1. Enable Blaze Plan

1. Go to [Firebase Console](https://console.firebase.google.com/project/nubestack/usage/details)
2. Click "Upgrade to Blaze"
3. Add credit card (won't be charged in free tier)
4. Set budget alerts: $5/month (optional but recommended)

### 2. Deploy Existing Function

We already created a contact form function. To deploy it:

```bash
# Deploy function
firebase deploy --only functions

# Or deploy everything
firebase deploy
```

### 3. Update Contact Form

Replace Formspree with your function:

Edit `themes/hugo-arcana/layouts/_default/contact.html`:
```html
<!-- Change from Formspree -->
<form action="https://formspree.io/f/xovpzrbj" method="POST">

<!-- To your function -->
<form action="/api/contact" method="POST">
```

Then rebuild and deploy:
```bash
hugo --minify
firebase deploy
```

## Free Tier Limits

**Cloud Functions (Free):**
- 2M invocations/month
- 400,000 GB-seconds compute
- 200,000 GHz-seconds compute
- 5GB network egress/month

**Typical usage (contact form):**
- ~100 submissions/month = 100 invocations
- Well under free tier limits

## Create New Functions

### Example: Simple API

Create `functions/main.py`:
```python
import functions_framework

@functions_framework.http
def hello_world(request):
    return {'message': 'Hello from Firebase!'}
```

### Example: Database Operation

```python
from google.cloud import firestore
import functions_framework

@functions_framework.http
def save_data(request):
    db = firestore.Client()
    data = request.get_json()
    db.collection('items').add(data)
    return {'success': True}
```

### Deploy

```bash
firebase deploy --only functions
```

### Use in Hugo

Add JavaScript to call your function:
```html
<script>
fetch('/api/hello_world')
  .then(r => r.json())
  .then(data => console.log(data.message));
</script>
```

## Add Functions to firebase.json

Edit `firebase.json`:
```json
{
  "hosting": {
    "public": "public",
    "rewrites": [
      {
        "source": "/api/hello",
        "function": "hello_world"
      },
      {
        "source": "/api/save",
        "function": "save_data"
      }
    ]
  },
  "functions": [
    {
      "source": "functions",
      "codebase": "default",
      "runtime": "python311"
    }
  ]
}
```

## Environment Variables

Set secrets for your functions:

```bash
# Set config
firebase functions:config:set api.key="your_api_key"

# View config
firebase functions:config:get

# In code
import os
api_key = os.environ.get('API_KEY')
```

## Common Use Cases

### 1. ChatGPT Integration

```python
import openai
import functions_framework

@functions_framework.http
def chatbot(request):
    openai.api_key = os.environ.get('OPENAI_KEY')
    message = request.get_json()['message']
    
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": message}]
    )
    
    return {'reply': response.choices[0].message.content}
```

### 2. Database Query

```python
from google.cloud import firestore

@functions_framework.http
def get_posts(request):
    db = firestore.Client()
    posts = db.collection('posts').limit(10).stream()
    return {'posts': [p.to_dict() for p in posts]}
```

### 3. Image Processing

```python
from PIL import Image
import io

@functions_framework.http
def resize_image(request):
    img = Image.open(request.files['image'])
    img.thumbnail((800, 800))
    # Process and return
```

## Monitoring

**View logs:**
```bash
firebase functions:log
```

**Or in console:**
https://console.firebase.google.com/project/nubestack/functions/logs

## Cost Estimate

Example usage costs (beyond free tier):
- 1M extra calls: ~$0.40
- 10GB extra bandwidth: ~$0.12

Most small sites never exceed free tier.

## Alternatives (If Avoiding Blaze Plan)

**Free backend options without credit card:**
1. **Formspree** - Forms (what we use, 100/month free)
2. **Netlify Functions** - 125k calls/month free
3. **Vercel Functions** - Free tier available
4. **Supabase** - Database + Auth + Functions (free tier)

## Support

- Firebase Functions Docs: https://firebase.google.com/docs/functions
- Pricing Calculator: https://firebase.google.com/pricing
- Your current setup: Formspree (no functions needed)

---

**Current Status:** Functions created but NOT deployed. Using Formspree instead (100% free, no credit card).
