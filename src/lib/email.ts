import nodemailer from "nodemailer";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const createTransporter = () => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    throw new Error(
      "Email configuration missing: EMAIL_USER and EMAIL_PASSWORD are required",
    );
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
};

export async function sendContactEmail(data: ContactFormData) {
  const { name, email, message, subject } = data;

  if (!process.env.EMAIL_RECIPIENT) {
    console.error("EMAIL_RECIPIENT environment variable is required");
    return { success: false, message: "Email configuration error" };
  }
  const currentDate = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const mailOptions = {
    from: `"Contact Form" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_RECIPIENT,
    subject: `📧 New Contact: ${subject}`,
    text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
Subject: ${subject}
Date: ${currentDate}

Message:
${message}

---
This message was sent via your website contact form.
    `,
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Submission</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600; letter-spacing: -0.5px;">
              📧 New Contact Message
            </h1>
            <p style="color: #e8eaff; margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">
              Someone reached out through your website
            </p>
          </div>

          <!-- Content -->
          <div style="padding: 40px 30px;">
            <!-- Contact Info Card -->
            <div style="background-color: #f8fafc; border-radius: 12px; padding: 30px; margin-bottom: 30px; border-left: 4px solid #667eea;">
              <h2 style="color: #1e293b; margin: 0 0 20px 0; font-size: 20px; font-weight: 600;">
                Contact Information
              </h2>
              
              <div style="margin-bottom: 15px;">
                <span style="display: inline-block; width: 80px; font-weight: 600; color: #475569;">Name:</span>
                <span style="color: #1e293b; font-size: 16px;">${name}</span>
              </div>
              
              <div style="margin-bottom: 15px;">
                <span style="display: inline-block; width: 80px; font-weight: 600; color: #475569;">Email:</span>
                <a href="mailto:${email}" style="color: #667eea; text-decoration: none; font-size: 16px;">${email}</a>
              </div>
              
              <div style="margin-bottom: 15px;">
                <span style="display: inline-block; width: 80px; font-weight: 600; color: #475569;">Subject:</span>
                <span style="color: #1e293b; font-size: 16px;">${subject}</span>
              </div>
              
              <div>
                <span style="display: inline-block; width: 80px; font-weight: 600; color: #475569;">Date:</span>
                <span style="color: #64748b; font-size: 14px;">${currentDate}</span>
              </div>
            </div>

            <!-- Message Card -->
            <div style="background-color: #ffffff; border-radius: 12px; padding: 30px; border: 2px solid #e2e8f0; margin-bottom: 30px;">
              <h3 style="color: #1e293b; margin: 0 0 20px 0; font-size: 18px; font-weight: 600; display: flex; align-items: center; gap: 10px;">
                💬 Message
              </h3>
              <div style="background-color: #f1f5f9; padding: 20px; border-radius: 8px; border-left: 3px solid #94a3b8;">
                <p style="margin: 0; color: #334155; font-size: 16px; line-height: 1.7; white-space: pre-wrap;">${message}</p>
              </div>
            </div>

            <!-- Action Button -->
            <div style="text-align: center; margin: 30px 0;">
              <a href="mailto:${email}?subject=Re: ${subject}" 
                 style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3); transition: all 0.3s ease;">
                📧 Reply to ${name}
              </a>
            </div>
          </div>

          <!-- Footer -->
          <div style="background-color: #f8fafc; padding: 25px 30px; text-align: center; border-top: 1px solid #e2e8f0;">
            <p style="margin: 0; color: #64748b; font-size: 14px;">
              This message was sent via your website contact form
            </p>
            <p style="margin: 8px 0 0 0; color: #94a3b8; font-size: 12px;">
              Please do not reply directly to this email
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
  };
  try {
    const transporter = createTransporter();
    await transporter.sendMail(mailOptions);
    return { success: true, message: "Email sent successfully" };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    console.error("Error sending email:", errorMessage);
    return { success: false, message: "Failed to send email" };
  }
}

export async function sendAutoReply(data: ContactFormData) {
  const { name, email, subject } = data;

  const autoReplyOptions = {
    from: `"Roshan Aryal" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `Thank you for reaching out, ${name}`,
    replyTo: process.env.EMAIL_USER,
    html: createAutoReplyTemplate({ name, subject }),
    text: `
Hi ${name},

Thank you for taking the time to reach out regarding "${subject}". I truly appreciate your interest in my work and the opportunity to potentially collaborate.

Your message is important to me, and I'm excited to learn more about how we might work together.


While you wait, feel free to explore more of my work at https://roshanaryal.dev.

I believe great projects start with great conversations, and I'm looking forward to ours!

Best regards,
Roshan Aryal

---
This is an automated confirmation. I'll respond personally soon.
    `,
  };

  try {
    const transporter = createTransporter();
    await transporter.sendMail(autoReplyOptions);
    return { success: true };
  } catch (error) {
    console.error("Error sending auto-reply:", error);
    return { success: false };
  }
}

export function createAutoReplyTemplate(data: {
  name: string;
  subject: string;
}) {
  const { name, subject } = data;

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Thank You for Your Message</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; background-color: #f8fafc; line-height: 1.6;">
      <div style="max-width: 900px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); padding: 50px 40px; text-align: center;">
          <div style=" display: flex; align-items: center; justify-content: center;">
            <span style="font-size: 32px;">👋</span>
          </div>
          <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">
            Thank You, ${name}!
          </h1>
          <p style="color: rgba(255, 255, 255, 0.9); margin: 12px 0 0 0; font-size: 16px;">
            I appreciate you taking the time to reach out
          </p>
        </div>

        <!-- Main Content -->
        <div style="padding: 50px 40px;">
          <div style="text-align: center; margin-bottom: 40px;">
            <h2 style="color: #1e293b; margin: 0 0 24px 0; font-size: 24px; font-weight: 600;">
              Your Message Has Been Received
            </h2>
            <p style="color: #475569; font-size: 18px; line-height: 1.7; margin: 0 0 20px 0;">
              Thank you for your interest in my work and for reaching out regarding 
              <strong style="color: #1e40af;">"${subject}"</strong>. 
            </p>
            <p style="color: #64748b; font-size: 16px; line-height: 1.6; margin: 0;">
              I value every connection and opportunity to collaborate or discuss potential projects. 
              Your message is important to me, and I'm excited to learn more about how we might work together.
            </p>
          </div>


          <!-- Portfolio CTA -->
          <div style="text-align: center; margin: 40px 0;">
            <p style="color: #64748b; font-size: 16px; margin: 0 0 25px 0;">
              While you wait, feel free to explore more of my work:
            </p>
            <div style="display: flex; justify-content: center; gap: 20px; flex-wrap: wrap; width: 100%;">
              <a href="https://roshanaryal.dev/projects" 
                 style="display: inline-block; background-color: #1e40af; color: #ffffff; text-decoration: none; padding: 8px 20px; border-radius: 8px; font-weight: 600; font-size: 14px; transition: all 0.3s ease; margin-right: 10px;">
                View Projects
              </a>
              <a href="https://linkedin.com/in/rosanaryal" 
                 style="display: inline-block; background-color: #0077b5; color: #ffffff; text-decoration: none; padding: 8px 20px; border-radius: 6px; font-weight: 600; font-size: 14px; transition: all 0.3s ease;">
                Connect on LinkedIn
              </a>
            </div>
          </div>

          <!-- Personal Touch -->
          <div style="background-color: #fefce8; border: 1px solid #fde047; border-radius: 12px; padding: 25px; margin: 30px 0; text-align: center;">
            <p style="color: #713f12; font-size: 16px; margin: 0; font-style: italic;">
              "I believe great projects start with great conversations. Looking forward to ours!"
            </p>
          </div>
        </div>

        <!-- Footer -->
        <div style="background-color: #1e293b; padding: 40px; text-align: center;">
          <div style="margin-bottom: 25px;">
            <h4 style="color: #ffffff; margin: 0 0 15px 0; font-size: 18px; font-weight: 600;">
              Let's Stay Connected
            </h4>
            <div style="display: flex; justify-content: center; gap: 20px; flex-wrap: wrap; width: 100%;">
              <a href="https://linkedin.com/in/rosanaryal" style="color: #94a3b8; text-decoration: none; font-size: 14px; hover: color: #ffffff;">
                LinkedIn
              </a>
              <a href="https://github.com/Roshan484" style="color: #94a3b8; text-decoration: none; font-size: 14px;">
                GitHub
              </a>
              <a href="https://roshanaryal.dev/#projects" style="color: #94a3b8; text-decoration: none; font-size: 14px;">
                Portfolio
              </a>
            </div>
          </div>
          
          <div style="border-top: 1px solid #374151; padding-top: 25px;">
            <p style="margin: 0 0 8px 0; color: #9ca3af; font-size: 14px;">
              Best regards,<br>
              <strong style="color: #ffffff;">Roshan Aryal</strong>
            </p>
            <p style="margin: 0; color: #6b7280; font-size: 12px;">
              This is an automated confirmation. I'll respond personally soon.
            </p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}
