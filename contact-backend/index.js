const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Configure Gmail SMTP transport
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT) || 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Verify transporter configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('SMTP configuration error:', error);
  } else {
    console.log('SMTP server is ready to send emails');
  }
});

app.post('/contact', async (req, res) => {
  console.log('📧 Received contact form submission:', req.body);
  
  const { name, email, message } = req.body;
  
  if (!name || !email || !message) {
    console.log('❌ Validation failed: Missing required fields');
    return res.status(400).json({ error: 'All fields are required.' });
  }
  
  try {
    console.log('📤 Attempting to send email...');
    const info = await transporter.sendMail({
      from: `"${name}" <${process.env.SMTP_USER}>`, // Use authenticated email as sender
      replyTo: email, // Allow replies to go to the form submitter
      to: process.env.CONTACT_TO,
      subject: `New Contact Form Submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `
    });
    
    console.log('✅ Email sent successfully! Message ID:', info.messageId);
    console.log('📬 Email sent to:', process.env.CONTACT_TO);
    res.json({ success: true, message: 'Thank you! Your message has been sent successfully.' });
  } catch (err) {
    console.error('❌ Error sending email:', err.message);
    console.error('Full error:', err);
    res.status(500).json({ error: 'Failed to send email. Please try again later.' });
  }
});

app.listen(PORT, () => {
  console.log(`Contact backend listening on http://localhost:${PORT}`);
});
