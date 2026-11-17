"use client";

import { useState, type FormEvent } from "react";
import { Icon } from "./icons";

type FormKind = "quote" | "contact";

export function QuoteForm({ kind = "quote" }: { kind?: FormKind }) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const isQuote = kind === "quote";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setErrorMessage("");
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, kind }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Your message couldn't be sent. Please try again.");
      form.reset();
      setStatus("success");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong. Please call us instead.");
      setStatus("error");
    }
  }

  return (
    <form className="lead-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label><span className="label-text">Full name <span>*</span></span><input name="name" autoComplete="name" required maxLength={100} placeholder="Jane Smith" /></label>
        <label><span className="label-text">Email address <span>*</span></span><input name="email" type="email" autoComplete="email" required maxLength={254} placeholder="jane@example.com" /></label>
      </div>
      <div className="form-row">
        <label><span className="label-text">Phone number</span><input name="phone" type="tel" autoComplete="tel" maxLength={30} placeholder="(555) 123-4567" /></label>
        <label><span className="label-text">Property type{isQuote && <span> *</span>}</span><select name="propertyType" required={isQuote} defaultValue=""><option value="" disabled>Select property type</option><option>Residential</option><option>Commercial</option><option>Industrial</option><option>Other</option></select></label>
      </div>
      {isQuote && <div className="form-row">
        <label><span className="label-text">Service you’re interested in <span>*</span></span><select name="service" required defaultValue=""><option value="" disabled>Select a service</option><option>CCTV & video surveillance</option><option>Intruder alarm systems</option><option>Access control</option><option>Maintenance & support</option><option>Security assessment</option><option>Not sure yet</option></select></label>
        <label><span className="label-text">Preferred contact method</span><select name="contactMethod" defaultValue="Email"><option>Email</option><option>Phone</option><option>Either is fine</option></select></label>
      </div>}
      <label><span className="label-text">{isQuote ? "Tell us a little about your property and what you need" : "How can we help?"} <span>*</span></span><textarea name="message" required minLength={10} maxLength={3000} rows={4} placeholder={isQuote ? "What would you like to protect? Any specific concerns or questions?" : "Tell us what you need help with…"} /></label>
      <label className="honeypot" aria-hidden="true">Leave this field empty<input name="website" tabIndex={-1} autoComplete="off" /></label>
      <p className="form-privacy">By submitting, you agree to our <a href="/privacy">Privacy Policy</a>. We’ll only use your details to respond to your request.</p>
      <button type="submit" className="button button-primary form-submit" disabled={status === "sending"}>{status === "sending" ? "Sending…" : isQuote ? "Request my free quote" : "Send message"} <Icon name="arrow" size={18} /></button>
      {status === "success" && <p className="form-feedback success" role="status"><Icon name="check" size={18} /> Thanks for reaching out. A member of our team will be in touch shortly.</p>}
      {status === "error" && <p className="form-feedback error" role="alert">{errorMessage} You can also call us at <a href="tel:+18186812466">818-681-2466</a>.</p>}
    </form>
  );
}
