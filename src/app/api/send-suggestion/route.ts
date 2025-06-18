// app/api/send-suggestion/route.ts (Next.js 13+ App Router)

import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { message, subject } = await req.json();

    // SMTP transport
    const transporter = nodemailer.createTransport({
      service: "gmail", // or your SMTP provider
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Dashboard-Recupera Feedback" <${process.env.EMAIL_USER}>`,
      to: "miguel@attomo.digital",
      subject: subject || "Sugerencia de mejora",
      text: message,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending suggestion:", error);
    return NextResponse.json(
      { success: false, error: "Email not sent" },
      { status: 500 }
    );
  }
}
