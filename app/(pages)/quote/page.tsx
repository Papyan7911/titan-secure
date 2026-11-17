import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/icons";
import { QuoteForm } from "@/components/quote-form";
import { PageIntro } from "@/components/page-sections";

export const metadata: Metadata = { title: "Request a Free Quote", description: "Tell Titan Alarm & Electronics about your property and security goals. Request a free, no-obligation security assessment." };

export default function QuotePage() {
  return <main id="main"><PageIntro eyebrow="YOUR NEXT STEP" title={<>Let’s talk about<br />feeling safer<span className="hero-period">.</span></>} description="A few details help us prepare for a useful first conversation. There’s no pressure, no obligation, and no silly questions." /><section className="quote-section"><div className="container quote-layout"><div className="quote-form-wrap"><h2>Tell us a little about your project.</h2><p>Fields marked with an asterisk are required. Your details stay private and are only used to get back to you.</p><QuoteForm /></div><aside className="quote-aside"><span className="aside-icon"><Icon name="shield" size={24} /></span><h2>What happens next?</h2><div className="next-steps"><div><span>01</span><p><strong>A real person reads your request.</strong><small>No automated sales funnel. Just our local team.</small></p></div><div><span>02</span><p><strong>We’ll reach out your way.</strong><small>Usually within one business day, using your preferred method.</small></p></div><div><span>03</span><p><strong>We’ll help you make sense of it.</strong><small>Clear advice, thoughtful options, no pressure.</small></p></div></div><div className="aside-call"><span>Prefer to talk now?</span><a href="tel:+18186812466"><Icon name="phone" size={16} /> 818-681-2466</a><small>Mon–Fri, 8am–6pm</small></div><p className="quote-privacy">Your information is handled according to our <Link href="/privacy">Privacy Policy</Link>.</p></aside></div></section></main>;
}
