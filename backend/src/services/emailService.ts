import nodemailer from 'nodemailer';

interface EmailData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Create transporter
const createTransporter = () => {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER) {
    return null;
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_PORT === '465',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

export const sendNotificationEmail = async (data: EmailData): Promise<void> => {
  const transporter = createTransporter();

  if (!transporter) {
    console.log('[EMAIL] SMTP not configured, skipping notification');
    return;
  }

  const mailOptions = {
    from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
    to: process.env.EMAIL_TO || process.env.SMTP_USER,
    subject: `[Portfolio] New message: ${data.subject}`,
    html: `
      <div style="font-family: 'JetBrains Mono', monospace; background: #0a0a0a; color: #e0e0e0; padding: 20px; border-radius: 8px;">
        <h2 style="color: #39FF14; border-bottom: 1px solid #2a2a2a; padding-bottom: 10px;">
          New Contact Message
        </h2>
        <div style="margin: 20px 0;">
          <p><strong style="color: #39FF14;">From:</strong> ${data.name}</p>
          <p><strong style="color: #39FF14;">Email:</strong> ${data.email}</p>
          <p><strong style="color: #39FF14;">Subject:</strong> ${data.subject}</p>
        </div>
        <div style="background: #111111; padding: 15px; border-radius: 4px; border: 1px solid #2a2a2a;">
          <p style="color: #888888; margin-bottom: 10px;">Message:</p>
          <p style="white-space: pre-wrap;">${data.message}</p>
        </div>
        <div style="margin-top: 20px; font-size: 12px; color: #555555;">
          <p>Sent from your DevOps Portfolio</p>
        </div>
      </div>
    `,
    text: `
New Contact Message
-------------------
From: ${data.name}
Email: ${data.email}
Subject: ${data.subject}

Message:
${data.message}

---
Sent from your DevOps Portfolio
    `,
  };

  await transporter.sendMail(mailOptions);
  console.log('[EMAIL] Notification sent successfully');
};
