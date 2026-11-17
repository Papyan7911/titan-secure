import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/icons";
import { CTASection, PageIntro } from "@/components/page-sections";

export const metadata: Metadata = { title: "Our Work", description: "Explore illustrative home, commercial, and industrial security project concepts. Replace sample content with real work published with customer permission." };

const projects = [
  { category: "RESIDENTIAL", title: "A safer welcome home", location: "Single-family home · Northside", text: "Thoughtfully placed cameras and smart entry, all controlled from one beautifully simple app.", image: "photo-1600607687939-ce8a6c25118c", alt: "Welcoming modern home with thoughtful exterior lighting" },
  { category: "COMMERCIAL", title: "Protection that works overtime", location: "Creative office · Downtown", text: "An integrated system that helps a busy team feel confident, at work and after hours.", image: "photo-1497366811353-6870744d04b2", alt: "Modern open-plan office with bright windows" },
  { category: "INDUSTRIAL", title: "A clearer view of every corner", location: "Distribution facility · Westside", text: "Multi-zone surveillance designed to give a hard-working site a dependable, clear view.", image: "photo-1581091226825-a6a2a5aee158", alt: "Technical professional servicing industrial equipment" },
  { category: "RESIDENTIAL", title: "Smart security, made simple", location: "Townhouse · Central", text: "A welcoming video doorbell and carefully placed cameras, installed neatly with a no-fuss walkthrough.", image: "photo-1600566753086-00f18fb6b3ea", alt: "Comfortable modern townhouse interior" },
  { category: "COMMERCIAL", title: "The right access, every time", location: "Professional studio · Midtown", text: "A simple, flexible access system that grows with a changing team and keeps entry organized.", image: "photo-1497366811353-6870744d04b2", alt: "Contemporary commercial workspace" },
  { category: "INDUSTRIAL", title: "Confidence across the site", location: "Light manufacturing · Southside", text: "Resilient perimeter monitoring and remote viewing designed around a large, active site.", image: "photo-1581092160562-40aa08e78837", alt: "Technician working on a complex industrial system" },
];

export default function ProjectsPage() {
  return <main id="main"><PageIntro eyebrow="OUR WORK" title={<>Safer spaces.<br />Thoughtfully done<span className="hero-period">.</span></>} description="Explore illustrative ideas for residential, commercial, and industrial security. Replace these sample projects and stock images with actual installations before launch." /><section className="section gallery-section"><div className="container"><div className="gallery-note"><Icon name="lock" size={19} /><span>These are sample concepts with illustrative stock photography, not completed customer projects. Publish real installation photos only with written customer permission, and never reveal sensitive security details.</span></div><div className="gallery-grid">{projects.map((p) => <article className="gallery-card" key={p.title}><div className="gallery-image"><Image src={`https://images.unsplash.com/${p.image}?auto=format&fit=crop&w=1100&q=85`} alt={p.alt} fill sizes="(max-width: 680px) 100vw, 50vw" /><span className="gallery-category">{p.category}</span></div><div className="gallery-info"><span className="gallery-location">{p.location}</span><h2>{p.title}</h2><p>{p.text}</p><Link href="/quote" aria-label={`Request a similar solution: ${p.title}`}><Icon name="arrowUp" size={17} /></Link></div></article>)}</div></div></section><CTASection title="Your space could be next." text="Start with a relaxed, no-obligation conversation with a security expert who listens." /></main>;
}
