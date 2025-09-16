const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, text, html) => {
  try {
    console.log("📧 Trying to send email...");
    console.log("To:", to);

    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.verify();
    console.log("✅ Transporter verified successfully");

    const mailOptions = {
      from: `"Sip & Ship" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully:", info.response);
  } catch (error) {
    console.error("❌ Email not sent:", error.message);
    throw new Error("Email sending failed");
  }
};

module.exports = sendEmail;
