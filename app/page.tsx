import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/icons";
import { HeroCarousel } from "@/components/hero-carousel";
import { SectionHeading } from "@/components/section-heading";

const services = [
  { icon: "camera" as const, title: "CCTV & video surveillance", text: "See what matters, wherever you are. Smart camera systems designed for your space.", href: "/services#cctv" },
  { icon: "alarm" as const, title: "Intruder alarm systems", text: "A powerful first line of defense, with reliable alerts and 24/7 professional monitoring.", href: "/services#alarms" },
  { icon: "lock" as const, title: "Access control", text: "Know who comes and goes. Simple, secure access for people you trust.", href: "/services#access-control" },
  { icon: "shield" as const, title: "Maintenance & support", text: "Keeping your security working smoothly, with real people ready to help.", href: "/services#support" },
];

const projects = [
  { title: "A safer welcome home", kind: "Residential · CCTV & smart entry", image: "photo-1600607687939-ce8a6c25118c", alt: "Modern, warmly lit home at dusk" },
  { title: "Protection that works overtime", kind: "Commercial · Integrated security", image: "photo-1497366811353-6870744d04b2", alt: "Bright, open contemporary office" },
  { title: "A clearer view of every corner", kind: "Industrial · Multi-site CCTV", image: "photo-1581091226825-a6a2a5aee158", alt: "Professional technicians working on industrial equipment" },
];

export default function HomePage() {
  return (
    <main id="main">
      <HeroCarousel />

      <section className="trust-strip"><div className="container trust-inner"><span>SECURITY THAT’S <strong>THOUGHT THROUGH.</strong></span><div><span><Icon name="check" size={17} /> Solutions tailored to you</span><span><Icon name="check" size={17} /> Trusted, qualified installers</span><span><Icon name="check" size={17} /> Ongoing human support</span></div></div></section>

      <section className="section services-section">
        <div className="container"><div className="section-head-row"><SectionHeading eyebrow="WHAT WE DO" title="A safer space starts here.">Whether it’s home, work, or everything in between, we make it easier to feel secure.</SectionHeading><Link href="/services" className="text-link">All our services <Icon name="arrow" size={17} /></Link></div>
          <div className="service-grid">{services.map((item, index) => <Link href={item.href} className="service-card" key={item.title}><div className="service-card-top"><span className="service-icon"><Icon name={item.icon} size={23} /></span><span className="card-number">0{index + 1}</span></div><h3>{item.title}</h3><p>{item.text}</p><span className="card-arrow"><Icon name="arrowUp" size={17} /></span></Link>)}</div>
        </div>
      </section>

      <section className="about-band"><div className="about-image"><Image src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1050&q=85" alt="Security installation specialist carefully working on a system" fill sizes="(max-width: 800px) 100vw, 50vw" /></div><div className="about-copy"><span className="eyebrow">A DIFFERENT KIND OF SECURITY COMPANY</span><h2>Good security is<br />built on good people<span className="hero-period">.</span></h2><p>We don’t believe in one-size-fits-all or high-pressure sales. We listen first, make things easy to understand, and build a solution that feels right for you.</p><Link href="/about" className="button button-outline-light">Get to know us <Icon name="arrow" size={17} /></Link><div className="about-note"><Icon name="spark" size={18} /> Experts in your corner. Always.</div></div></section>

      <section className="section projects-section"><div className="container"><div className="section-head-row"><SectionHeading eyebrow="SAMPLE PROJECT CONCEPTS" title="Real spaces. Thoughtful solutions.">Illustrative examples of how a security solution could come together. Replace these samples with customer-approved installations before launch.</SectionHeading><Link href="/projects" className="text-link">See project concepts <Icon name="arrow" size={17} /></Link></div>
        <div className="project-grid">{projects.map((project, index) => <Link href="/projects" key={project.title} className={`project-card${index === 0 ? " project-featured" : ""}`}><div className="project-image"><Image src={`https://images.unsplash.com/${project.image}?auto=format&fit=crop&w=1000&q=85`} alt={project.alt} fill sizes="(max-width: 760px) 100vw, 40vw" /><span className="project-view"><Icon name="arrowUp" size={18} /></span></div><div className="project-info"><span>{project.kind}</span><h3>{project.title}</h3></div></Link>)}</div>
      </div></section>

      <section className="testimonial"><div className="container testimonial-inner"><span className="quote-mark"><Icon name="shield" size={38} /></span><div><p>Good security is personal. We start by listening, explain your options, and leave you feeling confident—not pressured.</p><div className="testimonial-by"><span className="testimonial-avatar"><Icon name="check" size={16} /></span><span><strong>THE TITAN PROMISE</strong><small>Clear advice. Careful installation. Support that stays.</small></span></div></div><div className="testimonial-rating"><span><Icon name="spark" size={21} /></span><small>PEACE OF MIND, BUILT AROUND YOU</small></div></div></section>

      <section className="final-cta"><div className="container final-cta-inner"><div><span className="eyebrow">IT STARTS WITH A CONVERSATION</span><h2>Let’s make your space feel safer.</h2><p>Tell us what matters to you. We’ll take it from there.</p></div><Link href="/quote" className="button button-silver">Get your free security assessment <Icon name="arrow" size={18} /></Link></div></section>
    </main>
  );
}
