"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Icon } from "./icons";

const links = [
  { href: "/services", label: "Services" },
  { href: "/products", label: "Equipment" },
  { href: "/projects", label: "Our work" },
  { href: "/about", label: "About us" },
  { href: "/faq", label: "FAQs" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <Link href="/" className="brand" aria-label="Titan Alarm & Electronics home" onClick={() => setOpen(false)}>
          <Image src="/titan-logo.png" alt="Titan Alarm & Electronics" width={72} height={72} priority className="brand-logo" />
        </Link>
        <button className="menu-toggle" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} onClick={() => setOpen(!open)}>
          <Icon name={open ? "close" : "menu"} size={23} />
        </button>
        <nav className={`main-nav${open ? " is-open" : ""}`} aria-label="Main navigation">
          {links.map((link) => <Link key={link.href} href={link.href} className={pathname === link.href ? "active" : ""} onClick={() => setOpen(false)}>{link.label}</Link>)}
          <Link href="/quote" className="button button-primary nav-cta" onClick={() => setOpen(false)}>Get a free quote <Icon name="arrow" size={17} /></Link>
        </nav>
      </div>
    </header>
  );
}
