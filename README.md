# NubeStack Website - Free GCP Deployment

Hugo static website hosted on Firebase Hosting with Formspree contact form. **100% FREE**.

## What You Get (Free)

**Firebase Hosting (Spark Plan):**
- 10GB storage, 360MB/day bandwidth
- Free SSL certificate
- Global CDN
- No credit card required

**Formspree Contact Form:**
- 100 submissions/month free
- Email notifications to your inbox
- Spam filtering included

**Total Cost: $0/month**

## Prerequisites

- Node.js v20+ ([install guide](https://github.com/nodesource/distributions))
- Hugo ([install](https://gohugo.io/installation/))
- Firebase CLI: `sudo npm install -g firebase-tools`

## Quick Deploy

```bash
# 1. Clone repo
git clone git@github.com:ahmadfsbd/nubestack.git
cd nubestack

# 2. Login to Firebase
firebase login

# 3. Build site
hugo --minify

# 4. Deploy
firebase deploy --only hosting
```

Your site is live at: `https://nubestack.web.app`

## Initial Setup (One-time)

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Name it `nubestack`
4. Disable Google Analytics
5. Click "Create project"

### 2. Setup Formspree (Contact Form)

1. Sign up at [Formspree](https://formspree.io/register)
2. Verify your email
3. Click "New Form"
4. Name: `NubeStack Contact`
5. Copy form endpoint: `https://formspree.io/f/xxxxxxxx`

### 3. Update Contact Form

Edit `themes/hugo-arcana/layouts/_default/contact.html`:

```html
<form class="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

Replace `YOUR_FORM_ID` with your Formspree endpoint.

### 4. Configure Firebase

Create `.firebaserc`:
```json
{
  "projects": {
    "default": "nubestack"
  }
}
```

Create `firebase.json`:
```json
{
  "hosting": {
    "public": "public",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "cleanUrls": true,
    "trailingSlash": false
  }
}
```

## Update & Deploy

```bash
# Make changes to content/layouts
hugo --minify
firebase deploy --only hosting
```

## Custom Domain (Optional)

1. Go to Firebase Console > Hosting
2. Click "Add custom domain"
3. Enter `nubestack.com`
4. Add DNS records to Namecheap:
   - Type: A, Host: @, Value: [Firebase IPs]
   - Type: A, Host: www, Value: [Firebase IPs]

SSL certificate is automatic (takes ~24 hours).

## Files Structure

```
nubestack/
├── content/          # Website content
├── layouts/          # Custom templates
├── static/           # Images, CSS, JS
├── themes/           # Hugo theme
├── config.toml       # Hugo config
├── firebase.json     # Firebase config
└── .firebaserc       # Firebase project
```

## Troubleshooting

**Build fails:**
```bash
hugo version  # Check version
```

**Deploy fails:**
```bash
firebase login       # Re-login
firebase use nubestack
```

**Contact form not working:**
- Check Formspree endpoint in template
- Verify form ID is correct
- Check spam folder for emails

## Support

- Website: https://nubestack.web.app
- Repository: https://github.com/ahmadfsbd/nubestack
- Firebase Docs: https://firebase.google.com/docs/hosting
- Hugo Docs: https://gohugo.io/documentation/

---

**Total Setup Time:** ~10 minutes  
**Monthly Cost:** $0
