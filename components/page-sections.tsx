import Link from "next/link";
import { Icon } from "./icons";

export function PageIntro({ eyebrow, title, description }: { eyebrow: string; title: React.ReactNode; description: string }) {
  return <section className="page-intro"><div className="container page-intro-inner"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{description}</p><div className="breadcrumb"><Link href="/">Home</Link><span>/</span><span>{eyebrow}</span></div></div><span className="intro-orbit orbit-one" /><span className="intro-orbit orbit-two" /></section>;
}

export function CTASection({ title, text }: { title: string; text: string }) {
  return <section className="inner-cta"><div className="container inner-cta-inner"><div><span className="eyebrow">HERE WHEN YOU NEED US</span><h2>{title}</h2><p>{text}</p></div><Link href="/quote" className="button button-silver">Let’s talk <Icon name="arrow" size={17} /></Link></div></section>;
}

export function InfoCard({ icon, title, children }: { icon: "camera" | "alarm" | "lock" | "shield" | "clock" | "pin"; title: string; children: React.ReactNode }) {
  return <div className="info-card"><span className="service-icon"><Icon name={icon} size={22} /></span><h3>{title}</h3><p>{children}</p></div>;
}
