import { NextResponse } from "next/server";

export const runtime = "nodejs";

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  propertyType?: unknown;
  service?: unknown;
  contactMethod?: unknown;
  message?: unknown;
  kind?: unknown;
  website?: unknown;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") || "0");
  if (contentLength > 12_000) {
    return NextResponse.json({ error: "Your message is too large. Please shorten it and try again." }, { status: 413 });
  }

  let body: ContactPayload;
  try {
    body = await request.json() as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Please check your details and try again." }, { status: 400 });
  }

  if (typeof body.website === "string" && body.website.trim()) {
    return NextResponse.json({ ok: true });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const propertyType = typeof body.propertyType === "string" ? body.propertyType.trim() : "";
  const service = typeof body.service === "string" ? body.service.trim() : "";
  const contactMethod = typeof body.contactMethod === "string" ? body.contactMethod.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const kind = body.kind === "contact" ? "Contact enquiry" : body.kind === "quote" ? "Quote request" : "";

  if (!name || name.length > 100 || !emailPattern.test(email) || email.length > 254 || phone.length > 30 || message.length < 10 || message.length > 3000 || !kind) {
    return NextResponse.json({ error: "Please check that all required fields are complete and valid." }, { status: 400 });
  }
  if (kind === "Quote request" && (!propertyType || !service)) {
    return NextResponse.json({ error: "Please select a property type and service." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL;
  const from = process.env.RESEND_FROM_EMAIL;
  if (!apiKey || !to || !from) {
    console.error("Contact form email delivery is not configured. Set RESEND_API_KEY, CONTACT_EMAIL, and RESEND_FROM_EMAIL.");
    return NextResponse.json({ error: "Our enquiry form is temporarily unavailable. Please call or email us directly." }, { status: 503 });
  }

  const lines = [
    `${kind} received from the Titan Alarm & Electronics website`,
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone || "Not provided"}`,
    `Property type: ${propertyType || "Not provided"}`,
    `Service: ${service || "Not specified"}`,
    `Preferred contact: ${contactMethod || "Not specified"}`,
    "",
    "Message:",
    message,
  ];
  const result = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to: [to], reply_to: email, subject: `${kind}: ${name}`, text: lines.join("\n") }),
    signal: AbortSignal.timeout(8_000),
  });
  if (!result.ok) {
    console.error("Email provider rejected contact form submission.", { status: result.status });
    return NextResponse.json({ error: "We couldn’t deliver your message right now. Please try again or contact us by phone." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
