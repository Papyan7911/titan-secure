import type { Metadata } from "next";
import { Icon } from "@/components/icons";
import { CTASection, PageIntro } from "@/components/page-sections";

export const metadata: Metadata = { title: "Security Equipment", description: "Explore quality security cameras, recorders, sensors, alarm panels, and access control equipment installed by Titan Secure." };

const products = [
  { n: "01", icon: "camera" as const, category: "VIDEO SURVEILLANCE", title: "Security cameras", desc: "Indoor, outdoor, doorbell, and specialty cameras in HD and 4K. Chosen for your space, light conditions, and priorities.", tag: "Crisp day & night footage" },
  { n: "02", icon: "camera" as const, category: "VIDEO SURVEILLANCE", title: "Recorders & storage", desc: "Secure, dependable recording solutions with storage sized for the footage you actually need to keep.", tag: "Secure local recording" },
  { n: "03", icon: "alarm" as const, category: "INTRUDER PROTECTION", title: "Alarms & sensors", desc: "Smart alarm panels, motion detectors, and door and window sensors, thoughtfully chosen to fit your property.", tag: "Responsive smart alerts" },
  { n: "04", icon: "lock" as const, category: "ENTRY MANAGEMENT", title: "Access control", desc: "Keypads, card readers, smart locks, and mobile access to help you make entry secure and straightforward.", tag: "Manage access with ease" },
  { n: "05", icon: "shield" as const, category: "THE DETAILS", title: "Accessories & more", desc: "Mounting hardware, cabling, networking, and the finishing touches that help your whole system work together.", tag: "A complete system" },
  { n: "06", icon: "spark" as const, category: "BUILT AROUND YOU", title: "The right fit", desc: "Quality brands selected around your needs and your budget, with expert installation included. No guessing games.", tag: "Expert guidance included" },
];

export default function ProductsPage() {
  return <main id="main"><PageIntro eyebrow="THE RIGHT TOOLS FOR THE JOB" title={<>Good equipment.<br />Expertly chosen<span className="hero-period">.</span></>} description="The best security system isn’t the one with the most features. It’s the one that works beautifully for your life, your space, and your budget." /><section className="section products-section"><div className="container"><div className="products-note"><Icon name="spark" size={20} /><p><strong>No confusing catalog. No pushy upsells.</strong> We’ll help you choose equipment that genuinely makes sense for your property. All systems are professionally installed and fully set up by our team.</p></div><div className="products-grid">{products.map((item) => <article className="product-card" key={item.n}><div className="product-top"><span className="service-icon"><Icon name={item.icon} size={23} /></span><span className="card-number">{item.n}</span></div><span className="eyebrow">{item.category}</span><h2>{item.title}</h2><p>{item.desc}</p><span className="product-tag"><Icon name="check" size={15} />{item.tag}</span></article>)}</div></div></section><CTASection title="Let’s find your perfect fit." text="Tell us what matters most. We’ll explain your options, answer every question, and help you get started." /></main>;
}
