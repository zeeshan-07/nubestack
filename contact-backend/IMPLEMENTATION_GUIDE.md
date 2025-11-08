# Hugo Contact Form Email Integration - Complete Guide

## ✅ What Has Been Implemented

Your Hugo contact form now has a complete email sending mechanism using:
- **Node.js + Express** backend server
- **Nodemailer** for sending emails via Gmail
- **AJAX** form submission (no page reload)
- **Visual feedback** with success/error messages

## 🚀 How to Use

### 1. Start the Backend Server

```bash
cd /home/ahmad/git/nubestack/contact-backend
node index.js
```

You should see:
```
Contact backend listening on http://localhost:3001
SMTP server is ready to send emails
```

### 2. Start Hugo Server

```bash
cd /home/ahmad/git/nubestack
hugo server -D
```

### 3. Test the Contact Form

1. Open http://localhost:1313/contact
2. Fill out the form (name, email, and message are required)
3. Click "Send Message"
4. You'll see a green success message if it works!
5. Check ahmadfsbd@gmail.com for the email

## 📧 Email Configuration

The backend uses Gmail SMTP with your account:
- **SMTP Host**: smtp.gmail.com
- **SMTP Port**: 587
- **Your Email**: ahmadfsbd@gmail.com
- **App Password**: Already configured in `.env`
- **Emails sent to**: ahmadfsbd@gmail.com

## 🔧 How It Works

1. **User fills out form** on Hugo site (http://localhost:1313/contact)
2. **JavaScript intercepts** form submission
3. **AJAX request** sends data to backend (http://localhost:3001/contact)
4. **Backend validates** the data
5. **Nodemailer sends email** via Gmail SMTP
6. **Success/error message** displayed to user

## 📁 Files Modified

- `/layouts/page/contact.html` - Added form ID and AJAX JavaScript
- `/contact-backend/index.js` - Backend API server with Nodemailer
- `/contact-backend/.env` - Gmail SMTP credentials

## 🎨 User Experience

- **Loading state**: Button shows "Sending..." with spinner
- **Success**: Green message box + form reset
- **Error**: Red message box with error details
- **Network error**: Yellow message if backend is down

## 🧪 Testing

Test the backend directly:
```bash
curl -X POST http://localhost:3001/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","message":"Hello!"}'
```

Expected response:
```json
{"success":true,"message":"Thank you! Your message has been sent successfully."}
```

## 🚀 Production Deployment

For production, you'll need to:

1. **Deploy the backend** to a server (Heroku, DigitalOcean, AWS, etc.)
2. **Update the frontend** fetch URL from `http://localhost:3001/contact` to your production API URL
3. **Set environment variables** on your production server
4. **Use HTTPS** for security

Example production URL update in `contact.html`:
```javascript
const response = await fetch('https://your-api.com/contact', {
```

## 📝 Required Form Fields

The backend requires these fields:
- `name` (required)
- `email` (required)
- `message` (required)

Additional fields (phone, company, services) are optional and not currently processed.

## 🔒 Security Notes

- Gmail app password is already configured
- CORS is enabled for development
- For production, configure CORS to only allow your domain
- Consider adding rate limiting to prevent spam

## ✉️ Email Format

Emails sent will include:
- **From**: User's name + your authenticated email
- **Reply-To**: User's email address
- **To**: ahmadfsbd@gmail.com
- **Subject**: "New Contact Form Submission from [Name]"
- **Body**: Formatted with name, email, and message

## 🐛 Troubleshooting

**Backend not starting?**
- Check if port 3001 is already in use: `lsof -i :3001`
- Kill existing process: `pkill -f "node index.js"`

**Form not submitting?**
- Check browser console (F12) for JavaScript errors
- Verify backend is running
- Check network tab for failed requests

**Email not received?**
- Check Gmail spam folder
- Verify app password is correct
- Check backend logs for errors

**Button stuck in loading state?**
- Check if backend responded
- Look for JavaScript errors in console
